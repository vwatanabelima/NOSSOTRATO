"use strict";
"use client";

import { useMissions } from '@/hooks/useMissions';
import { CreateMissionDialog } from '@/components/admin/CreateMissionDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Trash2 } from 'lucide-react';

export default function MissionsPage() {
    const { missions, loading, createMission, deleteMission } = useMissions();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Missions Manager</h2>
                    <p className="text-gray-500">Create tasks for your family.</p>
                </div>
                <CreateMissionDialog onCreate={createMission} />
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            ) : missions.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-lg border border-dashed">
                    <p className="text-gray-500">No missions found. Create your first one!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {missions.map((mission) => (
                        <Card key={mission.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold">
                                    {mission.title}
                                </CardTitle>
                                <div className="flex gap-2 text-sm">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">{mission.xp_reward} XP</span>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-medium">{mission.gold_reward} Gold</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">{mission.description}</p>
                                <div className="flex justify-end">
                                    <Button variant="destructive" size="sm" onClick={() => {
                                        if (confirm('Are you sure you want to delete this mission?')) {
                                            deleteMission(mission.id);
                                        }
                                    }}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
