export default function RideSummary({
  selectedVehicle,
  distance,
  duration,
  driver,
  rideStatus,
  handleBookRide,
  handleStartRide,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Ride Summary
      </h2>

      {selectedVehicle ? (
        <>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-400">Vehicle</span>
              <span className="font-semibold text-white">
                {selectedVehicle.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">
                Estimated Fare
              </span>
              <span className="font-semibold text-emerald-400">
                ₹{selectedVehicle.price}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">ETA</span>
              <span className="font-semibold text-white">
                {duration > 0 ? `${duration} mins` : "--"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">
                Distance
              </span>
              <span className="font-semibold text-white">
                {distance > 0 ? `${distance} km` : "--"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {rideStatus === "idle" && (
            <button
              onClick={handleBookRide}
              className="mt-8 w-full rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Book {selectedVehicle.name}
            </button>
          )}

          {rideStatus === "searching" && (
            <button
              disabled
              className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-zinc-700 py-3 font-semibold text-white"
            >
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Searching for Driver...
            </button>
          )}

          {rideStatus === "driverAssigned" && (
            <button
              disabled
              className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white"
            >
              Driver Assigned ✓
            </button>
          )}

          {rideStatus === "driverArrived" && (
            <button
              onClick={handleStartRide}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ▶ Start Ride
            </button>
          )}

          {/* Driver Card */}
          {driver && (
            <div className="mt-6 rounded-xl border border-emerald-500 bg-emerald-500/10 p-5">
              <h3 className="mb-4 text-lg font-bold text-emerald-400">
                {rideStatus === "driverArrived"
                  ? "✅ Driver Arrived"
                  : "🚗 Driver Assigned"}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Driver</span>
                  <span className="text-white">
                    {driver.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Rating</span>
                  <span className="text-white">
                    ⭐ {driver.rating}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Vehicle</span>
                  <span className="text-white">
                    {driver.car}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Plate</span>
                  <span className="text-white">
                    {driver.plate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">
                    {rideStatus === "driverArrived"
                      ? "Status"
                      : "Arrival"}
                  </span>

                  <span className="font-semibold text-emerald-400">
                    {rideStatus === "driverArrived"
                      ? "Waiting at Pickup"
                      : driver.eta}
                  </span>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg bg-emerald-600 py-2 font-semibold text-white transition hover:bg-emerald-700">
                📞 Call Driver
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="mb-6 text-zinc-400">
            Select a vehicle to continue.
          </p>

          <button
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-zinc-700 py-3 font-semibold text-zinc-500"
          >
            Book Ride
          </button>
        </div>
      )}
    </div>
  );
}