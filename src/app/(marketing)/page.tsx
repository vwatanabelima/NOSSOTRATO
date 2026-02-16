import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6">
        Turn Chores into <span className="text-purple-600">Adventures</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Nosso Trato gamifies household tasks. Kids earn XP and Gold for completing missions, and parents get peace of mind.
      </p>

      <div className="flex gap-4">
        <Link href="/login" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
          Start Your Adventure
        </Link>
        <Link href="/login" className="px-8 py-4 bg-white text-blue-600 border border-blue-200 rounded-lg font-bold hover:bg-gray-50 transition shadow-sm">
          Parent Dashboard
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="font-bold text-lg mb-2">Heroes & Quests</h3>
          <p className="text-gray-500">Transform daily tasks into epic missions with real progress.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="font-bold text-lg mb-2">Real Rewards</h3>
          <p className="text-gray-500">Earn Gold to redeem for screen time, toys, or custom treats.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-bold text-lg mb-2">Parent Control</h3>
          <p className="text-gray-500">Easy-to-use dashboard to manage tasks and approve completion.</p>
        </div>
      </div>
    </div>
  );
}
