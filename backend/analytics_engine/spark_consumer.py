from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, to_timestamp

from analytics_engine.schemas import ride_schema
from analytics_engine.ride_metrics import (
    overall_metrics,
    status_metrics,
    hourly_requests,
    hourly_revenue,
    driver_metrics
)
from analytics_engine.db_writer import update_summary


spark = (
    SparkSession.builder
    .appName("RideFlow Analytics")
    .master("local[*]")
    .config(
        "spark.jars.packages",
        ",".join([
            "org.apache.spark:spark-sql-kafka-0-10_2.13:4.2.0",
            "org.postgresql:postgresql:42.7.3"
        ])
    )
    .getOrCreate()
)

spark.sparkContext.setLogLevel("ERROR")


df = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("subscribe", "ride_events")
    .option("startingOffsets", "latest")
    .load()
)

json_df = df.selectExpr("CAST(value AS STRING)")

parsed_df = (
    json_df.select(
        from_json(
            col("value"),
            ride_schema
        ).alias("data")
    )
)

rides = (
    parsed_df
    .select("data.*")
    .withColumn(
        "timestamp",
        to_timestamp("timestamp")
    )
    .withWatermark(
        "timestamp",
        "10 minutes"
    )
)

rides.printSchema()


# ------------------------
# Analytics DataFrames
# ------------------------

overall = overall_metrics(rides)
status = status_metrics(rides)
hourly = hourly_requests(rides)
revenue = hourly_revenue(rides)
drivers = driver_metrics(rides)


# ------------------------
# Spark callback
# ------------------------

def write_overall_metrics(batch_df, batch_id):
    update_summary(batch_df)


# ------------------------
# Overall -> PostgreSQL
# ------------------------

overall_db_query = (
    overall.writeStream
    .queryName("Overall Summary DB")
    .outputMode("complete")
    .foreachBatch(write_overall_metrics)
    .start()
)


# ------------------------
# Console Queries
# ------------------------

status_query = (
    status.writeStream
    .queryName("Status Metrics")
    .outputMode("complete")
    .format("console")
    .option("truncate", False)
    .start()
)

hourly_query = (
    hourly.writeStream
    .queryName("Hourly Requests")
    .outputMode("complete")
    .format("console")
    .option("truncate", False)
    .start()
)

revenue_query = (
    revenue.writeStream
    .queryName("Hourly Revenue")
    .outputMode("complete")
    .format("console")
    .option("truncate", False)
    .start()
)

driver_query = (
    drivers.writeStream
    .queryName("Driver Metrics")
    .outputMode("complete")
    .format("console")
    .option("truncate", False)
    .start()
)


spark.streams.awaitAnyTermination()