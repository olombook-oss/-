import { create, all } from 'mathjs';
import { AngleUnit } from '../types';

const math = create(all, {});

/**
 * Pre-processes user expression for mathjs evaluation.
 */
export function sanitizeExpression(expr: string, angleUnit: AngleUnit): string {
  let cleaned = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/e/g, 'e')
    .replace(/mod/g, '%')
    .replace(/√\(/g, 'sqrt(')
    .replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)');

  // Handle trig degree conversion if in DEG mode
  if (angleUnit === 'DEG') {
    // Replace sin(x) with sin(x deg)
    cleaned = cleaned.replace(/sin\(([^)]+)\)/g, 'sin(($1) deg)');
    cleaned = cleaned.replace(/cos\(([^)]+)\)/g, 'cos(($1) deg)');
    cleaned = cleaned.replace(/tan\(([^)]+)\)/g, 'tan(($1) deg)');
  }

  return cleaned;
}

/**
 * Evaluates a math expression string safely.
 */
export function evaluateExpression(expr: string, angleUnit: AngleUnit = 'DEG'): { result: string; numericValue: number | null; error?: string } {
  if (!expr || expr.trim() === '') {
    return { result: '0', numericValue: 0 };
  }

  try {
    const sanitized = sanitizeExpression(expr, angleUnit);
    const evaluated = math.evaluate(sanitized);

    if (evaluated === undefined || evaluated === null) {
      return { result: '0', numericValue: 0 };
    }

    let numericVal: number | null = null;
    let formattedResult = '';

    if (typeof evaluated === 'number') {
      numericVal = evaluated;
      if (isNaN(evaluated)) {
        return { result: 'خطأ في الحساب', numericValue: null, error: 'النتيجة غير معرفة' };
      }
      if (!isFinite(evaluated)) {
        return { result: 'لا نهاية ∞', numericValue: null, error: 'القسمة على صفر أو قيمة غير منتهية' };
      }

      // Format clean numbers
      if (Math.abs(evaluated) < 1e-10 && evaluated !== 0) {
        formattedResult = evaluated.toExponential(6);
      } else if (Math.abs(evaluated) >= 1e12) {
        formattedResult = evaluated.toExponential(6);
      } else {
        // Round to avoid float precision issues like 0.1 + 0.2 = 0.30000000000000004
        formattedResult = parseFloat(evaluated.toFixed(10)).toString();
      }
    } else if (typeof evaluated === 'boolean') {
      formattedResult = evaluated ? 'صحيح (True)' : 'خطأ (False)';
    } else if (evaluated.isBigNumber || evaluated.isComplex || evaluated.isUnit) {
      formattedResult = evaluated.toString();
    } else {
      formattedResult = String(evaluated);
    }

    return { result: formattedResult, numericValue: numericVal };
  } catch (err: any) {
    return {
      result: 'خطأ',
      numericValue: null,
      error: err.message || 'صيغة غير صحيحة',
    };
  }
}

/**
 * Audio feedback sound effect generator using Web Audio API
 */
class SoundEffects {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playKey(type: 'number' | 'operator' | 'equals' | 'clear' = 'number') {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;

      if (type === 'number') {
        osc.frequency.setValueAtTime(440, now);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'operator') {
        osc.frequency.setValueAtTime(580, now);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'equals') {
        osc.frequency.setValueAtTime(880, now);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'clear') {
        osc.frequency.setValueAtTime(220, now);
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // Audio might be blocked by browser policy until user interaction
    }
  }
}

export const soundFx = new SoundEffects();
