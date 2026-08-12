import React, { useState } from 'react';
import { CreditCard, Percent, Users, HeartHandshake } from 'lucide-react';
import { FinancialSubTab, ThemeMode } from '../types';
import { THEMES } from '../utils/theme';

interface FinancialCalculatorProps {
  currentTheme: ThemeMode;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ currentTheme }) => {
  const theme = THEMES[currentTheme];
  const [subTab, setSubTab] = useState<FinancialSubTab>('loan');

  // Loan EMI State
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [loanTenureYears, setLoanTenureYears] = useState<string>('5');

  // Discount & Tax State
  const [originalPrice, setOriginalPrice] = useState<string>('500');
  const [discountPercent, setDiscountPercent] = useState<string>('15');
  const [taxPercent, setTaxPercent] = useState<string>('15');

  // Tip & Bill Splitter State
  const [billTotal, setBillTotal] = useState<string>('250');
  const [tipPercent, setTipPercent] = useState<string>('10');
  const [peopleCount, setPeopleCount] = useState<string>('3');

  // Zakat State
  const [zakatCash, setZakatCash] = useState<string>('50000');
  const [zakatGold, setZakatGold] = useState<string>('0');
  const [zakatDebts, setZakatDebts] = useState<string>('0');
  const goldGramPrice = 300; // ~300 SAR per gram average reference

  // Calculate Loan EMI
  const principal = parseFloat(loanAmount) || 0;
  const ratePerYear = parseFloat(interestRate) || 0;
  const tenureYears = parseFloat(loanTenureYears) || 1;
  const totalMonths = tenureYears * 12;

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalPayable = 0;

  if (principal > 0 && totalMonths > 0) {
    if (ratePerYear > 0) {
      const monthlyRate = ratePerYear / 100 / 12;
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalPayable = monthlyPayment * totalMonths;
      totalInterest = totalPayable - principal;
    } else {
      monthlyPayment = principal / totalMonths;
      totalPayable = principal;
      totalInterest = 0;
    }
  }

  // Calculate Discount & Tax
  const origP = parseFloat(originalPrice) || 0;
  const discP = parseFloat(discountPercent) || 0;
  const taxP = parseFloat(taxPercent) || 0;

  const discountAmount = (origP * discP) / 100;
  const priceAfterDiscount = origP - discountAmount;
  const taxAmount = (priceAfterDiscount * taxP) / 100;
  const finalPrice = priceAfterDiscount + taxAmount;

  // Calculate Tip & Bill Splitter
  const billVal = parseFloat(billTotal) || 0;
  const tipP = parseFloat(tipPercent) || 0;
  const persons = Math.max(1, parseInt(peopleCount) || 1);

  const tipVal = (billVal * tipP) / 100;
  const grandBill = billVal + tipVal;
  const sharePerPerson = grandBill / persons;

  // Calculate Zakat
  const cashVal = parseFloat(zakatCash) || 0;
  const goldVal = parseFloat(zakatGold) || 0;
  const debtsVal = parseFloat(zakatDebts) || 0;

  const totalZakatBase = cashVal + goldVal - debtsVal;
  const nisabThreshold = 85 * goldGramPrice; // ~25,500 SAR
  const meetsNisab = totalZakatBase >= nisabThreshold;
  const zakatDue = meetsNisab ? totalZakatBase * 0.025 : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        <button
          onClick={() => setSubTab('loan')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
            subTab === 'loan'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          حاسبة القروض والتمويل
        </button>

        <button
          onClick={() => setSubTab('discount')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
            subTab === 'discount'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          <Percent className="w-4 h-4" />
          الخصومات والضريبة
        </button>

        <button
          onClick={() => setSubTab('tip')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
            subTab === 'tip'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          <Users className="w-4 h-4" />
          تقسيم الفاتورة والمشاركة
        </button>

        <button
          onClick={() => setSubTab('zakat')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
            subTab === 'zakat'
              ? 'bg-amber-500 text-zinc-950 shadow-md'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          حاسبة الزكاة الشرعية
        </button>
      </div>

      {/* Sub Tab Contents */}
      {subTab === 'loan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="flex flex-col gap-3 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              بيانات التمويل / القرض
            </h3>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">مبلغ التمويل:</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">
                نسبة الربح السنوية (%):
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">مدة التمويل (بالسنوات):</label>
              <input
                type="number"
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              ملخص الأقساط والدفعات
            </h3>

            <div className="flex flex-col gap-3 my-2">
              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-amber-500/30">
                <span className="text-xs text-zinc-400">القسط الشهري:</span>
                <span className="text-xl font-mono font-bold text-amber-400">
                  {monthlyPayment.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">إجمالي الأرباح / الفوائد:</span>
                <span className="text-base font-mono font-bold text-red-400">
                  {totalInterest.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">إجمالي المبلغ المستحق:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {totalPayable.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 text-center">
              * تم حساب الجدول على أساس أقساط متساوية عبر {totalMonths} شهراً.
            </p>
          </div>
        </div>
      )}

      {subTab === 'discount' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              بيانات السعر والخصم
            </h3>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">السعر الأصلي:</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">نسبة الخصم (%):</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">
                نسبة الضريبة القيمة المضافة (%):
              </label>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              النتيجة الصافية
            </h3>

            <div className="flex flex-col gap-2.5 my-2">
              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-zinc-400">السعر النهائي الصافي:</span>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  {finalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">قيمة التوفير (مقدار الخصم):</span>
                <span className="text-base font-mono font-bold text-amber-400">
                  {discountAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">مبلغ الضريبة:</span>
                <span className="text-base font-mono font-bold text-zinc-300">
                  {taxAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'tip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              تفاصيل الفاتورة والمشاركة
            </h3>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">إجمالي الفاتورة:</label>
              <input
                type="number"
                value={billTotal}
                onChange={(e) => setBillTotal(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">نسبة الإكرامية / البقشيش (%):</label>
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">عدد الأشخاص المشاركين:</label>
              <input
                type="number"
                min="1"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              حصة كل شخص
            </h3>

            <div className="flex flex-col gap-2.5 my-2">
              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-amber-500/30">
                <span className="text-xs text-zinc-400">مبلغ للشخص الواحد:</span>
                <span className="text-2xl font-mono font-bold text-amber-400">
                  {sharePerPerson.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">إجمالي البقشيش الإضافي:</span>
                <span className="text-base font-mono font-bold text-emerald-400">
                  {tipVal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-xs text-zinc-400">الإجمالي الشامل مع البقشيش:</span>
                <span className="text-base font-mono font-bold text-zinc-200">
                  {grandBill.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'zakat' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              حساب أموالك وممتلكاتك الزكوية
            </h3>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">
                المدخرات والنقدية في البنك:
              </label>
              <input
                type="number"
                value={zakatCash}
                onChange={(e) => setZakatCash(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">
                قيمة الذهب والفضة والأسهم القابلة للتداول:
              </label>
              <input
                type="number"
                value={zakatGold}
                onChange={(e) => setZakatGold(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium mb-1 block">
                الديون والالتزامات الحالية الواجبة السداد:
              </label>
              <input
                type="number"
                value={zakatDebts}
                onChange={(e) => setZakatDebts(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 p-2.5 rounded-xl font-mono text-sm text-zinc-100 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-400 border-b border-zinc-800 pb-2">
              مقدار الزكاة الواجبة (2.5%)
            </h3>

            <div className="flex flex-col gap-3 my-2">
              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-zinc-400">مقدار الزكاة المستحقة:</span>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  {zakatDue.toFixed(2)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs flex flex-col gap-1">
                <div className="flex justify-between text-zinc-400">
                  <span>حالة النصاب الشرعي:</span>
                  <span className={meetsNisab ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {meetsNisab ? 'بلغ النصاب (تجب الزكاة)' : 'لم يبلغ النصاب بعد'}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  حد النصاب التقريبي (85 جرام ذهب): ~{nisabThreshold.toLocaleString()} ريال
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 text-center">
              * تحسب الزكاة بنسبة ربع العشر (2.5%) على المال الذي حال عليه الحول وبلغ النصاب.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
