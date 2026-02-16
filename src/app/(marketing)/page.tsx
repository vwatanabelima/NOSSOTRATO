import Link from 'next/link';
import { Gamepad2, Trophy, Shield, Coins, ArrowRight } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            <span className="font-pixel text-lg text-yellow-400 tracking-wider">NOSSO TRATO</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hidden md:block px-4 py-2 text-sm font-pixel text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-pixel uppercase rounded shadow-[0px_4px_0px_#581c87] active:shadow-none active:translate-y-[4px] transition-all">
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
            <span className="text-xs font-pixel text-purple-400 uppercase">🎮 Gamificação para Famílias</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Transforme Tarefas em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-pixel">Aventuras Épicas</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            O Nosso Trato transforma a rotina doméstica em um RPG divertido. Seus filhos ganham <span className="text-yellow-400 font-bold">XP</span> e <span className="text-yellow-400 font-bold">Ouro</span> ao cumprir missões, e você ganha paz de espírito.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white text-sm font-pixel uppercase rounded-lg shadow-[0px_6px_0px_#15803d] active:shadow-none active:translate-y-[6px] transition-all flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Criar Família Grátis
            </Link>
            <Link href="/login" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-pixel uppercase rounded-lg border-2 border-slate-700 hover:border-slate-600 transition-all flex items-center gap-2">
              Já tenho conta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold font-pixel text-slate-200 mb-3">Heróis & Missões</h3>
              <p className="text-slate-400 leading-relaxed">
                Esqueça o quadro de tarefas chato. Aqui, arrumar o quarto é uma missão que rende XP para subir de nível.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-yellow-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Coins className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold font-pixel text-slate-200 mb-3">Recompensas Reais</h3>
              <p className="text-slate-400 leading-relaxed">
                Ouro acumulado vira prêmios definidos por você: "1 Hora de TV", "Cinema" ou "Sorvete Extra".
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-pixel text-slate-200 mb-3">Controle do Mestre</h3>
              <p className="text-slate-400 leading-relaxed">
                Os pais têm um painel exclusivo para criar missões, aprovar tarefas com provas (fotos) e gerenciar o saldo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-center">
        <p className="text-slate-500 text-sm mb-4">
          Feito com ⚔️ e 🛡️ para famílias gamers.
        </p>
        <p className="text-slate-600 text-xs font-mono">
          © {new Date().getFullYear()} Nosso Trato. Level Up Your Family.
        </p>
      </footer>
    </div>
  );
}
