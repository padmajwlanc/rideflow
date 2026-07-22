const rides = [
  {
    rider: "Rahul Sharma",
    driver: "Aman Singh",
    fare: "₹240",
    status: "Completed",
    time: "2 mins ago",
  },
  {
    rider: "Priya Patel",
    driver: "Karan Verma",
    fare: "₹185",
    status: "Requested",
    time: "5 mins ago",
  },
  {
    rider: "Neha Gupta",
    driver: "Vivek Kumar",
    fare: "₹320",
    status: "Cancelled",
    time: "9 mins ago",
  },
  {
    rider: "Rohit Mehta",
    driver: "Sahil Jain",
    fare: "₹410",
    status: "Completed",
    time: "15 mins ago",
  },
  {
    rider: "Ananya Joshi",
    driver: "Arjun Rao",
    fare: "₹275",
    status: "Completed",
    time: "22 mins ago",
  },
];

function getStatusColor(status) {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/20 text-emerald-400";

    case "Cancelled":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-blue-500/20 text-blue-400";
  }
}

export default function RecentRideTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
            <th className="pb-4 font-medium">Rider</th>
            <th className="pb-4 font-medium">Driver</th>
            <th className="pb-4 font-medium">Fare</th>
            <th className="pb-4 font-medium">Status</th>
            <th className="pb-4 font-medium">Time</th>
          </tr>
        </thead>

        <tbody>
          {rides.map((ride, index) => (
            <tr
              key={index}
              className="border-b border-zinc-900 transition hover:bg-zinc-800/40"
            >
              <td className="py-3 text-white">{ride.rider}</td>

              <td className="py-3 text-zinc-300">{ride.driver}</td>

              <td className="py-3 font-semibold text-white">
                {ride.fare}
              </td>

              <td className="py-3">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusColor(
                    ride.status
                  )}`}
                >
                  {ride.status}
                </span>
              </td>

              <td className="py-3 text-zinc-400">
                {ride.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}