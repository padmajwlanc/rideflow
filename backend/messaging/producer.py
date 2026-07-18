from kafka import KafkaProducer
import json
from datetime import datetime, timezone

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

def publish_event(topic, event):

    event["timestamp"] = datetime.now(timezone.utc).isoformat()

    producer.send(topic, event)

    producer.flush()