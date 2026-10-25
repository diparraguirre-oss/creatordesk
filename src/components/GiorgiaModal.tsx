'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, ArrowRight, Loader2 } from 'lucide-react';

interface ChatMessage {
  sender: 'giorgia' | 'user';
  text: string;
  options?: string[];
}

interface GiorgiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiorgiaModal({ isOpen, onClose }: GiorgiaModalProps) {
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'giorgia',
      text: '¡Hola! Soy GiorgIA 🤖, tu manager digital inteligente. Cuéntame sobre tus campañas, dudas de tarifas o propuestas de marcas.',
      options: [
        '💰 GiorgIA Finanzas (Cotizar tarifario)',
        '📊 GiorgIA Analiza (Métricas y rendimiento)',
        '🤝 GiorgIA Negocia (Ofertas y contratos)',
        '💡 GiorgIA Recomienda (Siguiente paso)'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const input = textToSend || chatInput;
    if (!input.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    if (!textToSend) setChatInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/giorgia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'giorgia', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { sender: 'giorgia', text: 'Entendido. Cuéntame los detalles de esa propuesta de campaña y la evaluamos juntos.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#111726] border border-purple-500/30 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col h-[580px] overflow-hidden relative">
        
        {/* Header Chat GiorgIA */}
        <div className="p-4 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                GiorgIA Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </h3>
              <p className="text-[10px] text-purple-300">Tu Manager Digital Inteligente</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Mensajes Chat */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl ${
                m.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-[#090D16] border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
              </div>

              {m.options && m.options.length > 0 && (
                <div className="mt-3 space-y-2 w-full">
                  {m.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSend(opt)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#090D16] border border-purple-500/20 hover:border-purple-500/60 hover:bg-purple-500/10 text-purple-300 font-semibold transition-all flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-purple-400 text-xs italic">
              <Loader2 size={14} className="animate-spin" />
              <span>GiorgIA está pensando la respuesta...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Chat */}
        <div className="p-3 border-t border-slate-800 bg-[#090D16] flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Escribe a GiorgIA... (ej. Tengo una propuesta de Samsung)" 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-[#111726] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
          <button 
            onClick={() => handleSend()}
            disabled={loading}
            className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}