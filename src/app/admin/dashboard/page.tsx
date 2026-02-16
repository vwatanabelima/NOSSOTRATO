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

            {/* Invite Code Card */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 border-2 border-blue-500 text-white p-6 rounded-lg shadow-[0px_0px_15px_rgba(59,130,246,0.3)] relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <h3 className="text-blue-300 text-xs font-pixel uppercase tracking-wider mb-2">Código de Convite</h3>
                        <p className="text-4xl font-pixel text-white tracking-widest drop-shadow-md">{stats.inviteCode}</p>
                        <p className="text-slate-400 text-[10px] mt-2 font-pixel">Compartilhe com os jogadores para entrarem na guilda.</p>
                    </div>
                    <div className="bg-blue-500/20 p-4 rounded-full border border-blue-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-lg border-2 border-slate-700 shadow-md">
                    <h3 className="text-slate-400 text-xs font-pixel uppercase">Missões Ativas</h3>
                    <p className="text-3xl font-pixel text-yellow-400 mt-2">{stats.activeMissions || 0}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border-2 border-slate-700 shadow-md">
                    <h3 className="text-slate-400 text-xs font-pixel uppercase">Aprovações Pendentes</h3>
                    <p className="text-3xl font-pixel text-orange-400 mt-2">{stats.pendingApprovals || 0}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-lg border-2 border-slate-700 shadow-md">
                    <h3 className="text-slate-400 text-xs font-pixel uppercase">Ouro em Circulação</h3>
                    <p className="text-3xl font-pixel text-green-400 mt-2">{stats.totalGold}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* @ts-ignore */}
                <PendingSubmissionsList initialSubmissions={stats.formattedSubmissions} />
            </div>
        </div>
    );
}
