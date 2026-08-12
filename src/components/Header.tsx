import React from 'react';
import {
  Calculator,
  Binary,
  LineChart,
  ArrowLeftRight,
  Landmark,
  Sparkles,
  History,
  Volume2,
  VolumeX,
  Palette,
} from 'lucide-react';
import { CalculatorMode, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface HeaderProps {
  mode: CalculatorMode;
  setMode: (mode: CalculatorMode) => void;
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  currentTheme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  toggleHistory,
  historyCount,
}) => {
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
  const theme = THEMES[currentTheme];

  const modeButtons: { id: CalculatorMode; label: string; icon: React.ElementType }[] = [
    { id: 'standard', label: 'قياسية', icon: Calculator },
    { id: 'scientific', label: 'علمية', icon: Binary },
    { id: 'graphing', label: 'رسم بياني', icon: LineChart },
    { id: 'unit-converter', label: 'محول الوحدات', icon: ArrowLeftRight },
    { id: 'financial', label: 'حاسبة مالية', icon: Landmark },
    { id: 'ai-assistant', label: 'حلال الذكاء الاصطناعي', icon: Sparkles },
  ];

  return (
    <header className="w-full mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10">
        {/* App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
              الآلة الحاسبة الشاملة
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                PRO
              </span>
            </h1>
            <p className="text-xs text-white/50">آلة حاسبة ذكية ومتكاملة لكافة الاستخدامات</p>
          </div>
        </div>

        {/* Top Controls: Sound, Theme, History */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-white/5 border-white/10 text-white/40'
            }`}
            title={soundEnabled ? 'إيقاف الأصوات' : 'تفعيل الأصوات'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1.5 transition-all text-white/80"
              title="تغيير المظهر"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs">{theme.nameAr}</span>
            </button>

            {/* Theme Dropdown Menu */}
            {showThemeMenu && (
              <div className="absolute left-0 mt-2 w-44 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-zinc-400 border-b border-zinc-800 mb-1">
                  اختر المظهر
                </div>
                {(Object.keys(THEMES) as ThemeMode[]).map((tKey) => {
                  const t = THEMES[tKey];
                  return (
                    <button
                      key={tKey}
                      onClick={() => {
                        setTheme(tKey);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        currentTheme === tKey
                          ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                          : 'hover:bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      <span>{t.nameAr}</span>
                      <span
                        className={`w-3 h-3 rounded-full border border-white/20 ${
                          tKey === 'dark'
                            ? 'bg-zinc-900'
                            : tKey === 'navy'
                            ? 'bg-slate-900'
                            : tKey === 'neon'
                            ? 'bg-purple-900'
                            : tKey === 'light'
                            ? 'bg-amber-100'
                            : 'bg-emerald-900'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* History Button */}
          <button
            onClick={toggleHistory}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs flex items-center gap-1.5 transition-all text-white/80 relative"
            title="السجل والتاريخ"
          >
            <History className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">السجل</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] flex items-center justify-center -mr-0.5">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <nav className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
        {modeButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = mode === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setMode(btn.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-amber-400'}`} />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
