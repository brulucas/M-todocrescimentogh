import React, { useState } from 'react';
import { X, Save, RotateCcw, Link2, BookOpen, Tag } from 'lucide-react';
import { ProductConfig } from '../types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProductConfig;
  onSave: (newConfig: ProductConfig) => void;
  defaultConfig: ProductConfig;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  defaultConfig,
}) => {
  const [formData, setFormData] = useState<ProductConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(defaultConfig);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-neutral-300 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <h3 className="text-lg font-black text-neutral-900 uppercase">
              Configurações do Quizz & Checkout
            </h3>
            <p className="text-xs text-neutral-500">
              Personalize o link da sua plataforma de pagamento (Hotmart, Kiwify, Eduzz, etc.) e o valor.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
              Nome do Produto / Método
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full px-3 py-2 text-sm border-2 border-neutral-300 rounded-xl focus:border-neutral-900 outline-none font-medium"
              placeholder="Ex: Método de Crescimento GH"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-neutral-500" />
              Link do Checkout Final (R$ {formData.offerPrice})
            </label>
            <input
              type="text"
              value={formData.checkoutUrl}
              onChange={(e) => setFormData({ ...formData, checkoutUrl: e.target.value })}
              className="w-full px-3 py-2 text-sm border-2 border-neutral-300 rounded-xl focus:border-neutral-900 outline-none font-mono text-xs"
              placeholder="https://pay.kiwify.com.br/... ou https://hotm.art/..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-neutral-500" />
                Preço da Oferta (R$)
              </label>
              <input
                type="text"
                value={formData.offerPrice}
                onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                className="w-full px-3 py-2 text-sm border-2 border-neutral-300 rounded-xl focus:border-neutral-900 outline-none font-mono text-xs"
                placeholder="37,90"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-neutral-500" />
                Preço Âncora Riscado
              </label>
              <input
                type="text"
                value={formData.anchorPrice}
                onChange={(e) => setFormData({ ...formData, anchorPrice: e.target.value })}
                className="w-full px-3 py-2 text-sm border-2 border-neutral-300 rounded-xl focus:border-neutral-900 outline-none font-mono text-xs"
                placeholder="R$ 197,90"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
              Nome do Médico Especialista
            </label>
            <input
              type="text"
              value={formData.expertName}
              onChange={(e) => setFormData({ ...formData, expertName: e.target.value })}
              className="w-full px-3 py-2 text-sm border-2 border-neutral-300 rounded-xl focus:border-neutral-900 outline-none font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-neutral-500 hover:text-neutral-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Padrão
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-black uppercase text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
