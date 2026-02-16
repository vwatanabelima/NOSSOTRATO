
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Quest {
    id: string;
    title: string;
    description: string;
    xp_reward: number;
    gold_reward: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
}

export function usePlayerQuests() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuests = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        // 1. Get Profile (Family ID)
        const { data: profile } = await supabase
            .from('profiles')
            .select('family_id')
            .eq('id', user.id)
            .single();

        if (!profile?.family_id) {
            setLoading(false);
            return;
        }

        // 2. Get Active Missions
        const { data: missions, error: missionsError } = await supabase
            .from('missions')
            .select('id, title, description, xp_reward, gold_reward')
            .eq('family_id', profile.family_id)
            .eq('is_active', true);

        if (missionsError) {
            toast.error('Error fetching missions');
            setLoading(false);
            return;
        }

        // 3. Get User Submissions
        const { data: submissions, error: submissionsError } = await supabase
            .from('submissions')
            .select('mission_id, status')
            .eq('player_id', user.id);

        if (submissionsError) {
            toast.error('Error fetching submissions');
        }

        // 4. Merge Data
        const merged: Quest[] = missions.map(m => {
            const sub = submissions?.find(s => s.mission_id === m.id);
            return {
                ...m,
                status: sub ? sub.status : null
            };
        });

        setQuests(merged);
        setLoading(false);
    };

    const submitQuest = async (missionId: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Mock Image URL
        const proofUrl = "https://placehold.co/600x400";

        const { error } = await supabase.from('submissions').insert({
            mission_id: missionId,
            player_id: user.id,
            proof_url: proofUrl,
            status: 'PENDING'
        });

        if (error) {
            toast.error('Failed to submit quest: ' + error.message);
        } else {
            toast.success('Quest submitted! Waiting for approval.');
            fetchQuests(); // Refresh
        }
    };

    useEffect(() => {
        fetchQuests();
    }, []);

    return { quests, loading, submitQuest };
}
