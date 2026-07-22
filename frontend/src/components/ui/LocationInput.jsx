import { MapPin, Navigation } from "lucide-react";

export default function LocationInput() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="grid gap-4 md:grid-cols-2">

        {/* Pickup */}
        <div className="relative">
          <MapPin
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400"
          />

          <input
            type="text"
            placeholder="Pickup Location"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white outline-none transition focus:border-purple-500"
          />
        </div>

        {/* Destination */}
        <div className="relative">
          <Navigation
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"
          />

          <input
            type="text"
            placeholder="Destination"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white outline-none transition focus:border-purple-500"
          />
        </div>

      </div>
    </div>
  );
}