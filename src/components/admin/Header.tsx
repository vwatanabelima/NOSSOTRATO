export function Header() {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h1 className="text-lg font-medium text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Admin User</span>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">A</div>
            </div>
        </header>
    );
}
