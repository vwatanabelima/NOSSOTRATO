import { Home, Map, ShoppingBag, Trophy } from 'lucide-react';

export function PixelNavbar() {
    return (
        <nav className="fixed bottom-0 w-full bg-slate-900 border-t-4 border-slate-700 pb-safe font-pixel text-[10px] text-white z-50">
            <div className="flex justify-around items-center p-2">
                <a href="/player/game" className="flex flex-col items-center gap-1 text-yellow-400">
                    <Map className="w-6 h-6 stroke-2" />
                    <span>MISSÕES</span>
                </a>
                <a href="/player/game/inventory" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
                    <Home className="w-6 h-6 stroke-2" />
                    <span>MOCHILA</span>
                </a>
                <a href="/player/game/shop" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
                    <ShoppingBag className="w-6 h-6 stroke-2" />
                    <span>LOJA</span>
                </a>
                <a href="/player/game/ranking" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
                    <Trophy className="w-6 h-6 stroke-2" />
                    <span>RANK</span>
                </a>
            </div>
        </nav>
    );
}
