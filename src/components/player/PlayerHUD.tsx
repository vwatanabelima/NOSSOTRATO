export function PlayerHUD() {
    return (
        <div className="sticky top-0 z-50 bg-slate-900 border-b-4 border-slate-700 p-2 font-pixel text-xs text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-yellow-400 border-2 border-white text-black flex items-center justify-center font-bold">
                        LVL 1
                    </div>
                    <div className="flex flex-col">
                        <span className="text-yellow-400 uppercase">Hero</span>
                        <div className="w-24 h-3 bg-slate-700 border border-white relative">
                            <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full border border-yellow-200"></div>
                        <span className="text-yellow-400">50G</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
