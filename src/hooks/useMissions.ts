
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Task } from '@/types'; // Actually our DB 'missions' map to 'Task' frontend type more or less.
// Let's create a specific Mission type matching DB schema or reuse Task.
// DB 'missions' has: id, title, description, xp_reward, gold_reward, is_active, family_id, created_by

export interface Mission {
    id: string;
    family_id: string;
    title: string;
    description: string | null;
    xp_reward: number;
    gold_reward: number;
    is_active: boolean;
}

export function useMissions() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMissions = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        // First get family_id from profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('family_id')
            .eq('id', user.id)
            .single();

        if (!profile?.family_id) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('missions')
            .select('*')
            .eq('family_id', profile.family_id)
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Error fetching missions: ' + error.message);
        } else {
            setMissions(data || []);
        }
        setLoading(false);
    };

    const createMission = async (title: string, description: string, xp: number, gold: number) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase.from('profiles').select('family_id').eq('id', user.id).single();
        if (!profile?.family_id) return;

        const { error } = await supabase.from('missions').insert({
            family_id: profile.family_id,
            created_by: user.id,
            title,
            description,
            xp_reward: xp,
            gold_reward: gold,
            is_active: true
        });

        if (error) {
            toast.error('Failed to create mission: ' + error.message);
        } else {
            toast.success('Mission created successfully!');
            fetchMissions(); // Refresh list
        }
    };

    const deleteMission = async (id: string) => {
        const { error } = await supabase.from('missions').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete mission');
        } else {
            toast.success('Mission deleted');
            setMissions(prev => prev.filter(m => m.id !== id));
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchMissions();
    }, []);

    return { missions, loading, fetchMissions, createMission, deleteMission };
}
