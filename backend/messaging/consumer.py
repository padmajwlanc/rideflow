from kafka import KafkaConsumer
import json

from ride_analytics.processor import process_event

consumer = KafkaConsumer(
    "ride_events",
    bootstrap_servers="localhost:9092",
    auto_offset_reset="earliest",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

print("Listening for RideFlow events...\n")

for message in consumer:

    event = message.value

    print(event)

    process_event(event)