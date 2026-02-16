
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
import { useMissions } from '@/hooks/useMissions';

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
                <Button className="font-bold">+ New Mission</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Mission</DialogTitle>
                    <DialogDescription>
                        Add a task for your players to complete.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                            Description
                        </Label>
                        <Textarea id="desc" value={desc} onChange={e => setDesc(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="xp" className="text-right">
                            XP Reward
                        </Label>
                        <Input id="xp" type="number" value={xp} onChange={e => setXp(Number(e.target.value))} className="col-span-3" required min={1} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="gold" className="text-right">
                            Gold Reward
                        </Label>
                        <Input id="gold" type="number" value={gold} onChange={e => setGold(Number(e.target.value))} className="col-span-3" required min={1} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Mission'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
