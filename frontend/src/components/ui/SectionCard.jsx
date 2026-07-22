function SectionCard({
  title,
  header,
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 ${className}`}
    >
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        {header}
      </div>

      {children}
    </div>
  );
}

export default SectionCard;