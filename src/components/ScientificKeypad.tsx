import React from 'react';
import { AngleUnit, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface ScientificKeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEvaluate: () => void;
  angleUnit: AngleUnit;
  setAngleUnit: (unit: AngleUnit) => void;
  currentTheme: ThemeMode;
  onSound?: (type: 'number' | 'operator' | 'equals' | 'clear') => void;
}

export const ScientificKeypad: React.FC<ScientificKeypadProps> = ({
  onInput,
  onClear,
  onDelete,
  onEvaluate,
  angleUnit,
  setAngleUnit,
  currentTheme,
  onSound,
}) => {
  const [isSecondPage, setIsSecondPage] = React.useState(false);
  const theme = THEMES[currentTheme];

  const handleKey = (action: () => void, soundType: 'number' | 'operator' | 'equals' | 'clear' = 'number') => {
    if (onSound) onSound(soundType);
    action();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Top Scientific Control Row */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <button
          onClick={() => setAngleUnit(angleUnit === 'DEG' ? 'RAD' : 'DEG')}
          className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
        >
          {angleUnit === 'DEG' ? 'درجات (DEG)' : 'راديان (RAD)'}
        </button>

        <button
          onClick={() => setIsSecondPage(!isSecondPage)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isSecondPage
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/10 hover:bg-white/20 text-white/80'
          }`}
        >
          {isSecondPage ? 'الوظائف الأساسية 2nd' : 'الوظائف المتقدمة 2nd'}
        </button>
      </div>

      {/* Scientific Functions Grid (5 columns x 6 rows) */}
      <div className="grid grid-cols-5 gap-1.5 text-xs font-medium">
        {/* Row 1 */}
        {!isSecondPage ? (
          <>
            <button onClick={() => handleKey(() => onInput('sin('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>sin</button>
            <button onClick={() => handleKey(() => onInput('cos('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>cos</button>
            <button onClick={() => handleKey(() => onInput('tan('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>tan</button>
            <button onClick={() => handleKey(() => onInput('π'), 'number')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>π</button>
            <button onClick={() => handleKey(() => onInput('e'), 'number')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>e</button>
          </>
        ) : (
          <>
            <button onClick={() => handleKey(() => onInput('asin('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>asin</button>
            <button onClick={() => handleKey(() => onInput('acos('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>acos</button>
            <button onClick={() => handleKey(() => onInput('atan('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>atan</button>
            <button onClick={() => handleKey(() => onInput('sinh('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>sinh</button>
            <button onClick={() => handleKey(() => onInput('cosh('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>cosh</button>
          </>
        )}

        {/* Row 2 */}
        {!isSecondPage ? (
          <>
            <button onClick={() => handleKey(() => onInput('log10('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>log</button>
            <button onClick={() => handleKey(() => onInput('log2('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>log₂</button>
            <button onClick={() => handleKey(() => onInput('log('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>ln</button>
            <button onClick={() => handleKey(() => onInput('^'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>xʸ</button>
            <button onClick={() => handleKey(() => onInput('^3'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>x³</button>
          </>
        ) : (
          <>
            <button onClick={() => handleKey(() => onInput('10^'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>10ˣ</button>
            <button onClick={() => handleKey(() => onInput('e^'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>eˣ</button>
            <button onClick={() => handleKey(() => onInput('tanh('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>tanh</button>
            <button onClick={() => handleKey(() => onInput('!'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>n!</button>
            <button onClick={() => handleKey(() => onInput(' mod '), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>mod</button>
          </>
        )}

        {/* Row 3 */}
        <button onClick={() => handleKey(() => onInput('('), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>(</button>
        <button onClick={() => handleKey(() => onInput(')'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>)</button>
        <button onClick={() => handleKey(() => onInput('%'), 'operator')} className={`py-3 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>%</button>
        <button onClick={() => handleKey(onClear, 'clear')} className={`py-3 rounded-xl font-bold bg-red-500/20 text-red-400 border border-red-500/30`}>C</button>
        <button onClick={() => handleKey(() => onInput('÷'), 'operator')} className={`py-3 rounded-xl font-bold ${theme.btnOpBg} ${theme.btnOpText}`}>÷</button>

        {/* Row 4: 7,8,9,*, abs */}
        <button onClick={() => handleKey(() => onInput('7'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>7</button>
        <button onClick={() => handleKey(() => onInput('8'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>8</button>
        <button onClick={() => handleKey(() => onInput('9'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>9</button>
        <button onClick={() => handleKey(() => onInput('×'), 'operator')} className={`py-3.5 rounded-xl font-bold text-base ${theme.btnOpBg} ${theme.btnOpText}`}>×</button>
        <button onClick={() => handleKey(() => onInput('abs('), 'operator')} className={`py-3.5 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>|x|</button>

        {/* Row 5: 4,5,6,-, floor */}
        <button onClick={() => handleKey(() => onInput('4'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>4</button>
        <button onClick={() => handleKey(() => onInput('5'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>5</button>
        <button onClick={() => handleKey(() => onInput('6'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>6</button>
        <button onClick={() => handleKey(() => onInput('-'), 'operator')} className={`py-3.5 rounded-xl font-bold text-base ${theme.btnOpBg} ${theme.btnOpText}`}>−</button>
        <button onClick={() => handleKey(() => onInput('floor('), 'operator')} className={`py-3.5 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>⌊x⌋</button>

        {/* Row 6: 1,2,3,+, ceil */}
        <button onClick={() => handleKey(() => onInput('1'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>1</button>
        <button onClick={() => handleKey(() => onInput('2'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>2</button>
        <button onClick={() => handleKey(() => onInput('3'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>3</button>
        <button onClick={() => handleKey(() => onInput('+'), 'operator')} className={`py-3.5 rounded-xl font-bold text-base ${theme.btnOpBg} ${theme.btnOpText}`}>+</button>
        <button onClick={() => handleKey(() => onInput('ceil('), 'operator')} className={`py-3.5 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>⌈x⌉</button>

        {/* Row 7: 0, ., ±, =, round */}
        <button onClick={() => handleKey(() => onInput('±'), 'operator')} className={`py-3.5 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>±</button>
        <button onClick={() => handleKey(() => onInput('0'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>0</button>
        <button onClick={() => handleKey(() => onInput('.'), 'number')} className={`py-3.5 rounded-xl font-semibold text-base ${theme.btnNumBg} ${theme.btnNumText}`}>.</button>
        <button onClick={() => handleKey(onEvaluate, 'equals')} className={`py-3.5 rounded-xl font-bold text-base ${theme.btnEqualsBg} ${theme.btnEqualsText}`}>=</button>
        <button onClick={() => handleKey(() => onInput('round('), 'operator')} className={`py-3.5 rounded-xl ${theme.btnFnBg} ${theme.btnFnText}`}>round</button>
      </div>
    </div>
  );
};
