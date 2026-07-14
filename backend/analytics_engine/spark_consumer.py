from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("RideFlow Analytics")
    .master("local[*]")
    .getOrCreate()
)

print("Spark Started Successfully!")

spark.stop()