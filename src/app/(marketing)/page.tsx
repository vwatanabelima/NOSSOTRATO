"use client";

import Link from 'next/link';
import { Gamepad2, Trophy, Shield, Coins, ArrowRight, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MarketingPage() {
  const [text, setText] = useState("");
  const fullText = "Aventuras Épicas";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 relative overflow-x-hidden">

      {/* CRT Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

      {/* Navbar */}
      <nav className="border-b-4 border-slate-800 bg-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Gamepad2 className="w-8 h-8 text-yellow-400 relative z-10 animate-pulse" />
            </div>
            <span className="font-pixel text-xl text-white tracking-wider drop-shadow-[2px_2px_0px_#581c87]">NOSSO TRATO</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hidden md:block px-6 py-2 text-xs font-pixel text-slate-300 hover:text-white transition-colors uppercase tracking-widest hover:underline decoration-wavy decoration-purple-500">
              Login
            </Link>
            <Link href="/register" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-pixel uppercase rounded-none border-b-4 border-purple-900 active:border-b-0 active:translate-y-1 transition-all shadow-[0px_0px_15px_rgba(147,51,234,0.5)]">
              Start Game
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 animate-[pulse_4s_ease-in-out_infinite]"></div>

        {/* Floating Pixels Animation */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] animate-bounce delay-100"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-500 shadow-[6px_6px_0px_rgba(0,0,0,0.5)] animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-blue-400 shadow-[3px_3px_0px_rgba(0,0,0,0.5)] animate-bounce delay-300"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-8 px-4 py-2 bg-slate-900 border-2 border-slate-700 shadow-[4px_4px_0px_#1e293b]">
            <span className="text-[10px] font-pixel text-green-400 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Sistema Online • v1.0
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Transforme Tarefas em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 font-pixel drop-shadow-[4px_4px_0px_rgba(88,28,135,0.5)]">
              {text}<span className="animate-pulse">_</span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed border-l-4 border-yellow-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0 font-mono">
            O <strong className="text-white">Nosso Trato</strong> é o RPG da vida real. Complete missões diárias, suba de nível e troque seu <span className="text-yellow-400">Ouro</span> por recompensas lendárias.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/register" className="group relative px-8 py-4 bg-green-600 hover:bg-green-500 text-white text-xs font-pixel uppercase rounded-sm border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all">
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
              <span className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Criar Conta Grátis
              </span>
            </Link>
            <Link href="/login" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-pixel uppercase rounded-sm border-b-4 border-slate-900 hover:border-slate-800 transition-all flex items-center gap-3 group">
              <span>Continuar Jogo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8-Bit Features Grid */}
      <section className="py-24 bg-slate-900 border-t-4 border-slate-800 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-6 py-2 border-2 border-slate-700">
          <h2 className="font-pixel text-yellow-400 text-sm uppercase tracking-widest">Recursos do Jogo</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-950 p-8 border-2 border-slate-800 hover:border-purple-500 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_#1e293b] group">
              <div className="w-16 h-16 bg-purple-900/20 border-2 border-purple-500/50 flex items-center justify-center mb-6 group-hover:bg-purple-900/40 transition-colors">
                <Shield className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform pixelated" />
              </div>
              <h3 className="text-lg font-bold font-pixel text-white mb-4 flex items-center gap-2">
                <span className="text-purple-500">&gt;</span> Heróis & Quests
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">
                Transforme "arrumar a cama" em uma Quest Diária que concede XP e ajuda a subir de nível no ranking da família.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-950 p-8 border-2 border-slate-800 hover:border-yellow-500 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_#1e293b] group">
              <div className="w-16 h-16 bg-yellow-900/20 border-2 border-yellow-500/50 flex items-center justify-center mb-6 group-hover:bg-yellow-900/40 transition-colors">
                <Coins className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform pixelated" />
              </div>
              <h3 className="text-lg font-bold font-pixel text-white mb-4 flex items-center gap-2">
                <span className="text-yellow-500">&gt;</span> Loot Real
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">
                Acumule Ouro para comprar itens na Loja da Família: "Tempo de Tela", "Cinema", "Pizza" e muito mais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-950 p-8 border-2 border-slate-800 hover:border-blue-500 hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_#1e293b] group">
              <div className="w-16 h-16 bg-blue-900/20 border-2 border-blue-500/50 flex items-center justify-center mb-6 group-hover:bg-blue-900/40 transition-colors">
                <Trophy className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform pixelated" />
              </div>
              <h3 className="text-lg font-bold font-pixel text-white mb-4 flex items-center gap-2">
                <span className="text-blue-500">&gt;</span> Painel Admin
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">
                Controle total para os pais (Game Masters): crie missões, aprove tarefas e gerencie o saldo de todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-4 border-slate-800 bg-slate-950 text-center relative z-10">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
          <span className="font-pixel text-xs text-slate-500 uppercase">Power Up Your Routine</span>
          <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
        </div>
        <p className="text-slate-600 text-[10px] font-pixel">
          PRESS START TO BEGIN • © {new Date().getFullYear()} NOSSO TRATO
        </p>
      </footer>
    </div>
  );
}
