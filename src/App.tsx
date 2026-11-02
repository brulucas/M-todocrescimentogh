import React, { useState } from 'react';
import { ProductConfig } from './types';
import { Full22StepFunnel } from './components/Full22StepFunnel';
import { ConfigModal } from './components/ConfigModal';

const DEFAULT_CONFIG: ProductConfig = {
  productName: 'Método de Crescimento GH',
  checkoutUrl: 'https://pay.wiapy.com/AVDD0FpUpQ7W',
  offerPrice: '37,90',
  anchorPrice: 'R$ 197,90',
  expertName: 'Dr. Arthur Silva',
  expertTitle: 'Médico Pediatra • Especialista em Nutrologia e Crescimento Infantil',
  expertCrm: 'CRM 148.920 • RQE 72.415',
  expertBio:
    'Médico formado pela Faculdade de Medicina da USP com especialização em Pediatria Clínica e pós-graduação em Endocrinologia & Nutrologia Pediátrica. Com mais de 16 anos de atendimento clínico e mais de 8.400 famílias acompanhadas, é autoridade nacional no estudo do fechamento epifisário precoce causado pela inflamação de alimentos ultraprocessados.',
};

export default function App() {
  const [config, setConfig] = useState<ProductConfig>(() => {
    try {
      const saved = localStorage.getItem('metodo_gh_quizz_config_v3');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveConfig = (newConfig: ProductConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('metodo_gh_quizz_config_v3', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 selection:bg-amber-400 selection:text-neutral-950">
      <main className="flex-1">
        <Full22StepFunnel
          config={config}
          onOpenEditModal={() => setIsModalOpen(true)}
        />
      </main>

      {/* Config Modal for Checkout Link & Price */}
      <ConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        defaultConfig={DEFAULT_CONFIG}
      />
    </div>
  );
}
