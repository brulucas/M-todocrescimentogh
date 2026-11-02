import React, { useRef, useEffect, useState } from 'react';
import { Flame, Check, Tag, ShieldCheck, ArrowDown } from 'lucide-react';

interface ScratchCardProps {
  onRevealed: () => void;
  anchorPrice?: string;
  offerPrice?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  onRevealed,
  anchorPrice = 'R$ 197,90',
  offerPrice = '37,90',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI resolution
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Fill scratch surface with luxury metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, '#B8860B');
    grad.addColorStop(0.25, '#FFD700');
    grad.addColorStop(0.5, '#FFF8DC');
    grad.addColorStop(0.75, '#DAA520');
    grad.addColorStop(1, '#8B6508');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Border inner frame on canvas
    ctx.strokeStyle = '#5B4200';
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, rect.width - 12, rect.height - 12);

    // Top anchor price hint
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔒 VALOR ORIGINAL DE TABELA: R$ 197,90', rect.width / 2, rect.height * 0.28);

    // Center call to scratch
    ctx.fillStyle = '#451A03';
    ctx.font = '900 16px sans-serif';
    ctx.fillText('👉 RASPE COM O DEDO AQUI 👈', rect.width / 2, rect.height * 0.50);

    // Bottom discount callout
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('LIBERE SEU DESCONTO ABSURDO (81% OFF)', rect.width / 2, rect.height * 0.72);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchedPercent();
  };

  const checkScratchedPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) clearPixels++;
      }
      const totalSampled = data.length / 16;
      if (clearPixels / totalSampled > 0.30) {
        revealCompletely();
      }
    } catch {
      // ignore
    }
  };

  const revealCompletely = () => {
    setIsRevealed(true);
    onRevealed();
  };

  return (
    <div className="relative max-w-md mx-auto my-4 select-none">
      {/* Anchor highlight strip above the scratch card */}
      <div className="mb-2 bg-slate-900 text-white rounded-xl px-3 py-1.5 flex items-center justify-between text-xs border border-slate-700 shadow-sm">
        <span className="text-slate-300 font-medium flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          Valor de Tabela:
        </span>
        <span className="font-mono font-bold line-through text-rose-400 text-sm">
          R$ 197,90
        </span>
      </div>

      {/* Background Revealed Prize Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 border-3 border-amber-400 rounded-3xl p-5 sm:p-6 text-center shadow-xl relative overflow-hidden ring-4 ring-amber-300/40">
        {/* Loud Absurd Discount Banner */}
        <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] sm:text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md animate-pulse">
          <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>DESCONTO ABSURDO DE R$ 160,00 CONFIRMADO!</span>
        </div>

        {/* Comparison Box */}
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-3.5 shadow-sm mb-3">
          <div className="grid grid-cols-2 gap-2 items-center divide-x divide-slate-200">
            {/* Old Price */}
            <div className="text-center">
              <span className="text-[10px] font-black uppercase text-slate-500 block mb-0.5">
                Preço Original:
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-rose-600 line-through decoration-red-600 decoration-3">
                R$ 197,90
              </span>
              <span className="text-[9px] text-slate-400 block font-medium">Valor de consulta</span>
            </div>

            {/* New Price */}
            <div className="text-center pl-2">
              <span className="text-[10px] font-black uppercase text-emerald-800 block mb-0.5">
                Com Desconto Absurdo:
              </span>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-xs font-bold text-slate-700">R$</span>
                <span className="text-3xl sm:text-4xl font-black text-[#15803D] font-mono tracking-tight">
                  {offerPrice}
                </span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 block bg-emerald-100/80 rounded px-1 py-0.2">
                ECONOMIA DE 81%
              </span>
            </div>
          </div>
        </div>

        {/* Microcopy Callouts */}
        <div className="space-y-1 mb-2">
          <p className="text-[11px] sm:text-xs font-black text-slate-900 uppercase">
            ⚡ De <span className="line-through text-rose-600">R$ 197,90</span> por apenas <span className="text-emerald-700 font-extrabold">R$ {offerPrice}</span>
          </p>
          <p className="text-[10px] text-slate-600 font-bold">
            Pagamento Único • Sem Mensalidades • Acesso Vitalício Imediato
          </p>
        </div>

        {/* Authority stamp */}
        <div className="pt-2 border-t border-amber-200 flex items-center justify-center gap-1.5 text-[10px] text-slate-700 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Subsídio Emergencial Autorizado pelo Dr. Arthur Silva (CRM 148.920)</span>
        </div>
      </div>

      {/* Canvas Scratch Overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={() => setIsDrawing(true)}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={(e) => isDrawing && scratch(e.clientX, e.clientY)}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              scratch(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className="absolute inset-0 w-full h-full rounded-3xl cursor-grab active:cursor-grabbing shadow-2xl touch-none"
        />
      )}

      {!isRevealed && (
        <div className="text-center mt-2.5">
          <button
            type="button"
            onClick={revealCompletely}
            className="text-xs text-amber-900 font-black underline hover:text-amber-950 cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <span>👉 Ou clique aqui para raspar e aplicar o desconto de R$ 197 por R$ {offerPrice}</span>
          </button>
        </div>
      )}
    </div>
  );
};
