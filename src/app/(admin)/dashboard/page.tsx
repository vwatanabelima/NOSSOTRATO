import { createClient } from "@/lib/supabase-server";
import { PendingSubmissionsList } from "@/components/admin/PendingSubmissionsList";

async function getStats() {
    const supabase = await createClient();

    // Get current user to find family_id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { activeMissions: 0, pendingApprovals: 0, totalGold: 0 };

    const { data: profile } = await supabase
        .from('profiles')
        .select('family_id')
        .eq('id', user.id)
        .single();

    if (!profile?.family_id) return { activeMissions: 0, pendingApprovals: 0, totalGold: 0 };

    const familyId = profile.family_id;

    // 1. Active Missions
    const { count: activeMissions } = await supabase
        .from('missions')
        .select('*', { count: 'exact', head: true })
        .eq('family_id', familyId)
        .eq('is_active', true);

    // 2. Pending Approvals (Submissions)
    // Submissions are linked to missions, which are linked to family.
    // We need to filter submissions where mission.family_id = our family_id
    const { count: pendingApprovals } = await supabase
        .from('submissions')
        .select('id, missions!inner(family_id)', { count: 'exact', head: true })
        .eq('status', 'PENDING')
        .eq('missions.family_id', familyId);

    // 3. Total Gold Issued (Sum of gold_balance of all family members)
    const { data: familyMembers } = await supabase
        .from('profiles')
        .select('gold_balance')
        .eq('family_id', familyId);

    const totalGold = familyMembers?.reduce((sum, member) => sum + (member.gold_balance || 0), 0) || 0;

    // 4. Get Pending Submissions List
    const { data: submissions } = await supabase
        .from('submissions')
        .select(`
            id,
            proof_url,
            status,
            missions ( title ),
            profiles ( username )
        `)
        .eq('status', 'PENDING')
        .eq('missions.family_id', familyId);

    // @ts-ignore
    const formattedSubmissions = submissions?.map(s => ({
        id: s.id,
        // @ts-ignore
        mission_title: s.missions?.title || 'Unknown Mission',
        // @ts-ignore
        player_name: s.profiles?.username || 'Unknown Player',
        proof_url: s.proof_url,
        status: s.status
    })) || [];

    return { activeMissions, pendingApprovals, totalGold, formattedSubmissions };
}

export default async function AdminDashboardPage() {
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Control Center</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Active Missions</h3>
                    <p className="text-3xl font-bold mt-2">{stats.activeMissions || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                    <p className="text-3xl font-bold mt-2 text-yellow-600">{stats.pendingApprovals || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-gray-500 text-sm font-medium">Total Gold Issued</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">{stats.totalGold}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* @ts-ignore */}
                <PendingSubmissionsList initialSubmissions={stats.formattedSubmissions} />
            </div>
        </div>
    );
}
