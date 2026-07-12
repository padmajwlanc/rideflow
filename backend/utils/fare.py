def calculate_fare(
    distance_km: float
):

    BASE_FARE = 50
    PER_KM_RATE = 12

    return round(
        BASE_FARE + (distance_km * PER_KM_RATE),
        2
    )