export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
            {children}
        </main>
    );
}
