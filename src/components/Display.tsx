import React from 'react';
import { Copy, Check, Delete, RotateCcw } from 'lucide-react';
import { AngleUnit, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface DisplayProps {
  expression: string;
  result: string;
  angleUnit?: AngleUnit;
  setAngleUnit?: (unit: AngleUnit) => void;
  memoryValue: number | null;
  currentTheme: ThemeMode;
  onClear: () => void;
  onDelete: () => void;
  isEvaluated: boolean;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  result,
  angleUnit,
  setAngleUnit,
  memoryValue,
  currentTheme,
  onClear,
  onDelete,
  isEvaluated,
}) => {
  const [copied, setCopied] = React.useState(false);
  const theme = THEMES[currentTheme];

  const handleCopy = () => {
    const textToCopy = result || expression || '0';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`w-full p-4 rounded-2xl border transition-all duration-200 mb-4 flex flex-col justify-between min-h-[140px] relative overflow-hidden shadow-inner ${theme.displayBg}`}
    >
      {/* Top Status Bar: Angle unit, Memory, Quick actions */}
      <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Angle Unit Badge (DEG / RAD) */}
          {angleUnit && setAngleUnit && (
            <button
              onClick={() => setAngleUnit(angleUnit === 'DEG' ? 'RAD' : 'DEG')}
              className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
              title="انقر للتبديل بين الدرجات والراديان"
            >
              {angleUnit}
            </button>
          )}

          {/* Memory Badge */}
          {memoryValue !== null && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold border border-emerald-500/30">
              M = {memoryValue}
            </span>
          )}
        </div>

        {/* Display Control Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            title="نسخ النتيجة"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>

          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors"
            title="حذف آخر رمز"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClear}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-amber-400 transition-colors"
            title="مسح الكلية (C)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Math Expression Display */}
      <div className="w-full text-right overflow-x-auto no-scrollbar font-mono dir-ltr py-1">
        <span className="text-sm md:text-base text-white/60 whitespace-nowrap tracking-wide">
          {expression || '0'}
        </span>
      </div>

      {/* Evaluated Result Display */}
      <div className="w-full text-right overflow-x-auto no-scrollbar font-mono dir-ltr pt-1">
        <span
          className={`font-bold tracking-tight transition-all duration-150 ${
            isEvaluated ? 'text-3xl md:text-4xl text-amber-400' : 'text-2xl md:text-3xl text-white/90'
          }`}
        >
          {result || '= 0'}
        </span>
      </div>
    </div>
  );
};
