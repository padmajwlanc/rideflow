import { Bike, Car, CarTaxiFront } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Bike",
    description: "Fastest • 2 mins away",
    baseFare: 30,
    perKm: 8,
    icon: Bike,
  },
  {
    id: 2,
    name: "Auto Rickshaw",
    description: "Affordable • 5 mins away",
    baseFare: 40,
    perKm: 12,
    icon: CarTaxiFront,
  },
  {
    id: 3,
    name: "Mini",
    description: "Comfort • 7 mins away",
    baseFare: 60,
    perKm: 15,
    icon: Car,
  },
  {
    id: 4,
    name: "Sedan",
    description: "Premium • 10 mins away",
    baseFare: 80,
    perKm: 18,
    icon: Car,
  },
  {
    id: 5,
    name: "SUV",
    description: "Family • 12 mins away",
    baseFare: 100,
    perKm: 22,
    icon: Car,
  },
];

export default function VehicleSelector({
  selectedVehicle,
  setSelectedVehicle,
  distance,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Select Vehicle
      </h2>

      <div className="space-y-4">
        {vehicles.map((vehicle) => {
          const Icon = vehicle.icon;

          // Calculate fare based on distance
          const fare = Math.round(
            vehicle.baseFare + distance * vehicle.perKm
          );

          const isSelected =
            selectedVehicle?.id === vehicle.id;

          return (
            <button
              key={vehicle.id}
              onClick={() =>
                setSelectedVehicle({
                  ...vehicle,
                  price: fare,
                })
              }
              className={`flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-zinc-700 bg-zinc-800 hover:border-purple-500 hover:bg-zinc-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg p-3 ${
                    isSelected
                      ? "bg-purple-600"
                      : "bg-purple-500/10"
                  }`}
                >
                  <Icon
                    size={30}
                    className="text-purple-300"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {vehicle.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {vehicle.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-400">
                  ₹{fare}
                </p>

                <p className="text-xs text-zinc-500">
                  Estimated Fare
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}