import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Coins } from 'lucide-react';
import { UNIT_CATEGORIES, convertUnits } from '../utils/unitsData';
import { CURRENCIES, convertCurrency } from '../utils/currenciesData';
import { ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface UnitConverterProps {
  currentTheme: ThemeMode;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme];

  const [activeTab, setActiveTab] = useState<'units' | 'currencies'>('units');
  const [selectedCatId, setSelectedCatId] = useState<string>('length');
  const [inputValue, setInputValue] = useState<string>('1');

  // Units state
  const currentCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];
  const [fromUnitId, setFromUnitId] = useState<string>(currentCategory.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(currentCategory.units[1].id);

  // Currencies state
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('SAR');

  const [copied, setCopied] = useState(false);

  // When category changes, reset from and to units
  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const handleSwapUnits = () => {
    if (activeTab === 'units') {
      const temp = fromUnitId;
      setFromUnitId(toUnitId);
      setToUnitId(temp);
    } else {
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
    }
  };

  const valNum = parseFloat(inputValue) || 0;

  // Calculate result
  let convertedResult = 0;
  if (activeTab === 'units') {
    convertedResult = convertUnits(valNum, currentCategory, fromUnitId, toUnitId);
  } else {
    convertedResult = convertCurrency(valNum, fromCurrency, toCurrency);
  }

  const formattedResult =
    Math.abs(convertedResult) < 0.0001
      ? convertedResult.toExponential(4)
      : parseFloat(convertedResult.toFixed(6)).toString();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tab Selector: Units vs Currencies */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('units')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeTab === 'units'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-white/70'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4" />
          تحويل الوحدات
        </button>

        <button
          onClick={() => setActiveTab('currencies')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeTab === 'currencies'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-white/70'
          }`}
        >
          <Coins className="w-4 h-4" />
          تحويل العملات (العربية والدولية)
        </button>
      </div>

      {activeTab === 'units' ? (
        <>
          {/* Category Selector pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {UNIT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCatId === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/50'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>

          {/* Conversion Input & Selectors Box */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            {/* Input Value & From Unit */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">من وحدة:</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl text-lg font-mono font-bold text-amber-400 outline-none focus:border-amber-500 transition-colors"
                placeholder="أدخل المقدار"
              />
              <select
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full bg-zinc-800 text-zinc-100 p-2.5 rounded-xl text-xs font-semibold outline-none border border-zinc-700"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nameAr} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex items-center justify-center py-2">
              <button
                onClick={handleSwapUnits}
                className="p-3 rounded-full bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 transition-transform active:rotate-180"
                title="تبديل الاتجاه"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* Output Result & To Unit */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs text-zinc-400 font-medium">إلى وحدة:</label>
              <div className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl flex items-center justify-between font-mono font-bold text-emerald-400 text-lg">
                <span className="truncate">{formattedResult}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 ml-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full bg-zinc-800 text-zinc-100 p-2.5 rounded-xl text-xs font-semibold outline-none border border-zinc-700"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nameAr} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        /* Currencies Tab */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
          {/* Input Amount & From Currency */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">المبلغ بالعملة الأصلية:</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl text-lg font-mono font-bold text-amber-400 outline-none focus:border-amber-500 transition-colors"
              placeholder="المبلغ"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-zinc-800 text-zinc-100 p-2.5 rounded-xl text-xs font-semibold outline-none border border-zinc-700"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.nameAr} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-center justify-center py-2">
            <button
              onClick={handleSwapUnits}
              className="p-3 rounded-full bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30 transition-transform active:rotate-180"
              title="تبديل العملات"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Result & To Currency */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs text-zinc-400 font-medium">النتيجة بالعملة المستهدفة:</label>
            <div className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl flex items-center justify-between font-mono font-bold text-emerald-400 text-lg">
              <span className="truncate">{formattedResult}</span>
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center gap-1 ml-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-zinc-800 text-zinc-100 p-2.5 rounded-xl text-xs font-semibold outline-none border border-zinc-700"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.nameAr} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
