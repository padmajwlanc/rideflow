from pyspark.sql.types import *

ride_schema = StructType([
    StructField("event", StringType(), True),
    StructField("ride_id", IntegerType(), True),
    StructField("rider_id", IntegerType(), True),
    StructField("driver_id", IntegerType(), True),
    StructField("distance_km", DoubleType(), True),
    StructField("fare", DoubleType(), True),
    StructField("timestamp", StringType(), True)
])