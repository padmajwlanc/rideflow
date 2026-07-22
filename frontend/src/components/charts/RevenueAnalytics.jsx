import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 16800 },
  { day: "Wed", revenue: 14300 },
  { day: "Thu", revenue: 19500 },
  { day: "Fri", revenue: 22600 },
  { day: "Sat", revenue: 27400 },
  { day: "Sun", revenue: 24300 },
];

export default function RevenueAnalytics() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: -20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#27272a"
          vertical={false}
        />

        <XAxis
          dataKey="day"
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tickFormatter={(value) => `₹${value / 1000}k`}
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            color: "#fff",
          }}
          formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#revenueFill)"
          animationDuration={1200}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}