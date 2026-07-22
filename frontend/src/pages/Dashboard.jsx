import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import SectionCard from "../components/ui/SectionCard";
import RevenueAnalytics from "../components/charts/RevenueAnalytics";
import RideStatusChart from "../components/charts/RideStatusChart";
import RecentRideTable from "../components/ui/RecentRideTable";
import TopDrivers from "../components/ui/TopDrivers";

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Real-time overview of RideFlow."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Revenue" value="₹18,420" />
        <StatCard title="Today's Requests" value="146" />
        <StatCard title="Completed Rides" value="132" />
        <StatCard title="Drivers Online" value="37" />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard
          title="Revenue Analytics"
          className="h-[420px] xl:col-span-2"
          header={
            <div className="text-right">
              <p className="text-3xl font-bold text-white">
                ₹1,43,862
              </p>

              <p className="mt-1 flex items-center justify-end gap-1 text-sm font-medium text-emerald-400">
                ▲ 12.4% from last week
              </p>
            </div>
          }
        >
          <RevenueAnalytics />
        </SectionCard>

        <SectionCard
          title="Ride Status"
          className="h-[420px]"
        >
          <RideStatusChart />
        </SectionCard>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <SectionCard title="Recent Ride Activity">
          <RecentRideTable />
        </SectionCard>
      </div>

      {/* Top Drivers */}
      <div className="mt-6">
        <SectionCard title="Top Drivers">
          <TopDrivers />
        </SectionCard>
      </div>
    </>
  );
}