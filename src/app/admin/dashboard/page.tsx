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

    // 5. Get Family Invite Code
    const { data: family } = await supabase
        .from('families')
        .select('invite_code')
        .eq('id', familyId)
        .single();

    // @ts-ignore
    const inviteCode = family?.invite_code || 'N/A';

    return { activeMissions, pendingApprovals, totalGold, formattedSubmissions, inviteCode };
}

export default async function AdminDashboardPage() {
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Control Center</h2>

            {/* Invite Code Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-blue-100 text-sm font-medium uppercase tracking-wider">Código de Convite da Família</h3>
                        <p className="text-4xl font-mono font-bold mt-2 tracking-widest">{stats.inviteCode}</p>
                        <p className="text-blue-200 text-xs mt-1">Compartilhe este código com seus filhos para eles entrarem na família.</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </div>
                </div>
            </div>

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
