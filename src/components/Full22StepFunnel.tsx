import React, { useState, useEffect } from 'react';
import { QuizAnswers, ProductConfig } from '../types';
import { ScratchCard } from './ScratchCard';
import {
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Gift,
  Lock,
  ChevronDown,
  RotateCcw,
  Check,
  AlertOctagon,
  Heart,
  Scale,
  Ruler,
  Award,
  Activity,
  Stethoscope,
  BookOpen,
  Flame,
  CheckCheck,
  MessageCircle,
} from 'lucide-react';

interface FullFunnelProps {
  config: ProductConfig;
  onOpenEditModal: () => void;
}

const INITIAL_ANSWERS: QuizAnswers = {
  ageBracket: '4 a 6 anos (Fase de Estrutura Óssea)',
  age: 5,
  gender: 'menino',
  currentHeight: 110,
  currentWeight: 19,
  motherHeight: 162,
  fatherHeight: 175,
  pickyLevel: '',
  ultraprocessedFreq: '',
  sleepQuality: '',
  fearBullying: '',
  motherGuilt: '',
  scratchedDone: false,
};

export const Full22StepFunnel: React.FC<FullFunnelProps> = ({ config, onOpenEditModal }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [selectedTemp, setSelectedTemp] = useState<string | null>(null);

  // Dynamic Loading simulation states for Step 12
  const [globalProgress, setGlobalProgress] = useState(0);
  const [barOms, setBarOms] = useState(0);
  const [barTanner, setBarTanner] = useState(0);
  const [barUltra, setBarUltra] = useState(0);
  const [barGh, setBarGh] = useState(0);
  const [diagnosticLog, setDiagnosticLog] = useState<string>('Iniciando análise dos parâmetros antropométricos...');

  // Timer countdown for Step 19 onwards
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 58);
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  useEffect(() => {
    if (step < 16) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // High-End Simulated Dynamic Loading for Step 12
  useEffect(() => {
    if (step !== 12) return;

    setGlobalProgress(4);
    setBarOms(8);
    setBarTanner(5);
    setBarUltra(2);
    setBarGh(0);
    setDiagnosticLog('Conectando ao banco de curvas antropométricas da OMS...');

    const timer = setInterval(() => {
      setGlobalProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;

        // Progressively fill sub-bars and update status logs
        if (next < 25) {
          setBarOms(Math.min(100, next * 3.8));
          setDiagnosticLog('Cruzando percentil de altura e peso com a tabela da OMS...');
        } else if (next < 55) {
          setBarOms(100);
          setBarTanner(Math.min(100, (next - 25) * 3.3));
          setDiagnosticLog('Calculando Estatura-Alvo de Tanner com a genética dos pais...');
        } else if (next < 80) {
          setBarTanner(100);
          setBarUltra(Math.min(100, (next - 55) * 4));
          setDiagnosticLog('Identificando marcadores inflamatórios de ultraprocessados no GH noturno...');
        } else if (next < 98) {
          setBarUltra(100);
          setBarGh(Math.min(100, (next - 80) * 5.2));
          setDiagnosticLog('Calculando janela de estirão biológico restante para a idade informada...');
        } else {
          setBarGh(100);
          setDiagnosticLog('Relatório concluído com sucesso! Gerando diagnóstico personalizado...');
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setStep(13);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 700);
          return 100;
        }

        return next;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [step]);

  // Auto-advance helper with instantaneous micro-feedback (350ms)
  const handleAutoAdvance = (key: keyof QuizAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSelectedTemp(String(value));

    setTimeout(() => {
      setSelectedTemp(null);
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 380);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Tanner Formula Calculation
  const calculateTanner = () => {
    let target = 0;
    if (answers.gender === 'menina') {
      target = (answers.motherHeight + (answers.fatherHeight - 13)) / 2;
    } else {
      target = (answers.motherHeight + answers.fatherHeight + 13) / 2;
    }
    const rounded = Math.round(target * 10) / 10;
    const min = Math.round((rounded - 5) * 10) / 10;
    const max = Math.round((rounded + 5) * 10) / 10;
    return { target: rounded, min, max };
  };

  const { target, min, max } = calculateTanner();

  const handleNext = () => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setAnswers(INITIAL_ANSWERS);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent = Math.min(100, Math.round((step / 22) * 100));

  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 pb-16 font-sans">
      {/* Top Header & Sticky Progress */}
      <div className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="bg-slate-900 text-white py-1.5 px-4 text-center text-[11px] sm:text-xs font-black uppercase tracking-tight flex items-center justify-center gap-2 border-b border-slate-800">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>PROTOCOLO OFICIAL CRIADO PELO DR. ARTHUR SILVA • CRM 148.920</span>
          <span className="hidden sm:inline bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40 font-bold">
            PEDIATRIA USP
          </span>
        </div>

        <div className="max-w-xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span className="text-emerald-700 font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              ETAPA {step} DE 22
            </span>
            <span className="font-mono text-slate-500 font-extrabold text-[11px]">
              {progressPercent}% CONCLUÍDO
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-300 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 sm:py-10">
        {/* ============================================================ */}
        {/* BLOCO 1: O GANCHO, QUALIFICAÇÃO E EFEITO BARNUM (ETAPAS 1 A 5) */}
        {/* ============================================================ */}

        {/* ETAPA 1: TELA DE IMPACTO INICIAL */}
        {step === 1 && (
          <div className="text-center animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-950 border border-red-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-pulse shadow-xs">
              <span>⚠️ ALERTA DE CRESCIMENTO INFANTIL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-[1.15] mb-4">
              SEU FILHO PODE FICAR <span className="text-[#DC2626]">ATÉ 10CM ABAIXO DA ALTURA IDEAL</span> POR UM ERRO INVISÍVEL NA ROTINA?
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-6">
              Descubra agora se o desenvolvimento dele está no ritmo correto ou se a janela biológica de crescimento está se fechando mais cedo.
            </p>

            {/* Selo Exclusivo de Autoria: Dr. Arthur Silva */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3.5 text-left max-w-lg mx-auto">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500 shadow-sm bg-slate-100">
                <img
                  src="/assets/aistudio/image_3feeeb3f.png"
                  alt="Dr. Arthur Silva - Criador do Método"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-[8px] font-black text-white text-center py-0.5 uppercase tracking-wider">
                  CRIADOR
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    MÉDICO CRIADOR DO MÉTODO
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    CRM 148.920 • RQE 72.415
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 truncate mt-0.5">
                  Dr. Arthur Silva
                </h3>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Pediatra pela USP • Membro da Sociedade Brasileira de Pediatria (SBP)
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs sm:text-sm text-slate-800 mb-8 space-y-2.5 shadow-xs">
              <p className="font-bold flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protocolo baseado na Fórmula Pediátrica de Tanner & Padrões da OMS</span>
              </p>
              <p className="font-bold flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Diagnóstico personalizado do potencial genético por idade (1 a 10 anos)</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="animate-cta-pulse w-full py-4 sm:py-5 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base sm:text-lg uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>👉 VERIFICAR O RITMO DE CRESCIMENTO AGORA</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 2: IDADE DO FILHO (AUTO-AVANÇO AO CLICAR) */}
        {step === 2 && (
          <div className="text-center animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                SEGMENTAÇÃO BIOLÓGICA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Qual é a faixa etária do seu filho(a)?
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6">
              Toque na opção para avançar automaticamente:
            </p>

            <div className="space-y-3 mb-6">
              {[
                { bracket: '1 a 3 anos (Fase de Estirão Infantil Rápido)', ageNum: 2 },
                { bracket: '4 a 6 anos (Fase de Estrutura e Consolidação Óssea)', ageNum: 5 },
                { bracket: '7 a 10 anos (Última Janela Pré-Puberal de Aceleração do GH)', ageNum: 8 },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAutoAdvance('ageBracket', item.bracket)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all font-bold text-sm sm:text-base flex items-center justify-between shadow-xs cursor-pointer active:scale-98 ${
                    selectedTemp === item.bracket || answers.ageBracket === item.bracket
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                      : 'border-neutral-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 text-neutral-900'
                  }`}
                >
                  <span>{item.bracket}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 3: SEXO DA CRIANÇA (AUTO-AVANÇO AO CLICAR) */}
        {step === 3 && (
          <div className="text-center animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-3 py-0.5 rounded-full">
                CURVA MÉDICA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Seu filho é menino ou menina?
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6">
              A fórmula de Tanner e a taxa de crescimento variam por sexo biológico:
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => handleAutoAdvance('gender', 'menino')}
                className={`p-6 sm:p-8 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                  selectedTemp === 'menino' || answers.gender === 'menino'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-300 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-blue-300'
                }`}
              >
                <span className="text-5xl">👦</span>
                <span className="text-lg font-black uppercase">Menino</span>
                <span className="text-[11px] text-blue-700 font-bold">Toque para selecionar</span>
              </button>

              <button
                type="button"
                onClick={() => handleAutoAdvance('gender', 'menina')}
                className={`p-6 sm:p-8 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                  selectedTemp === 'menina' || answers.gender === 'menina'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-300 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-rose-300'
                }`}
              >
                <span className="text-5xl">👧</span>
                <span className="text-lg font-black uppercase">Menina</span>
                <span className="text-[11px] text-rose-700 font-bold">Toque para selecionar</span>
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 4: DADOS ANTROPOMÉTRICOS (AMPLITUDE AMPLIADA DE MÍNIMO E MÁXIMO) */}
        {step === 4 && (
          <div className="text-center animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                MEDIÇÃO PRECISA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Altura e Peso Atuais da Criança
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-5">
              Ajuste no controle deslizante ou digite o valor exato:
            </p>

            {/* Imagem Temática de Medição de Altura das Crianças */}
            <div className="rounded-3xl overflow-hidden mb-6 border-2 border-amber-200 shadow-md bg-white p-2 sm:p-3 max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-amber-50">
                <img
                  src="/assets/aistudio/image_c2586d1e.png"
                  alt="Crianças acompanhando a medição de altura na régua de parede"
                  className="w-full max-h-56 sm:max-h-64 object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_c2586d1e.png';
                  }}
                />
                <div className="p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent absolute bottom-0 inset-x-0 text-white text-left">
                  <p className="text-xs sm:text-sm font-bold flex items-center gap-1.5 leading-snug">
                    <Ruler className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Cada centímetro na infância define o teto que o seu filho atingirá na vida adulta.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-3xl p-5 sm:p-6 text-left shadow-sm mb-6 space-y-6">
              {/* Height: Range 45 cm a 190 cm */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-black text-neutral-800 uppercase flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-emerald-600" />
                    Altura Atual (cm):
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="45"
                      max="190"
                      value={answers.currentHeight}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, currentHeight: Math.max(45, Math.min(190, Number(e.target.value))) }))}
                      className="w-20 text-center font-black font-mono bg-neutral-100 border border-neutral-300 rounded-lg px-2 py-1 text-base text-neutral-900 outline-none focus:border-emerald-600"
                    />
                    <span className="text-xs font-bold text-neutral-500">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="45"
                  max="190"
                  value={answers.currentHeight}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, currentHeight: Number(e.target.value) }))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>Mín: 45 cm</span>
                  <span>Média: 110 cm</span>
                  <span>Máx: 190 cm</span>
                </div>
              </div>

              {/* Weight: Range 5 kg a 95 kg */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-black text-neutral-800 uppercase flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-blue-600" />
                    Peso Atual (kg):
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="5"
                      max="95"
                      value={answers.currentWeight}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, currentWeight: Math.max(5, Math.min(95, Number(e.target.value))) }))}
                      className="w-20 text-center font-black font-mono bg-neutral-100 border border-neutral-300 rounded-lg px-2 py-1 text-base text-neutral-900 outline-none focus:border-blue-600"
                    />
                    <span className="text-xs font-bold text-neutral-500">kg</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={answers.currentWeight}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, currentWeight: Number(e.target.value) }))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>Mín: 5 kg</span>
                  <span>Média: 20 kg</span>
                  <span>Máx: 95 kg</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>AVANÇAR PARA PROJEÇÃO GENÉTICA</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 5: PROJEÇÃO GENÉTICA FAMILIAR (AMPLITUDE AMPLIADA DE MÃE E PAI) */}
        {step === 5 && (
          <div className="text-center animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                FÓRMULA DE TANNER
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Altura dos Pais Biológicos
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6">
              Ajuste ou digite para calcular o teto máximo de DNA:
            </p>

            <div className="bg-white border-2 border-neutral-200 rounded-3xl p-5 sm:p-6 text-left shadow-sm mb-6 space-y-6">
              {/* Mother: 130 cm a 210 cm */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-black text-neutral-800 uppercase flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    Altura da Mãe (cm):
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="130"
                      max="210"
                      value={answers.motherHeight}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, motherHeight: Math.max(130, Math.min(210, Number(e.target.value))) }))}
                      className="w-20 text-center font-black font-mono bg-neutral-100 border border-neutral-300 rounded-lg px-2 py-1 text-base text-neutral-900 outline-none focus:border-rose-500"
                    />
                    <span className="text-xs font-bold text-neutral-500">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="130"
                  max="210"
                  value={answers.motherHeight}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, motherHeight: Number(e.target.value) }))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>Mín: 130 cm</span>
                  <span>Média: 162 cm</span>
                  <span>Máx: 210 cm</span>
                </div>
              </div>

              {/* Father: 140 cm a 225 cm */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-black text-neutral-800 uppercase flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-blue-600" />
                    Altura do Pai (cm):
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="140"
                      max="225"
                      value={answers.fatherHeight}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, fatherHeight: Math.max(140, Math.min(225, Number(e.target.value))) }))}
                      className="w-20 text-center font-black font-mono bg-neutral-100 border border-neutral-300 rounded-lg px-2 py-1 text-base text-neutral-900 outline-none focus:border-blue-600"
                    />
                    <span className="text-xs font-bold text-neutral-500">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="140"
                  max="225"
                  value={answers.fatherHeight}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, fatherHeight: Number(e.target.value) }))}
                  className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono mt-1">
                  <span>Mín: 140 cm</span>
                  <span>Média: 175 cm</span>
                  <span>Máx: 225 cm</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>INICIAR ANÁLISE DE ROTINA & DOR</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* BLOCO 2: CONSCIÊNCIA, DOR EMOCIONAL E PROVAS SOCIAIS (6 A 11) */}
        {/* ============================================================ */}

        {/* ETAPA 6: SELETIVIDADE ALIMENTAR (AUTO-AVANÇO AO CLICAR) */}
        {step === 6 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-amber-900 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full shadow-xs">
                GUERRA À MESA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Seu filho recusa legumes, verduras e comida de verdade?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              Clique na opção correspondente para avançar automaticamente:
            </p>

            <div className="space-y-3 mb-6 text-left">
              {[
                { id: 'guerra', label: 'Sim! Toda refeição é uma briga e ele só aceita macarrão, pão ou besteiras' },
                { id: 'pouco', label: 'Come apenas 2 ou 3 tipos de alimentos conhecidos e recusa qualquer novidade' },
                { id: 'negocia', label: 'Come razoavelmente bem, mas com muita insistência e negociação diária' },
                { id: 'tudo', label: 'Não, come de tudo sem problemas' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAutoAdvance('pickyLevel', opt.label)}
                  className={`w-full p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    selectedTemp === opt.label || answers.pickyLevel === opt.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 7: O PERIGO OCULTO DOS ULTRAPROCESSADOS (AUTO-AVANÇO AO CLICAR) */}
        {step === 7 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-red-900 bg-red-50 border border-red-200 px-3 py-0.5 rounded-full shadow-xs">
                VILÕES INVISÍVEIS
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Com que frequência ele consome ultraprocessados?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              (Bolacha recheada, suco de caixinha, achocolatado, nuggets congelados ou salgadinhos)
            </p>

            <div className="space-y-3 mb-6 text-left">
              {[
                { id: 'diario', label: 'Praticamente todos os dias (em casa ou na lancheira da escola)' },
                { id: '3vezes', label: 'De 3 a 4 vezes por semana com frequência' },
                { id: 'raro', label: 'Raramente (apenas em festinhas ou fins de semana)' },
                { id: 'nunca', label: 'Quase nunca consome esses alimentos' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAutoAdvance('ultraprocessedFreq', opt.label)}
                  className={`w-full p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    selectedTemp === opt.label || answers.ultraprocessedFreq === opt.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 8: QUALIDADE DO SONO PROFUNDO (AUTO-AVANÇO AO CLICAR) */}
        {step === 8 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-blue-900 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-full shadow-xs">
                SÍNTESE ENDÓCRINA DO GH
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Como é a rotina de sono e energia dele à noite?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              Mais de 70% do GH biológico é sintetizado no sono profundo:
            </p>

            <div className="space-y-3 mb-6 text-left">
              {[
                { id: 'tarde', label: 'Dorme tarde, fica em telas/celular e acorda cansado ou irritado' },
                { id: 'agitado', label: 'Tem sono agitado, se mexe muito e acorda várias vezes durante a noite' },
                { id: 'profundo', label: 'Dorme cedo e tem um sono contínuo, profundo e restaurador' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAutoAdvance('sleepQuality', opt.label)}
                  className={`w-full p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    selectedTemp === opt.label || answers.sleepQuality === opt.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 9: A DOR PROFUNDA DO BULLYING / ESTIGMA SOCIAL (AUTO-AVANÇO AO CLICAR) */}
        {step === 9 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-rose-900 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full shadow-xs">
                ESTIGMA SOCIAL & AUTOESTIMA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Você já sentiu angústia de o seu filho ser "o baixinho da turma"?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-5">
              (O último da fila na escola, apelidos cruéis ou ficar sempre de lado nos esportes)
            </p>

            {/* Imagem Emocional de Alerta: Bullying e Estigma na Escola */}
            <div className="rounded-3xl overflow-hidden mb-6 border border-rose-200 shadow-md bg-white p-3 max-w-md mx-auto">
              <img
                src="/assets/aistudio/image_3b0ce1ff.png"
                alt="Criança sofrendo bullying e chacotas por causa da altura"
                className="w-full max-h-56 sm:max-h-64 object-contain mx-auto"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/public/assets/aistudio/image_3b0ce1ff.png';
                }}
              />
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-left">
                <p className="text-xs sm:text-sm font-bold text-rose-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>O estigma e o bullying por baixa estatura geram bloqueios emocionais e marcas na autoestima que perduram por toda a vida adulta.</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6 text-left">
              {[
                { id: 'pavor', label: 'Sim, morro de medo disso e sinto um aperto no peito só de imaginar' },
                { id: 'percebo', label: 'Já percebi que os coleguinhas da mesma idade estão disparando na frente dele' },
                { id: 'prevencao', label: 'Quero apenas garantir que ele atinja o limite máximo que a genética permitir' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAutoAdvance('fearBullying', opt.label)}
                  className={`w-full p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    selectedTemp === opt.label || answers.fearBullying === opt.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 10: A AUTO-COBRANÇA DA MÃE (AUTO-AVANÇO AO CLICAR) */}
        {step === 10 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-amber-900 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full shadow-xs">
                DESAFIO MATERNO
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Você já se sentiu culpada por ceder aos alimentos rápidos na correria?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6">
              A rotina moderna cansa qualquer família. Selecione para continuar:
            </p>

            <div className="space-y-3 mb-6 text-left">
              {[
                { id: 'frequente', label: 'Sim! Chego cansada do trabalho e acabo servindo o que é mais rápido' },
                { id: 'asvezes', label: 'Às vezes cedo para evitar o estresse e o choro na hora da janta' },
                { id: 'focada', label: 'Tento me esforçar ao máximo, mas sinto falta de um cardápio profissional mastigado' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAutoAdvance('motherGuilt', opt.label)}
                  className={`w-full p-4.5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    selectedTemp === opt.label || answers.motherGuilt === opt.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <span>{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ETAPA 11: CREDIBILIDADE ANTECIPADA - O EXPERT (CRIADOR DO MÉTODO) */}
        {step === 11 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full shadow-xs">
                CRIADOR & AUTOR EXCLUSIVO
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Conheça o Médico Criador do Método
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Todo o protocolo do <strong>Método de Crescimento GH</strong> foi desenvolvido e validado clinicamente pelo Dr. Arthur Silva:
            </p>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 text-left space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-3 border-emerald-600 shadow-md bg-slate-100">
                  <img
                    src="/assets/aistudio/image_3feeeb3f.png"
                    alt={config.expertName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-emerald-700 text-[9px] font-black text-white text-center py-1 uppercase tracking-wider">
                    CRIADOR DO MÉTODO
                  </span>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-1">Especialista Credenciado</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 uppercase">
                    {config.expertName}
                  </h3>
                  <p className="text-xs text-emerald-800 font-extrabold mb-1">
                    {config.expertCrm}
                  </p>
                  <p className="text-xs text-slate-600 font-bold mb-2">
                    {config.expertTitle}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Membro Titular da SBP
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <Award className="w-3.5 h-3.5 text-blue-600" />
                      Faculdade de Medicina da USP
                    </span>
                  </div>
                </div>
              </div>

              {/* Mensagem e Biografia do Criador */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="italic text-slate-800 font-semibold border-l-3 border-emerald-600 pl-3">
                  "Criei o Método de Crescimento GH após ver famílias perdidas com conselhos genéricos enquanto a janela de crescimento dos filhos fechava. Meu objetivo foi traduzir o estímulo endócrino do GH em um plano alimentar diário, 100% natural e acessível."
                </p>
                <p>
                  {config.expertBio}
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pesquisador pioneiro sobre o impacto dos ultraprocessados nas placas epifisárias</span>
                </div>
              </div>

              {/* 3 Medical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-bold text-slate-800">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 shadow-2xs">
                  <span className="block text-emerald-900 font-black text-lg">+8.400</span>
                  <span className="text-[11px] text-emerald-800 font-bold">Crianças Beneficiadas</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-2xs">
                  <span className="block text-blue-900 font-black text-lg">16 Anos</span>
                  <span className="text-[11px] text-blue-800 font-bold">Prática Pediátrica</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="block text-amber-900 font-black text-lg">100% Real</span>
                  <span className="text-[11px] text-amber-800 font-bold">Sem Remédios</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCESSAR DIAGNÓSTICO DO MEU FILHO</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* BLOCO 3: O DIAGNÓSTICO E TELA DE CARREGAMENTO DINÂMICA (12 A 15) */}
        {/* ============================================================ */}

        {/* ETAPA 12: TELA DE CARREGAMENTO DINÂMICA PROFISSIONAL */}
        {step === 12 && (
          <div className="text-center py-6 sm:py-8 animate-fadeIn">
            {/* Header of loading */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-950 border border-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-pulse">
              <Activity className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>SISTEMA INTEGRADO DE DIAGNÓSTICO PEDIÁTRICO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Processando Potencial Genético...
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
              Cruzando dados antropométricos de {answers.gender === 'menino' ? 'menino' : 'menina'} com os algoritmos de crescimento:
            </p>

            {/* Circular / Global Percentage Counter */}
            <div className="bg-white border-2 border-neutral-200 rounded-3xl p-6 shadow-xl mb-6 relative overflow-hidden max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Progresso Geral do Veredito:
                </span>
                <span className="text-4xl font-black font-mono text-emerald-700">
                  {globalProgress}%
                </span>
              </div>

              {/* Master Progress Bar */}
              <div className="w-full bg-neutral-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-neutral-200 mb-6 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-[#16A34A] rounded-full transition-all duration-300"
                  style={{ width: `${globalProgress}%` }}
                />
              </div>

              {/* 4 Multi-bars with Independent Status */}
              <div className="space-y-3.5 text-left text-xs font-bold text-neutral-800">
                {/* Bar 1 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${barOms === 100 ? 'text-emerald-600' : 'text-neutral-400'}`} />
                      Curva Antropométrica da OMS ({answers.currentHeight}cm / {answers.currentWeight}kg)
                    </span>
                    <span className="font-mono text-neutral-500">{barOms}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-200" style={{ width: `${barOms}%` }} />
                  </div>
                </div>

                {/* Bar 2 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${barTanner === 100 ? 'text-emerald-600' : 'text-neutral-400'}`} />
                      Fórmula de Tanner (Mãe: {answers.motherHeight}cm / Pai: {answers.fatherHeight}cm)
                    </span>
                    <span className="font-mono text-neutral-500">{barTanner}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full transition-all duration-200" style={{ width: `${barTanner}%` }} />
                  </div>
                </div>

                {/* Bar 3 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${barUltra === 100 ? 'text-emerald-600' : 'text-neutral-400'}`} />
                      Fator de Bloqueio Intestinal por Ultraprocessados
                    </span>
                    <span className="font-mono text-neutral-500">{barUltra}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full transition-all duration-200" style={{ width: `${barUltra}%` }} />
                  </div>
                </div>

                {/* Bar 4 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Check className={`w-3.5 h-3.5 ${barGh === 100 ? 'text-emerald-600' : 'text-neutral-400'}`} />
                      Janela Epifisária Restante para {answers.age} anos
                    </span>
                    <span className="font-mono text-neutral-500">{barGh}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-200" style={{ width: `${barGh}%` }} />
                  </div>
                </div>
              </div>

              {/* Dynamic Log Feed */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="truncate">{diagnosticLog}</span>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 13: O VEREDITO DO DIAGNÓSTICO */}
        {step === 13 && (
          <div className="animate-fadeIn text-center">
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-900 border border-red-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
              <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
              <span>DIAGNÓSTICO CRÍTICO CONCLUÍDO</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Risco Moderado a Alto de Estagnação Precoce
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6">
              Para seu filho de {answers.age} anos ({answers.gender === 'menino' ? 'menino' : 'menina'}):
            </p>

            <div className="bg-[#0B1329] text-white rounded-3xl p-6 text-left mb-6 shadow-xl border border-neutral-800">
              <div className="flex justify-between items-baseline border-b border-neutral-800 pb-4 mb-4">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase block font-bold">
                    Teto Máximo Genético:
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    {max.toFixed(0)} cm
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-neutral-400 uppercase block font-bold">
                    Risco Sem Correção:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
                    {min.toFixed(0)} cm
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-neutral-300 font-bold">
                  <span className="text-red-400">Limite Inferior: {min.toFixed(0)}cm</span>
                  <span className="text-amber-300">Média: {target.toFixed(0)}cm</span>
                  <span className="text-emerald-400">Teto Otimizado: {max.toFixed(0)}cm</span>
                </div>
                <div className="w-full bg-neutral-800 h-4 rounded-full overflow-hidden p-0.5 flex">
                  <div className="w-1/3 bg-red-500 rounded-l-full"></div>
                  <div className="w-1/3 bg-amber-400"></div>
                  <div className="w-1/3 bg-emerald-500 rounded-r-full"></div>
                </div>
                <p className="text-xs text-neutral-300 pt-2 leading-relaxed">
                  <strong className="text-white">Perda real de até 10 centímetros:</strong> O estilo alimentar relatado está travando a velocidade do crescimento, impedindo seu filho de atingir o topo do DNA da família.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VER URGÊNCIA DA JANELA BIOLÓGICA</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 14: A URGÊNCIA DA JANELA BIOLÓGICA */}
        {step === 14 && (
          <div className="animate-fadeIn text-center">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleBack} type="button" className="text-xs font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
              <span className="text-xs font-black uppercase text-red-800 bg-red-100 px-3 py-0.5 rounded-full">
                JANELA DE FECHAMENTO
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-3">
              O Tempo Biológico Não Perdoa e a Infância Não Tem Replay
            </h2>

            <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-5 sm:p-6 text-left mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-semibold">
                  Aos {answers.age} anos, as cartilagens epifisárias do seu filho ainda são maleáveis e absorvem cálcio com velocidade máxima.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-red-200">
                <span className="text-xs font-black text-neutral-900 uppercase block mb-1">
                  Linha do Tempo Inegociável:
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Cada ano que passa sem a nutrição exata é um ano a menos de multiplicação celular. Quando os ossos consolidam na puberdade, nenhum médico ou suplemento do mundo consegue devolver a altura perdida.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONHECER A SOLUÇÃO CIENTÍFICA</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 15: APRESENTAÇÃO DA SOLUÇÃO */}
        {step === 15 && (
          <div className="animate-fadeIn text-center">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
              PROTOCOLO OFICIAL CRIADO PELO DR. ARTHUR SILVA
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Método de Crescimento GH
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-md mx-auto font-medium">
              O mapa alimentar passo a passo desenvolvido pelo <strong>Dr. Arthur Silva</strong> para destrancar o potencial máximo de altura do seu filho com comida real:
            </p>

            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 mb-6 bg-white relative">
              <img
                src="/src/assets/images/metodo_gh_bundle_mockup_1793653561153.jpg"
                alt="Método de Crescimento GH - Dr. Arthur Silva"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/20">
                MATERIAL AUTORAL DO CRIADOR
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-3 mb-6 text-xs sm:text-sm shadow-xs">
              <p className="flex items-center gap-2.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cardápios balanceados por idade ({answers.age} anos) estruturados pelo Dr. Arthur</span>
              </p>
              <p className="flex items-center gap-2.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Combinações que aumentam a síntese biológica de GH durante o sono profundo</span>
              </p>
              <p className="flex items-center gap-2.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Técnicas de nutrientes disfarçados para crianças com seletividade severa</span>
              </p>
              <p className="flex items-center gap-2.5 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Substituições inteligentes para eliminar a inflamação dos ultraprocessados</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VER PRESENTE LIBERADO PELO CRIADOR</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* BLOCO 4: A RASPADINHA E FECHAMENTO IMPLACÁVEL (16 A 22) */}
        {/* ============================================================ */}

        {/* ETAPA 16: A GRANDE SURPRESA EXCLUSIVA - ANCORAGEM FORTE EM R$ 197,90 */}
        {step === 16 && (
          <div className="animate-fadeIn text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border-2 border-amber-300 shadow-sm">
              <Gift className="w-8 h-8 animate-bounce text-amber-600" />
            </div>

            <span className="text-xs font-black uppercase text-rose-800 bg-rose-50 border border-rose-200 px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
              BENEFÍCIO EMERGENCIAL AUTORIZADO
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              O valor oficial do protocolo é R$ 197,90...
            </h2>
            <p className="text-emerald-700 text-sm sm:text-base font-black uppercase tracking-wide mb-4">
              Mas você acaba de receber um desconto absurdo!
            </p>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 text-left mb-6 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold text-slate-600 uppercase">Valor de Tabela em Consultório:</span>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900 line-through decoration-rose-600 decoration-2">
                  R$ 197,90
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                O <strong>Dr. Arthur Silva</strong> determinou que o fator financeiro jamais deve ser a razão de uma criança perder a janela biológica de crescimento e ficar até 10cm mais baixa.
              </p>
              <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-950 font-bold">
                <Flame className="w-4 h-4 text-rose-600 shrink-0 fill-rose-600" />
                <span>Na próxima tela, você terá uma raspadinha digital para revelar o desconto que derruba esse valor para apenas R$ 37,90!</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="animate-cta-pulse w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>IR PARA A RASPADINHA E REVELAR O DESCONTO ABSURDO</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 17: A ETAPA DA RASPADINHA DIGITAL INTERATIVA */}
        {step === 17 && (
          <div className="animate-fadeIn text-center">
            <span className="text-xs font-black uppercase text-amber-900 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full mb-3 inline-block shadow-xs">
              AUTORIZAÇÃO PESSOAL DO CRIADOR • DR. ARTHUR SILVA
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-1">
              Raspe a cartela dourada abaixo!
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-2 font-medium">
              O valor original de <strong>R$ 197,90</strong> foi reduzido com um <strong>desconto absurdo de R$ 160,00</strong>:
            </p>
            <p className="text-rose-600 font-black text-xs uppercase mb-3 animate-pulse">
              👇 Passe o dedo ou o mouse para destravar o valor final de R$ 37,90 👇
            </p>

            {/* Interactive Scratch Card Component */}
            <ScratchCard
              anchorPrice={config.anchorPrice}
              offerPrice={config.offerPrice}
              onRevealed={() => setAnswers((prev) => ({ ...prev, scratchedDone: true }))}
            />

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 my-4 text-left flex items-center gap-2.5 text-xs text-emerald-950 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Você economizou exatamente R$ 160,00 (81% de desconto). Este valor de R$ {config.offerPrice} está bloqueado apenas nesta sessão.</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GARANTIR O DESCONTO (DE R$ 197,90 POR R$ {config.offerPrice})</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 18: QUEBRA DE OBJEÇÕES E GARANTIA BLINDADA */}
        {step === 18 && (
          <div className="animate-fadeIn text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white font-black text-base flex flex-col items-center justify-center mx-auto mb-4 shadow-md border-4 border-emerald-100">
              <span className="text-xl leading-none">7</span>
              <span className="text-[9px] uppercase leading-none font-bold">DIAS</span>
            </div>

            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-2 inline-block shadow-xs">
              COMPROMISSO ÉTICO DO CRIADOR
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-3">
              Garantia Pessoal do Dr. Arthur Silva
            </h2>

            <p className="text-slate-700 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              "Como médico pediatra e criador deste método, assumo 100% da responsabilidade. Ou você aplica os cardápios e comprova a melhora no apetite e crescimento do seu filho, ou <strong>eu devolvo cada centavo do seu dinheiro</strong>. Sem burocracia."
            </p>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-left text-xs sm:text-sm text-slate-800 space-y-2.5 mb-6 shadow-xs">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Acesso imediato e vitalício enviado no seu e-mail</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prático de consultar no celular, tablet ou imprimir</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero mensalidades ou cobranças surpresa</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>AVANÇAR PARA A CONDIÇÃO FINAL</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 19: ESCASSEZ DE SESSÃO / IP BLOQUEADO */}
        {step === 19 && (
          <div className="animate-fadeIn text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-900 border border-red-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-pulse">
              <Clock className="w-4 h-4 text-red-600" />
              <span>TEMPO RESTANTE DA SUA SESSÃO: {formatTimer(timeLeft)}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-3">
              Aviso de Bloqueio de IP e Expiração
            </h2>

            <div className="bg-red-950 text-white rounded-3xl p-6 text-left mb-6 border border-red-800 shadow-xl space-y-3">
              <p className="text-sm font-bold text-amber-300 uppercase flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Vaga Reservada por Tempo Limitado</span>
              </p>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                Este subsídio especial de <strong>R$ {config.offerPrice}</strong> foi calculado exclusivamente para o perfil de {answers.age} anos preenchido agora. Se você fechar esta aba, o desconto será cancelado e o valor retornará integralmente para {config.anchorPrice}.
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>VER RESULTADOS DE QUEM APLICOU</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 20: DEPOIMENTOS DE PROVA REAL (MÃES REAIS DO MÉTODO GH) */}
        {step === 20 && (
          <div className="animate-fadeIn text-center">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full mb-3 inline-block">
              TRANSFORMAÇÃO REAL • RELATOS DE MÃES
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Mães que Decidiram Não Esperar
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Veja a transformação de mães que venceram a guerra à mesa e destravaram o crescimento dos filhos com o protocolo do Dr. Arthur:
            </p>

            <div className="space-y-4 mb-6 text-left">
              {/* Depoimento Mãe 1: Mariana Soares */}
              <div className="bg-[#F0FDF4] border-2 border-emerald-300/80 rounded-3xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/aistudio/image_cf9cc51b.png"
                      alt="Mariana Soares - Mãe do Bernardo"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        Mariana Soares, 34 anos
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Compra Verificada
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700">
                      Mãe do Bernardo, 5 anos • Belo Horizonte - MG
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] font-bold text-slate-500 ml-1">
                        "Alívio que não tem preço"
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-200/70 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>
                    "Gente, só quem é mãe sabe o desespero de colocar um prato na mesa com todo amor do mundo e ver a criança chorar dizendo que não vai comer. O Bernardo estava há meses sem crescer 1 milímetro sequer, sempre o menorzinho da fila da creche. Eu chorava no banho achando que a culpa era minha."
                  </p>
                  <p>
                    "Quando comecei o Método GH do Dr. Arthur, foi um divisor de águas: os pratos com nutrientes disfarçados funcionaram no primeiro dia! Ele comeu legumes achando que era purezinho temperado. Ontem fomos ao pediatra para o retorno dos 40 dias e o médico confirmou: <strong>ele ganhou quase 2cm (1,9cm) na curva!</strong> Eu quase chorei no consultório. Saber que agi antes de fechar a janelinha dele me deu a maior paz da vida."
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-emerald-200/50">
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                    📈 +1,9 cm confirmados no pediatra
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    Hoje às 11:42 <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </span>
                </div>
              </div>

              {/* Depoimento Mãe 2: Fernanda Ribeiro */}
              <div className="bg-[#F0FDF4] border-2 border-emerald-300/80 rounded-3xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/aistudio/image_595594b9.png"
                      alt="Fernanda Ribeiro - Mãe do Theo"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        Fernanda Ribeiro, 39 anos
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Compra Verificada
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700">
                      Mãe do Theo, 7 anos • Campinas - SP
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] font-bold text-slate-500 ml-1">
                        "As calças começaram a pular canela!"
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-200/70 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>
                    "Eu trabalho fora o dia todo e chegava em casa esgotada. Na pressa, caía na facilidade de dar nugget, suco de caixinha e biscoito só pra não ter briga na janta. Mas o Theo vivia gripado, acordava no meio da noite e não espichava de jeito nenhum. A calça do ano retrasado ainda servia nele com folga!"
                  </p>
                  <p>
                    "Foi aí que vi a explicação do Dr. Arthur sobre como o açúcar invisível inflama as cartilagens e trava o GH noturno. Peguei o guia na hora por R$ 37,90. Troquei a ceia e os lanches da escola pelas opções rápidas do método. Mães, em menos de dois meses tive que doar todos os tênis e comprar calça nova porque começou a pular canela! Valeu cada centavo desse material."
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-emerald-200/50">
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                    👖 Guarda-roupa renovado • Salto no sono
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    Ontem às 18:20 <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </span>
                </div>
              </div>

              {/* Depoimento Mãe 3: Juliana Castilho (Novo Depoimento Adicionado) */}
              <div className="bg-[#F0FDF4] border-2 border-emerald-300/80 rounded-3xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative shrink-0">
                    <img
                      src="/assets/aistudio/image_ab1c94d1.png"
                      alt="Juliana Castilho - Mãe da Sophia"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        Juliana Castilho, 32 anos
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Compra Verificada
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700">
                      Mãe da Sophia, 4 anos • Goiânia - GO
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[11px] font-bold text-slate-500 ml-1">
                        "Parei de ouvir palpites e resolvi"
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-200/70 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
                  <p>
                    "A família inteira me dizia: <em>'Deixa, Juliana, você que é noiada, ela é miudinha assim mesma'</em>. Mas meu coração de mãe sentia que tinha algo travando a Sophia. Ela só aceitava mamadeira e biscoito de polvilho, cuspia qualquer proteína. Eu me pegava pensando: e se passar dos 10 anos e fechar a cartilagem, como vou me perdoar?"
                  </p>
                  <p>
                    "O guia do Dr. Arthur foi a salvação. O passo a passo dele de transição sem trauma fez a Sophia comer peixe e folhas sem nem perceber. Hoje ela mesma me pede para medir na fita métrica que colei na porta da sala: <strong>já passamos 2,3cm da marquinha antiga do ano passado!</strong> Não tem preço ver sua filha forte, corada e crescendo no ritmo certo."
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-emerald-200/50">
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                    📏 +2,3 cm marcados na fita da porta
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    Segunda às 09:15 <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>TIRAR ÚLTIMAS DÚVIDAS RÁPIDAS</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 21: FAQ / ÚLTIMAS DÚVIDAS RÁPIDAS */}
        {step === 21 && (
          <div className="animate-fadeIn text-center">
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full mb-3 inline-block">
              TRANSPARÊNCIA TOTAL
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 uppercase tracking-tight mb-2">
              Dúvidas Rápidas Antes de Acessar
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm mb-6">
              Respostas diretas para as principais perguntas de mães:
            </p>

            <div className="space-y-3 mb-8 text-left">
              {[
                {
                  id: 'faq-1',
                  q: 'O valor de R$ 37,90 é mensalidade?',
                  a: 'Não! É pagamento único. Você paga apenas uma vez e tem acesso livre ao material completo.',
                },
                {
                  id: 'faq-2',
                  q: 'Preciso comprar remédios ou suplementos caros?',
                  a: 'Zero remédios! O Método GH ensina combinações exclusivas com comida de verdade barata da feira e do mercado.',
                },
                {
                  id: 'faq-3',
                  q: 'Como vou receber o guia?',
                  a: 'O acesso chega imediatamente no seu e-mail após a aprovação do PIX ou cartão de crédito.',
                },
              ].map((f) => (
                <div key={f.id} className="border-2 border-neutral-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                    className="w-full p-4 flex justify-between items-center font-bold text-xs sm:text-sm text-neutral-900 cursor-pointer"
                  >
                    <span>{f.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === f.id ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === f.id && (
                    <div className="p-4 bg-neutral-50 text-xs text-neutral-700 border-t border-neutral-200 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-4 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base uppercase rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>IR PARA O CHECKOUT FINAL EXCLUSIVO</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ETAPA 22: CHECKOUT FINAL DE CONVERSÃO EXTREMA COM LINK WIAPY */}
        {step === 22 && (
          <div className="animate-fadeIn text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#DC2626] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider animate-pulse shadow-md">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>SUBSÍDIO DE RESGATE APROVADO • R$ {config.offerPrice}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              DESBLOQUEIE O CRESCIMENTO DO SEU FILHO ANTES DO FECHAMENTO DA JANELA
            </h1>

            <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative ring-4 ring-amber-300/30">
              {/* Creator Official Verification Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-6 flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500 shadow-xs bg-slate-100">
                  <img
                    src="/assets/aistudio/image_3feeeb3f.png"
                    alt="Dr. Arthur Silva"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                      CANAL OFICIAL DO CRIADOR
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      CRM 148.920
                    </span>
                  </div>
                  <p className="text-xs font-black text-slate-900 mt-0.5">
                    Dr. Arthur Silva — Autor e Criador do Método
                  </p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Você receberá o protocolo autêntico e atualizado com garantia direta do criador.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 line-through font-bold">
                De {config.anchorPrice}
              </p>

              <div className="flex items-baseline justify-center gap-1 my-2">
                <span className="text-2xl font-black text-slate-900">Por apenas R$</span>
                <span className="text-5xl sm:text-6xl font-black text-[#15803D] font-mono tracking-tight">
                  {config.offerPrice}
                </span>
              </div>

              <p className="text-xs font-black text-amber-900 uppercase mb-6 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200">
                Pagamento Único • Sem Mensalidades • Acesso Vitalício
              </p>

              <div className="text-left bg-slate-50 p-4.5 rounded-2xl border border-slate-200 mb-6 space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guia Oficial Método de Crescimento GH (Dr. Arthur Silva)</span>
                </p>
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cardápios Prontos por Faixa Etária ({answers.age} anos)</span>
                </p>
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calculadora Pediátrica da Estatura-Alvo (Tanner/OMS)</span>
                </p>
                <p className="flex items-center gap-2 font-bold text-rose-800">
                  <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>BÔNUS 1: E-book Os Alimentos Invisíveis que Travam o GH Infantil</span>
                </p>
                <p className="flex items-center gap-2 font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>BÔNUS 2: E-book Atividades Físicas de Estímulo Ósseo Diário</span>
                </p>
              </div>

              {/* Mother Social Proof strip */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-6 flex items-center justify-center gap-3 flex-wrap">
                <div className="flex -space-x-2 shrink-0">
                  <img src="/assets/aistudio/image_cf9cc51b.png" alt="Mariana" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src="/assets/aistudio/image_595594b9.png" alt="Fernanda" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs" />
                  <img src="/assets/aistudio/image_ab1c94d1.png" alt="Juliana" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-xs" />
                </div>
                <div className="text-left text-xs font-bold text-slate-800">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-black text-slate-900 ml-1">4.9/5 estrelas</span>
                  </div>
                  <span className="text-[11px] text-slate-600">Mais de 8.400 mães com o crescimento dos filhos destravado</span>
                </div>
              </div>

              {/* Final Big Green CTA Linking to https://pay.wiapy.com/AVDD0FpUpQ7W */}
              <a
                href={config.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-cta-pulse w-full py-5 px-6 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white font-black text-base sm:text-xl uppercase rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <span>QUERO DESBLOQUEAR O CRESCIMENTO DO MEU FILHO POR R$ {config.offerPrice} AGORA</span>
                <ChevronRight className="w-6 h-6 stroke-[3] shrink-0" />
              </a>

              <div className="flex items-center justify-center gap-3 text-neutral-500 text-xs font-bold mt-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  7 Dias de Garantia
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Acesso Imediato
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  Compra Segura Wiapy 256-Bit
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-neutral-400">
              <button
                type="button"
                onClick={handleRestart}
                className="hover:text-neutral-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Refazer Quizz do Zero
              </button>

              <button
                type="button"
                onClick={onOpenEditModal}
                className="underline hover:text-neutral-700 font-semibold cursor-pointer"
              >
                Configurar Link de Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
