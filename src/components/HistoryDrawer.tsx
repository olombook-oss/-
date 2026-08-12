import React, { useState } from 'react';
import { X, Search, Trash2, Download, Copy, Check, CornerDownLeft } from 'lucide-react';
import { HistoryItem, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  currentTheme: ThemeMode;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
  currentTheme,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const theme = THEMES[currentTheme];

  if (!isOpen) return null;

  const filteredHistory = history.filter(
    (item) =>
      item.expression.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyItem = (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${item.expression} = ${item.result}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportTxt = () => {
    if (history.length === 0) return;
    const txtContent = history
      .map((item) => `${new Date(item.timestamp).toLocaleString('ar-SA')} | ${item.expression} = ${item.result}`)
      .join('\n');

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculator-history-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm h-full bg-zinc-950 border-r border-zinc-800 p-4 flex flex-col justify-between shadow-2xl">
        {/* Drawer Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              سجل الحسابات والعمليات
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {history.length}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-xs">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث في السجل..."
              className="w-full bg-transparent text-zinc-100 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* History List Container */}
        <div className="flex-1 my-3 overflow-y-auto pr-1 flex flex-col gap-2 no-scrollbar">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 text-xs py-10">
              <p>لا يوجد عمليات في السجل حتى الآن.</p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className="group p-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 cursor-pointer transition-all flex flex-col gap-1 relative"
              >
                <div className="text-xs text-zinc-400 font-mono text-right dir-ltr truncate">
                  {item.expression}
                </div>
                <div className="text-base font-mono font-bold text-amber-400 text-right dir-ltr truncate">
                  = {item.result}
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-1 pt-1 border-t border-zinc-800/50">
                  <span>{new Date(item.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleCopyItem(item, e)}
                      className="p-1 rounded hover:bg-zinc-700 text-zinc-300"
                      title="نسخ"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                      <CornerDownLeft className="w-3 h-3" />
                      استخدام
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            className="flex-1 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            مسح السجل
          </button>

          <button
            onClick={handleExportTxt}
            disabled={history.length === 0}
            className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 transition-colors"
          >
            <Download className="w-4 h-4" />
            تصدير ملف
          </button>
        </div>
      </div>
    </div>
  );
};
