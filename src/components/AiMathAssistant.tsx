import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check, Loader2, HelpCircle } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface AiMathAssistantProps {
  currentTheme: ThemeMode;
}

const SAMPLE_PROMPTS = [
  'خطوات حل المعادلة التربيعية 2x² - 8x + 6 = 0 مع التوضيح',
  'كيف أحسب زكاة مبلغ 150,000 ريال مر عليه عام كامل؟',
  'طريقة حساب القسط الشهري لقرض بقيمة 200,000 بفائدة 4%',
  'شرح الفرق بين النسب المثلثية Sin و Cos و Tan باختصار',
];

export const AiMathAssistant: React.FC<AiMathAssistantProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme];

  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (customPrompt?: string) => {
    const queryPrompt = customPrompt || prompt;
    if (!queryPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const res = await fetch('/api/ai-math-solver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: queryPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل الاتصال بالذكاء الاصطناعي.');
      }

      setResponse(data.result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الاتصال بالخادم.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-amber-300">حلال المسائل والشروحات بالذكاء الاصطناعي</h2>
          <p className="text-xs text-white/60 mt-1 leading-relaxed">
            اكتب مسألتك الرياضية أو استفسارك المالي بأي صيغة باللغة العربية، وسيقوم المساعد الذكي بحلها
            وشرح خطواتها بالتفصيل.
          </p>
        </div>
      </div>

      {/* Quick Sample Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-white/50 flex items-center gap-1 whitespace-nowrap pl-1">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          أسئلة مقترحة:
        </span>
        {SAMPLE_PROMPTS.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPrompt(sample);
              handleSubmit(sample);
            }}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-white/80 hover:text-amber-300 text-xs border border-white/10 whitespace-nowrap transition-all"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 bg-zinc-900/90 border border-zinc-800 p-2 rounded-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          placeholder="اكتب مسألتك أو استفسارك الرياضي هنا..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={loading || !prompt.trim()}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
          ) : (
            <Send className="w-4 h-4 text-zinc-950" />
          )}
          <span>حل المسألة</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Result Display Card */}
      {response && (
        <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-3 relative animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              الجواب والخطوات التفصيلية:
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ الجواب'}</span>
            </button>
          </div>

          <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans dir-rtl">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};
