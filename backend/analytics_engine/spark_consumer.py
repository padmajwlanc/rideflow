from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("RideFlow Analytics")
    .master("local[*]")
    .config(
        "spark.jars.packages",
        "org.apache.spark:spark-sql-kafka-0-10_2.13:4.0.0"
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

messages = df.selectExpr(
    "CAST(value AS STRING)"
)

query = (
    messages.writeStream
    .outputMode("append")
    .format("console")
    .start()
)

query.awaitTermination()