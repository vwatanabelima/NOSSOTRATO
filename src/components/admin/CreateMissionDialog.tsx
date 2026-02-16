import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Coins, Star, Plus } from 'lucide-react';

interface CreateMissionDialogProps {
    onCreate: (title: string, desc: string, xp: number, gold: number) => Promise<void>;
}

export function CreateMissionDialog({ onCreate }: CreateMissionDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [xp, setXp] = useState(100);
    const [gold, setGold] = useState(50);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onCreate(title, desc, xp, gold);
        setLoading(false);
        setOpen(false);
        // Reset form
        setTitle('');
        setDesc('');
        setXp(100);
        setGold(50);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-pixel text-xs uppercase px-4 py-2 rounded shadow-[0px_4px_0px_#581c87] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Nova Missão
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-2 border-slate-700 text-white">
                <DialogHeader>
                    <DialogTitle className="font-pixel text-yellow-500 uppercase tracking-wide">Criar Nova Missão</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Defina o desafio para os seus jogadores.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-slate-300 font-pixel text-xs">
                            Título
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="col-span-3 bg-slate-800 border-slate-600 text-white focus-visible:ring-purple-500"
                            required
                            placeholder="Ex: Lavar a Louça"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right text-slate-300 font-pixel text-xs">
                            Detalhes
                        </Label>
                        <Textarea
                            id="desc"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            className="col-span-3 bg-slate-800 border-slate-600 text-white focus-visible:ring-purple-500"
                            placeholder="Descreva o que precisa ser feito..."
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="xp" className="text-right text-blue-400 font-pixel text-xs flex items-center justify-end gap-1">
                            <Star className="w-3 h-3" /> XP
                        </Label>
                        <Input
                            id="xp"
                            type="number"
                            value={xp}
                            onChange={e => setXp(Number(e.target.value))}
                            className="col-span-3 bg-slate-800 border-slate-600 text-white focus-visible:ring-blue-500"
                            required
                            min={1}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gold" className="text-right text-yellow-400 font-pixel text-xs flex items-center justify-end gap-1">
                            <Coins className="w-3 h-3" /> Gold
                        </Label>
                        <Input
                            id="gold"
                            type="number"
                            value={gold}
                            onChange={e => setGold(Number(e.target.value))}
                            className="col-span-3 bg-slate-800 border-slate-600 text-white focus-visible:ring-yellow-500"
                            required
                            min={1}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white font-pixel uppercase text-xs w-full shadow-[0px_4px_0px_#15803d] active:shadow-none active:translate-y-[4px] transition-all"
                        >
                            {loading ? 'Criando...' : 'Confirmar Missão'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
