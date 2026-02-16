export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
            <header className="p-4 border-b flex justify-between items-center">
                <h1 className="text-xl font-bold">NOSSO TRATO</h1>
                <nav>
                    <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</a>
                </nav>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="p-4 border-t text-center text-sm text-gray-500">
                &copy; 2026 Nosso Trato
            </footer>
        </div>
    );
}
