import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Display } from './components/Display';
import { StandardKeypad } from './components/StandardKeypad';
import { ScientificKeypad } from './components/ScientificKeypad';
import { GraphingCalculator } from './components/GraphingCalculator';
import { UnitConverter } from './components/UnitConverter';
import { FinancialCalculator } from './components/FinancialCalculator';
import { AiMathAssistant } from './components/AiMathAssistant';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CalculatorMode, AngleUnit, HistoryItem, ThemeMode } from './types';
import { evaluateExpression, soundFx } from './utils/mathEvaluator';
import { THEMES } from './utils/theme';

export default function App() {
  const [mode, setMode] = useState<CalculatorMode>('standard');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('calc_theme') as ThemeMode) || 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('calc_sound') !== 'false';
  });

  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('DEG');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [memoryValue, setMemoryValue] = useState<number | null>(null);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Save Theme, Sound & History to localStorage
  useEffect(() => {
    localStorage.setItem('calc_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('calc_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  // Live expression evaluation preview as user types
  useEffect(() => {
    if (mode === 'standard' || mode === 'scientific') {
      if (!expression) {
        setResult('0');
        setIsEvaluated(false);
        return;
      }

      if (!isEvaluated) {
        const evalRes = evaluateExpression(expression, angleUnit);
        if (!evalRes.error) {
          setResult(evalRes.result);
        }
      }
    }
  }, [expression, angleUnit, mode, isEvaluated]);

  const playSound = useCallback(
    (type: 'number' | 'operator' | 'equals' | 'clear') => {
      if (soundEnabled) {
        soundFx.playKey(type);
      }
    },
    [soundEnabled]
  );

  const handleInput = useCallback(
    (val: string) => {
      if (isEvaluated) {
        // If user enters an operator right after evaluation, append to last result
        if (['+', '-', '×', '÷', '*', '/', '%', '^'].includes(val)) {
          setExpression(result + val);
        } else {
          setExpression(val);
        }
        setIsEvaluated(false);
      } else {
        setExpression((prev) => prev + val);
      }
    },
    [isEvaluated, result]
  );

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('0');
    setIsEvaluated(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (isEvaluated) {
      handleClear();
    } else {
      setExpression((prev) => prev.slice(0, -1));
    }
  }, [isEvaluated, handleClear]);

  const handleEvaluate = useCallback(() => {
    if (!expression) return;
    const evalRes = evaluateExpression(expression, angleUnit);
    setResult(evalRes.result);
    setIsEvaluated(true);

    if (!evalRes.error && evalRes.result !== '0') {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        expression,
        result: evalRes.result,
        timestamp: Date.now(),
        mode,
      };
      setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // Keep last 50
    }
  }, [expression, angleUnit, mode]);

  // Memory Handlers
  const handleMemoryClear = () => setMemoryValue(null);
  const handleMemoryRecall = () => {
    if (memoryValue !== null) {
      handleInput(memoryValue.toString());
    }
  };
  const handleMemoryStore = () => {
    const num = parseFloat(result);
    if (!isNaN(num)) setMemoryValue(num);
  };
  const handleMemoryAdd = () => {
    const num = parseFloat(result);
    if (!isNaN(num)) setMemoryValue((prev) => (prev || 0) + num);
  };
  const handleMemorySub = () => {
    const num = parseFloat(result);
    if (!isNaN(num)) setMemoryValue((prev) => (prev || 0) - num);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept inputs inside text input elements (like AI assistant or converter)
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        playSound('number');
        handleInput(e.key);
      } else if (e.key === '.') {
        playSound('number');
        handleInput('.');
      } else if (e.key === '+') {
        playSound('operator');
        handleInput('+');
      } else if (e.key === '-') {
        playSound('operator');
        handleInput('-');
      } else if (e.key === '*') {
        playSound('operator');
        handleInput('×');
      } else if (e.key === '/') {
        playSound('operator');
        handleInput('÷');
      } else if (e.key === '%') {
        playSound('operator');
        handleInput('%');
      } else if (e.key === '(' || e.key === ')') {
        playSound('operator');
        handleInput(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        playSound('equals');
        handleEvaluate();
      } else if (e.key === 'Backspace') {
        playSound('clear');
        handleDelete();
      } else if (e.key === 'Escape') {
        playSound('clear');
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, handleEvaluate, handleDelete, handleClear, playSound]);

  const activeThemeObj = THEMES[theme] || THEMES.dark;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 transition-colors duration-300 font-sans ${activeThemeObj.bgClass} dir-rtl select-none`}
    >
      <div
        className={`w-full max-w-lg md:max-w-xl p-4 sm:p-6 rounded-3xl border shadow-2xl transition-all duration-300 ${activeThemeObj.cardBg} ${activeThemeObj.accentBorder}`}
      >
        {/* Top Header & Mode Navigation */}
        <Header
          mode={mode}
          setMode={setMode}
          currentTheme={theme}
          setTheme={setTheme}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          toggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
          historyCount={history.length}
        />

        {/* Display screen (Shown for Standard & Scientific modes) */}
        {(mode === 'standard' || mode === 'scientific') && (
          <Display
            expression={expression}
            result={result}
            angleUnit={angleUnit}
            setAngleUnit={setAngleUnit}
            memoryValue={memoryValue}
            currentTheme={theme}
            onClear={handleClear}
            onDelete={handleDelete}
            isEvaluated={isEvaluated}
          />
        )}

        {/* Keypad or Active Tool View */}
        <main className="w-full">
          {mode === 'standard' && (
            <StandardKeypad
              onInput={handleInput}
              onClear={handleClear}
              onDelete={handleDelete}
              onEvaluate={handleEvaluate}
              onMemoryAdd={handleMemoryAdd}
              onMemorySub={handleMemorySub}
              onMemoryClear={handleMemoryClear}
              onMemoryRecall={handleMemoryRecall}
              onMemoryStore={handleMemoryStore}
              currentTheme={theme}
              onSound={playSound}
            />
          )}

          {mode === 'scientific' && (
            <ScientificKeypad
              onInput={handleInput}
              onClear={handleClear}
              onDelete={handleDelete}
              onEvaluate={handleEvaluate}
              angleUnit={angleUnit}
              setAngleUnit={setAngleUnit}
              currentTheme={theme}
              onSound={playSound}
            />
          )}

          {mode === 'graphing' && <GraphingCalculator currentTheme={theme} />}

          {mode === 'unit-converter' && <UnitConverter currentTheme={theme} />}

          {mode === 'financial' && <FinancialCalculator currentTheme={theme} />}

          {mode === 'ai-assistant' && <AiMathAssistant currentTheme={theme} />}
        </main>
      </div>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={(item) => {
          setExpression(item.expression);
          setResult(item.result);
          setIsEvaluated(true);
        }}
        onClearHistory={() => setHistory([])}
        currentTheme={theme}
      />
    </div>
  );
}
