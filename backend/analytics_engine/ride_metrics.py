from pyspark.sql.functions import (
    col,
    count,
    sum,
    avg,
    when
)
from pyspark.sql.functions import window


def overall_metrics(df):

    return (
        df.groupBy().agg(

            count(
                when(
                    col("event") == "ride_requested",
                    True
                )
            ).alias("total_requests"),

            count(
                when(
                    col("event") == "ride_completed",
                    True
                )
            ).alias("completed_rides"),

            sum(
                when(
                    col("event") == "ride_completed",
                    col("fare")
                )
            ).alias("total_revenue"),

            avg(
                when(
                    col("event") == "ride_completed",
                    col("fare")
                )
            ).alias("average_fare")
        )
    )


def status_metrics(df):

    return (
        df.groupBy("event")
        .count()
    )

def hourly_requests(df):

    return (
        df.filter(col("event") == "ride_requested")
        .groupBy(
            window(col("timestamp"), "1 hour")
        )
        .count()
    )

def hourly_revenue(df):

    return (
        df.filter(col("event") == "ride_completed")
        .groupBy(
            window(col("timestamp"), "1 hour")
        )
        .agg(
            sum("fare").alias("revenue")
        )
    )

def driver_metrics(df):

    return (
        df.filter(col("event") == "ride_completed")
        .groupBy("driver_id")
        .agg(
            count("*").alias("completed_rides")
        )
    )