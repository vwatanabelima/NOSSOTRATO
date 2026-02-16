"use strict";
"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

interface Submission {
    id: string;
    mission_title: string;
    player_name: string;
    proof_url: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export function PendingSubmissionsList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

    const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        const { error } = await supabase
            .from('submissions')
            .update({ status, reviewed_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Failed to update submission: ' + error.message);
        } else {
            toast.success(`Submission ${status.toLowerCase()}!`);
            setSubmissions(prev => prev.filter(s => s.id !== id));
        }
    };

    if (submissions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 text-sm">No pending submissions to review.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Pending Approvals ({submissions.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {submissions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium text-sm">{sub.mission_title}</p>
                            <p className="text-xs text-gray-400">by {sub.player_name}</p>
                            <a href={sub.proof_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                                View Proof
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleReview(sub.id, 'APPROVED')}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleReview(sub.id, 'REJECTED')}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
