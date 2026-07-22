import { Bell, Search, Moon } from "lucide-react";

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-zinc-400">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700 transition">
          <Search size={18} />
        </button>

        <button className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700 transition">
          <Bell size={18} />
        </button>

        <button className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700 transition">
          <Moon size={18} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
          P
        </div>
      </div>
    </header>
  );
}

export default Navbar;