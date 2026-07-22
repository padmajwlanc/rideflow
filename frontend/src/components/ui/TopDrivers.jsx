const drivers = [
  {
    name: "Raj Patel",
    rides: 128,
    rating: 4.9,
  },
  {
    name: "Aman Singh",
    rides: 112,
    rating: 4.8,
  },
  {
    name: "Priya Sharma",
    rides: 104,
    rating: 4.8,
  },
  {
    name: "Vivek Kumar",
    rides: 97,
    rating: 4.7,
  },
];

export default function TopDrivers() {
  return (
    <div className="space-y-5">
      {drivers.map((driver, index) => (
        <div
          key={driver.name}
          className={`flex items-center justify-between rounded-xl p-4 transition duration-300 hover:scale-[1.01]
            ${
              index === 0
                ? "border border-yellow-500/40 bg-yellow-500/10"
                : "bg-zinc-800/40 hover:bg-zinc-800"
            }`}
        >
          <div>
            <h3 className="text-lg font-semibold text-white">
              {driver.name}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              {driver.rides} rides completed
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-amber-400">
              {index === 0 ? "🏆" : "★"} {driver.rating}
            </p>

            <p className="text-xs text-zinc-500">
              Rating
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}