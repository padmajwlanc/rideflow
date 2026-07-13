import json
from pathlib import Path

FILE_PATH = Path(__file__).parent / "analytics.json"


def process_event(event):

    with open(FILE_PATH, "r") as f:
        data = json.load(f)

    if event["event"] == "ride_requested":
        data["total_rides"] += 1

    elif event["event"] == "ride_completed":
        data["completed_rides"] += 1
        data["total_fare"] += event["fare"]

        data["average_fare"] = round(
            data["total_fare"] /
            data["completed_rides"],
            2
        )

    with open(FILE_PATH, "w") as f:
        json.dump(
            data,
            f,
            indent=4
        )