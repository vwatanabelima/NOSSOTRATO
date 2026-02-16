export function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-full">
            <div className="p-4 border-b border-slate-800">
                <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <a href="/admin/dashboard" className="block px-4 py-2 hover:bg-slate-800 rounded">Dashboard</a>
                <a href="/admin/dashboard/missions" className="block px-4 py-2 hover:bg-slate-800 rounded">Missions</a>
                <a href="/admin/dashboard/rewards" className="block px-4 py-2 hover:bg-slate-800 rounded">Rewards</a>
                <a href="/admin/dashboard/family" className="block px-4 py-2 hover:bg-slate-800 rounded">Family</a>
            </nav>
            <div className="p-4 border-t border-slate-800">
                <button className="w-full text-left px-4 py-2 hover:bg-slate-800 rounded text-red-400">Logout</button>
            </div>
        </aside>
    );
}
