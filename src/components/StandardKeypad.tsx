import React from 'react';
import { ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface StandardKeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEvaluate: () => void;
  onMemoryAdd: () => void;
  onMemorySub: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryStore: () => void;
  currentTheme: ThemeMode;
  onSound?: (type: 'number' | 'operator' | 'equals' | 'clear') => void;
}

export const StandardKeypad: React.FC<StandardKeypadProps> = ({
  onInput,
  onClear,
  onDelete,
  onEvaluate,
  onMemoryAdd,
  onMemorySub,
  onMemoryClear,
  onMemoryRecall,
  onMemoryStore,
  currentTheme,
  onSound,
}) => {
  const theme = THEMES[currentTheme];

  const handleKey = (action: () => void, soundType: 'number' | 'operator' | 'equals' | 'clear' = 'number') => {
    if (onSound) onSound(soundType);
    action();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Memory Function Row */}
      <div className="grid grid-cols-5 gap-1.5 mb-1 text-xs">
        <button
          onClick={() => handleKey(onMemoryClear, 'operator')}
          className={`py-2 rounded-xl text-center font-bold text-[11px] ${theme.btnFnBg} ${theme.btnFnText}`}
          title="مسح الذاكرة"
        >
          MC
        </button>
        <button
          onClick={() => handleKey(onMemoryRecall, 'operator')}
          className={`py-2 rounded-xl text-center font-bold text-[11px] ${theme.btnFnBg} ${theme.btnFnText}`}
          title="استرجاع من الذاكرة"
        >
          MR
        </button>
        <button
          onClick={() => handleKey(onMemoryAdd, 'operator')}
          className={`py-2 rounded-xl text-center font-bold text-[11px] ${theme.btnFnBg} ${theme.btnFnText}`}
          title="إضافة للذاكرة"
        >
          M+
        </button>
        <button
          onClick={() => handleKey(onMemorySub, 'operator')}
          className={`py-2 rounded-xl text-center font-bold text-[11px] ${theme.btnFnBg} ${theme.btnFnText}`}
          title="خصم من الذاكرة"
        >
          M-
        </button>
        <button
          onClick={() => handleKey(onMemoryStore, 'operator')}
          className={`py-2 rounded-xl text-center font-bold text-[11px] ${theme.btnFnBg} ${theme.btnFnText}`}
          title="حفظ بالذاكرة"
        >
          MS
        </button>
      </div>

      {/* Main Standard Keypad Grid (4 columns) */}
      <div className="grid grid-cols-4 gap-2 text-base md:text-lg font-medium">
        {/* Row 1 */}
        <button
          onClick={() => handleKey(() => onInput('%'), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText}`}
        >
          %
        </button>
        <button
          onClick={() => handleKey(() => onInput('('), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText}`}
        >
          (
        </button>
        <button
          onClick={() => handleKey(() => onInput(')'), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText}`}
        >
          )
        </button>
        <button
          onClick={() => handleKey(onClear, 'clear')}
          className={`py-3.5 rounded-2xl font-bold bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30`}
        >
          C
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleKey(() => onInput('1/'), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText} text-sm`}
        >
          1/x
        </button>
        <button
          onClick={() => handleKey(() => onInput('^2'), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText} text-sm`}
        >
          x²
        </button>
        <button
          onClick={() => handleKey(() => onInput('√('), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText} text-sm`}
        >
          √x
        </button>
        <button
          onClick={() => handleKey(() => onInput('÷'), 'operator')}
          className={`py-3.5 rounded-2xl font-bold ${theme.btnOpBg} ${theme.btnOpText}`}
        >
          ÷
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleKey(() => onInput('7'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          7
        </button>
        <button
          onClick={() => handleKey(() => onInput('8'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          8
        </button>
        <button
          onClick={() => handleKey(() => onInput('9'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          9
        </button>
        <button
          onClick={() => handleKey(() => onInput('×'), 'operator')}
          className={`py-3.5 rounded-2xl font-bold ${theme.btnOpBg} ${theme.btnOpText}`}
        >
          ×
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleKey(() => onInput('4'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          4
        </button>
        <button
          onClick={() => handleKey(() => onInput('5'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          5
        </button>
        <button
          onClick={() => handleKey(() => onInput('6'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          6
        </button>
        <button
          onClick={() => handleKey(() => onInput('-'), 'operator')}
          className={`py-3.5 rounded-2xl font-bold ${theme.btnOpBg} ${theme.btnOpText}`}
        >
          −
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleKey(() => onInput('1'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          1
        </button>
        <button
          onClick={() => handleKey(() => onInput('2'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          2
        </button>
        <button
          onClick={() => handleKey(() => onInput('3'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          3
        </button>
        <button
          onClick={() => handleKey(() => onInput('+'), 'operator')}
          className={`py-3.5 rounded-2xl font-bold ${theme.btnOpBg} ${theme.btnOpText}`}
        >
          +
        </button>

        {/* Row 6 */}
        <button
          onClick={() => handleKey(() => onInput('±'), 'operator')}
          className={`py-3.5 rounded-2xl ${theme.btnFnBg} ${theme.btnFnText}`}
        >
          ±
        </button>
        <button
          onClick={() => handleKey(() => onInput('0'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          0
        </button>
        <button
          onClick={() => handleKey(() => onInput('.'), 'number')}
          className={`py-3.5 rounded-2xl font-semibold ${theme.btnNumBg} ${theme.btnNumText}`}
        >
          .
        </button>
        <button
          onClick={() => handleKey(onEvaluate, 'equals')}
          className={`py-3.5 rounded-2xl font-bold ${theme.btnEqualsBg} ${theme.btnEqualsText}`}
        >
          =
        </button>
      </div>
    </div>
  );
};
