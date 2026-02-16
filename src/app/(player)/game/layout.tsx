import { PlayerHUD } from '@/components/player/PlayerHUD';
import { PixelNavbar } from '@/components/player/PixelNavbar';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`min-h-screen bg-slate-900 text-white font-pixel antialiased selection:bg-purple-500 pb-24`}>
            <PlayerHUD /> {/* Sticky Top: XP, Level, Gold */}
            <main className="container mx-auto p-4">
                {children}
            </main>
            <PixelNavbar /> {/* Fixed Bottom: Navigation */}
        </div>
    );
}
