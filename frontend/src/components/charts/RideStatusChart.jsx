import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 401,
  },
  {
    name: "Cancelled",
    value: 68,
  },
  {
    name: "Requested",
    value: 31,
  },
];

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
];

export default function RideStatusChart() {
  return (
    <div className="flex h-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={75}
            outerRadius={110}
            paddingAngle={4}
            animationDuration={1800}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}

            <Label
              value="500"
              position="center"
              fill="#ffffff"
              fontSize={30}
              fontWeight="bold"
            />
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              color: "#ffffff",
            }}
            formatter={(value, name) => [value, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}