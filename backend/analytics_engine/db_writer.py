from sqlalchemy import create_engine, text

DATABASE_URL = (
    "postgresql://postgres:killerboyrats@172.30.144.1:5432/rideflow"
)

engine = create_engine(DATABASE_URL)


def update_summary(batch_df):

    rows = batch_df.collect()

    if not rows:
        print("[Analytics] Empty batch. Nothing to update.")
        return

    row = rows[0]

    print("\n========== Analytics Summary ==========")
    print(row.asDict())
    print("=======================================\n")

    with engine.begin() as conn:

        conn.execute(
            text("""
                UPDATE analytics_summary
                SET
                    total_requests = :requests,
                    completed_rides = :completed,
                    total_revenue = :revenue,
                    average_fare = :fare
                WHERE id = 1
            """),
            {
                "requests": row["total_requests"],
                "completed": row["completed_rides"],
                "revenue": row["total_revenue"] or 0,
                "fare": row["average_fare"] or 0
            }
        )

    print("[Analytics] analytics_summary updated successfully.\n")