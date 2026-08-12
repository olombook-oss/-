import React, { useEffect, useRef, useState } from 'react';
import { evaluate } from 'mathjs';
import { ZoomIn, ZoomOut, RefreshCw, Plus, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react';
import { GraphFunction, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface GraphingCalculatorProps {
  currentTheme: ThemeMode;
}

const DEFAULT_FUNCTIONS: GraphFunction[] = [
  { id: '1', expression: 'sin(x)', color: '#3b82f6', visible: true },
  { id: '2', expression: 'x^2 - 4', color: '#f59e0b', visible: true },
];

const PRESETS = [
  { name: 'دالة الجيب sin(x)', expr: 'sin(x)' },
  { name: 'قطع مكافئ x² - 4', expr: 'x^2 - 4' },
  { name: 'دالة جيب التمام cos(2x)', expr: 'cos(2x)' },
  { name: 'دالة أسية e^x', expr: 'e^x' },
  { name: 'دالة تكعيبية x³ - 3x', expr: 'x^3 - 3*x' },
  { name: 'دالة القيمة المطلقة abs(x)', expr: 'abs(x)' },
];

export const GraphingCalculator: React.FC<GraphingCalculatorProps> = ({ currentTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = THEMES[currentTheme];

  const [functions, setFunctions] = useState<GraphFunction[]>(DEFAULT_FUNCTIONS);
  const [zoom, setZoom] = useState<number>(40); // pixels per unit
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);

  // Redraw Canvas when zoom, offset, or functions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas properly for retina displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Center coordinates
    const originX = width / 2 + offset.x;
    const originY = height / 2 + offset.y;

    // Clear background
    ctx.fillStyle = currentTheme === 'light' ? '#f8fafc' : '#09090b';
    ctx.fillRect(0, 0, width, height);

    // Draw Grid
    const gridSize = zoom;
    ctx.strokeStyle = currentTheme === 'light' ? '#e2e8f0' : '#27272a';
    ctx.lineWidth = 1;

    // Vertical grid lines
    const startX = originX % gridSize;
    for (let x = startX; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    const startY = originY % gridSize;
    for (let y = startY; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Axes (X & Y)
    ctx.strokeStyle = currentTheme === 'light' ? '#64748b' : '#71717a';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Draw Numbers on Axes
    ctx.fillStyle = currentTheme === 'light' ? '#475569' : '#a1a1aa';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';

    // X axis numbers
    for (let x = startX; x < width; x += gridSize) {
      const val = Math.round(((x - originX) / zoom) * 10) / 10;
      if (val !== 0 && Math.abs(x - originX) > 20) {
        ctx.fillText(val.toString(), x, originY + 14);
      }
    }

    // Y axis numbers
    ctx.textAlign = 'right';
    for (let y = startY; y < height; y += gridSize) {
      const val = Math.round(((originY - y) / zoom) * 10) / 10;
      if (val !== 0 && Math.abs(y - originY) > 20) {
        ctx.fillText(val.toString(), originX - 6, y + 4);
      }
    }

    // Plot Functions
    functions.forEach((fn) => {
      if (!fn.visible || !fn.expression.trim()) return;

      ctx.strokeStyle = fn.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let isDrawing = false;
      const step = 2; // draw every 2 pixels

      for (let px = 0; px <= width; px += step) {
        const xVal = (px - originX) / zoom;
        try {
          const yVal = evaluate(fn.expression.replace(/×/g, '*').replace(/÷/g, '/'), { x: xVal });
          if (typeof yVal === 'number' && !isNaN(yVal) && isFinite(yVal)) {
            const py = originY - yVal * zoom;

            // Only draw within canvas bounds
            if (py >= -height && py <= height * 2) {
              if (!isDrawing) {
                ctx.moveTo(px, py);
                isDrawing = true;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              isDrawing = false;
            }
          } else {
            isDrawing = false;
          }
        } catch {
          isDrawing = false;
        }
      }
      ctx.stroke();
    });

    // Draw Mouse Inspection Crosshair
    if (hoverCoord) {
      const px = hoverCoord.x;
      const py = hoverCoord.y;
      const mathX = Math.round(((px - originX) / zoom) * 100) / 100;
      const mathY = Math.round(((originY - py) / zoom) * 100) / 100;

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tooltip box
      const text = `X: ${mathX}, Y: ${mathY}`;
      ctx.font = '11px sans-serif';
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = 'rgba(24, 24, 27, 0.85)';
      ctx.fillRect(px + 10, py - 25, textWidth + 16, 22);
      ctx.strokeStyle = '#f59e0b';
      ctx.strokeRect(px + 10, py - 25, textWidth + 16, 22);

      ctx.fillStyle = '#fbbf24';
      ctx.textAlign = 'left';
      ctx.fillText(text, px + 18, py - 10);
    }
  }, [functions, zoom, offset, currentTheme, hoverCoord]);

  // Mouse Handlers for Dragging and Inspecting
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHoverCoord({ x, y });

    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoverCoord(null);
  };

  const addFunction = () => {
    const colors = ['#ec4899', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
    const newColor = colors[functions.length % colors.length];
    setFunctions([
      ...functions,
      { id: Date.now().toString(), expression: 'x', color: newColor, visible: true },
    ]);
  };

  const updateFunction = (id: string, expression: string) => {
    setFunctions(functions.map((f) => (f.id === id ? { ...f, expression } : f)));
  };

  const toggleVisibility = (id: string) => {
    setFunctions(functions.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f)));
  };

  const removeFunction = (id: string) => {
    setFunctions(functions.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Canvas Viewport Container */}
      <div className="relative w-full h-[320px] md:h-[380px] rounded-2xl border border-white/10 overflow-hidden shadow-inner bg-zinc-950">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {/* Floating Zoom & Control Bar */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 p-1.5 rounded-xl shadow-xl z-10">
          <button
            onClick={() => setZoom(zoom * 1.25)}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition-colors"
            title="تكبير (Zoom In)"
          >
            <ZoomIn className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => setZoom(Math.max(10, zoom / 1.25))}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition-colors"
            title="تصغير (Zoom Out)"
          >
            <ZoomOut className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => {
              setZoom(40);
              setOffset({ x: 0, y: 0 });
            }}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-200 transition-colors border-t border-zinc-800"
            title="إعادة ضبط المركز"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Preset Functions Quick Buttons */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-white/50 flex items-center gap-1 whitespace-nowrap pl-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          نماذج جاهزة:
        </span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (functions.length > 0) {
                updateFunction(functions[0].id, p.expr);
              } else {
                setFunctions([{ id: '1', expression: p.expr, color: '#3b82f6', visible: true }]);
              }
            }}
            className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-amber-500/20 text-white/80 hover:text-amber-300 text-xs border border-white/10 whitespace-nowrap transition-all"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Functions Management List */}
      <div className="w-full flex flex-col gap-2 bg-zinc-900/60 border border-zinc-800 p-3 rounded-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="text-xs font-bold text-zinc-300">الدوال المعرفة f(x)</span>
          <button
            onClick={addFunction}
            className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            إضافة دالة
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
          {functions.map((fn) => (
            <div key={fn.id} className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800 p-2 rounded-xl">
              {/* Color indicator */}
              <input
                type="color"
                value={fn.color}
                onChange={(e) =>
                  setFunctions(
                    functions.map((f) => (f.id === fn.id ? { ...f, color: e.target.value } : f))
                  )
                }
                className="w-5 h-5 rounded-md cursor-pointer border-0 bg-transparent"
              />

              {/* Function expression input */}
              <span className="text-xs font-mono font-bold text-amber-400">f(x) =</span>
              <input
                type="text"
                value={fn.expression}
                onChange={(e) => updateFunction(fn.id, e.target.value)}
                placeholder="أدخل الدالة هنا مثل x^2 - 4"
                className="flex-1 bg-transparent text-sm font-mono text-zinc-100 outline-none dir-ltr"
              />

              {/* Visibility toggle */}
              <button
                onClick={() => toggleVisibility(fn.id)}
                className={`p-1.5 rounded-lg text-xs ${
                  fn.visible ? 'text-amber-400' : 'text-zinc-600'
                }`}
                title={fn.visible ? 'إخفاء الدالة' : 'إظهار الدالة'}
              >
                {fn.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Delete function */}
              <button
                onClick={() => removeFunction(fn.id)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
