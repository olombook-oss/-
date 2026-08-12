import { ThemeMode } from '../types';

export interface ThemeConfig {
  id: ThemeMode;
  nameAr: string;
  bgClass: string;
  cardBg: string;
  displayBg: string;
  keypadBg: string;
  textPrimary: string;
  textSecondary: string;
  btnNumBg: string;
  btnNumText: string;
  btnOpBg: string;
  btnOpText: string;
  btnFnBg: string;
  btnFnText: string;
  btnEqualsBg: string;
  btnEqualsText: string;
  accentBorder: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  dark: {
    id: 'dark',
    nameAr: 'داكن ناعم',
    bgClass: 'bg-zinc-950 text-zinc-100',
    cardBg: 'bg-zinc-900/90 border-zinc-800',
    displayBg: 'bg-zinc-950/80 border-zinc-800',
    keypadBg: 'bg-zinc-900',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-400',
    btnNumBg: 'bg-zinc-800/80 hover:bg-zinc-700 active:scale-95 text-zinc-100',
    btnNumText: 'text-zinc-100',
    btnOpBg: 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 active:scale-95',
    btnOpText: 'text-amber-400',
    btnFnBg: 'bg-zinc-700/60 hover:bg-zinc-600 text-zinc-200 active:scale-95',
    btnFnText: 'text-zinc-200',
    btnEqualsBg: 'bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold active:scale-95 shadow-lg shadow-amber-500/20',
    btnEqualsText: 'text-zinc-950',
    accentBorder: 'border-amber-500/40',
  },
  navy: {
    id: 'navy',
    nameAr: 'أزرق ملكي',
    bgClass: 'bg-slate-950 text-slate-100',
    cardBg: 'bg-slate-900/90 border-slate-800',
    displayBg: 'bg-slate-950/80 border-slate-800',
    keypadBg: 'bg-slate-900',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    btnNumBg: 'bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-100',
    btnNumText: 'text-slate-100',
    btnOpBg: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 active:scale-95',
    btnOpText: 'text-blue-400',
    btnFnBg: 'bg-slate-700/60 hover:bg-slate-600 text-slate-200 active:scale-95',
    btnFnText: 'text-slate-200',
    btnEqualsBg: 'bg-blue-600 hover:bg-blue-700 text-white font-bold active:scale-95 shadow-lg shadow-blue-500/20',
    btnEqualsText: 'text-white',
    accentBorder: 'border-blue-500/40',
  },
  neon: {
    id: 'neon',
    nameAr: 'بنفسجي نيون',
    bgClass: 'bg-slate-950 text-purple-100',
    cardBg: 'bg-purple-950/40 border-purple-800/50 backdrop-blur-md',
    displayBg: 'bg-slate-950/90 border-purple-900/80',
    keypadBg: 'bg-purple-950/20',
    textPrimary: 'text-purple-100',
    textSecondary: 'text-purple-300/70',
    btnNumBg: 'bg-purple-900/30 hover:bg-purple-800/40 text-purple-100 border border-purple-800/30 active:scale-95',
    btnNumText: 'text-purple-100',
    btnOpBg: 'bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-300 border border-fuchsia-500/40 active:scale-95',
    btnOpText: 'text-fuchsia-300',
    btnFnBg: 'bg-slate-800/80 hover:bg-slate-700 text-purple-200 active:scale-95',
    btnFnText: 'text-purple-200',
    btnEqualsBg: 'bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold active:scale-95 shadow-lg shadow-fuchsia-500/30',
    btnEqualsText: 'text-white',
    accentBorder: 'border-fuchsia-500/50',
  },
  light: {
    id: 'light',
    nameAr: 'فاتح عصري',
    bgClass: 'bg-stone-100 text-stone-900',
    cardBg: 'bg-white border-stone-200 shadow-xl shadow-stone-200/50',
    displayBg: 'bg-stone-50 border-stone-200',
    keypadBg: 'bg-stone-100/50',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-500',
    btnNumBg: 'bg-white hover:bg-stone-50 active:scale-95 text-stone-900 border border-stone-200/80 shadow-xs',
    btnNumText: 'text-stone-900',
    btnOpBg: 'bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 active:scale-95',
    btnOpText: 'text-orange-600',
    btnFnBg: 'bg-stone-200/70 hover:bg-stone-300/70 text-stone-700 active:scale-95',
    btnFnText: 'text-stone-700',
    btnEqualsBg: 'bg-orange-500 hover:bg-orange-600 text-white font-bold active:scale-95 shadow-md shadow-orange-500/20',
    btnEqualsText: 'text-white',
    accentBorder: 'border-orange-500/30',
  },
  emerald: {
    id: 'emerald',
    nameAr: 'الزمرد الفاخر',
    bgClass: 'bg-emerald-950 text-emerald-50',
    cardBg: 'bg-emerald-900/60 border-emerald-800/60 backdrop-blur-md',
    displayBg: 'bg-emerald-950/80 border-emerald-800',
    keypadBg: 'bg-emerald-950/40',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-300/70',
    btnNumBg: 'bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-800/40 active:scale-95',
    btnNumText: 'text-emerald-100',
    btnOpBg: 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 active:scale-95',
    btnOpText: 'text-teal-300',
    btnFnBg: 'bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-200 active:scale-95',
    btnFnText: 'text-emerald-200',
    btnEqualsBg: 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold active:scale-95 shadow-lg shadow-emerald-500/30',
    btnEqualsText: 'text-emerald-950',
    accentBorder: 'border-emerald-500/50',
  },
};
