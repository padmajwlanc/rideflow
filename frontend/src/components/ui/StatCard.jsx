function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:border-purple-500 hover:shadow-xl">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;