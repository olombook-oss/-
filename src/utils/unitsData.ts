import { UnitCategory } from '../types';

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    nameAr: 'الطول',
    nameEn: 'Length',
    units: [
      { id: 'm', nameAr: 'متر', symbol: 'م', factorToBase: 1 },
      { id: 'km', nameAr: 'كيلومتر', symbol: 'كم', factorToBase: 1000 },
      { id: 'cm', nameAr: 'سنتيمتر', symbol: 'سم', factorToBase: 0.01 },
      { id: 'mm', nameAr: 'مليمتر', symbol: 'مم', factorToBase: 0.001 },
      { id: 'mile', nameAr: 'ميل', symbol: 'mi', factorToBase: 1609.344 },
      { id: 'yard', nameAr: 'ياردة', symbol: 'yd', factorToBase: 0.9144 },
      { id: 'foot', nameAr: 'قدم', symbol: 'ft', factorToBase: 0.3048 },
      { id: 'inch', nameAr: 'بوصة / إنش', symbol: 'in', factorToBase: 0.0254 },
    ],
  },
  {
    id: 'mass',
    nameAr: 'الكتلة / الوزن',
    nameEn: 'Mass / Weight',
    units: [
      { id: 'kg', nameAr: 'كيلوغرام', symbol: 'كجم', factorToBase: 1 },
      { id: 'g', nameAr: 'غرام', symbol: 'جم', factorToBase: 0.001 },
      { id: 'mg', nameAr: 'مليغرام', symbol: 'مجم', factorToBase: 0.000001 },
      { id: 'ton', nameAr: 'طن متري', symbol: 'طن', factorToBase: 1000 },
      { id: 'lb', nameAr: 'باوند / رطل', symbol: 'lb', factorToBase: 0.45359237 },
      { id: 'oz', nameAr: 'أونصة', symbol: 'oz', factorToBase: 0.02834952 },
    ],
  },
  {
    id: 'temperature',
    nameAr: 'درجة الحرارة',
    nameEn: 'Temperature',
    units: [
      { id: 'celsius', nameAr: 'سيلسيوس (مئوية)', symbol: '°C', factorToBase: 1, offset: 0 },
      { id: 'fahrenheit', nameAr: 'فهرنهايت', symbol: '°F', factorToBase: 1, offset: 0 },
      { id: 'kelvin', nameAr: 'كلفن', symbol: 'K', factorToBase: 1, offset: 0 },
    ],
  },
  {
    id: 'area',
    nameAr: 'المساحة',
    nameEn: 'Area',
    units: [
      { id: 'm2', nameAr: 'متر مربع', symbol: 'م²', factorToBase: 1 },
      { id: 'km2', nameAr: 'كيلومتر مربع', symbol: 'كم²', factorToBase: 1000000 },
      { id: 'hectare', nameAr: 'هكتار', symbol: 'ها', factorToBase: 10000 },
      { id: 'acre', nameAr: 'فدان / أكر', symbol: 'acre', factorToBase: 4046.8564224 },
      { id: 'ft2', nameAr: 'قدم مربع', symbol: 'قدم²', factorToBase: 0.09290304 },
    ],
  },
  {
    id: 'volume',
    nameAr: 'الحجم',
    nameEn: 'Volume',
    units: [
      { id: 'liter', nameAr: 'لتر', symbol: 'لتر', factorToBase: 1 },
      { id: 'ml', nameAr: 'مليلتر', symbol: 'مل', factorToBase: 0.001 },
      { id: 'm3', nameAr: 'متر مكعب', symbol: 'م³', factorToBase: 1000 },
      { id: 'gallon', nameAr: 'جالون أمريكي', symbol: 'gal', factorToBase: 3.78541 },
      { id: 'cup', nameAr: 'كوب معياري', symbol: 'cup', factorToBase: 0.24 },
    ],
  },
  {
    id: 'speed',
    nameAr: 'السرعة',
    nameEn: 'Speed',
    units: [
      { id: 'kmh', nameAr: 'كم / ساعة', symbol: 'كم/س', factorToBase: 1 },
      { id: 'ms', nameAr: 'متر / ثانية', symbol: 'م/ث', factorToBase: 3.6 },
      { id: 'mph', nameAr: 'ميل / ساعة', symbol: 'mph', factorToBase: 1.609344 },
      { id: 'knot', nameAr: 'عقدة بحرية', symbol: 'kn', factorToBase: 1.852 },
    ],
  },
  {
    id: 'data',
    nameAr: 'البيانات الرقمية',
    nameEn: 'Data Storage',
    units: [
      { id: 'mb', nameAr: 'ميغابايت', symbol: 'MB', factorToBase: 1 },
      { id: 'byte', nameAr: 'بايت', symbol: 'B', factorToBase: 0.00000095367431640625 },
      { id: 'kb', nameAr: 'كيلوبايت', symbol: 'KB', factorToBase: 0.0009765625 },
      { id: 'gb', nameAr: 'جيجابايت', symbol: 'GB', factorToBase: 1024 },
      { id: 'tb', nameAr: 'تيرا بايت', symbol: 'TB', factorToBase: 1048576 },
    ],
  },
  {
    id: 'time',
    nameAr: 'الزمان / الوقت',
    nameEn: 'Time',
    units: [
      { id: 'second', nameAr: 'ثانية', symbol: 'ث', factorToBase: 1 },
      { id: 'minute', nameAr: 'دقيقة', symbol: 'د', factorToBase: 60 },
      { id: 'hour', nameAr: 'ساعة', symbol: 'س', factorToBase: 3600 },
      { id: 'day', nameAr: 'يوم', symbol: 'يوم', factorToBase: 86400 },
      { id: 'week', nameAr: 'أسبوع', symbol: 'أسبوع', factorToBase: 604800 },
      { id: 'month', nameAr: 'شهر (30 يوم)', symbol: 'شهر', factorToBase: 2592000 },
      { id: 'year', nameAr: 'سنة (365 يوم)', symbol: 'سنة', factorToBase: 31536000 },
    ],
  },
];

export function convertUnits(
  value: number,
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string
): number {
  if (isNaN(value)) return 0;
  if (fromUnitId === toUnitId) return value;

  // Special handle for temperature
  if (category.id === 'temperature') {
    let tempInCelsius = value;
    if (fromUnitId === 'fahrenheit') {
      tempInCelsius = ((value - 32) * 5) / 9;
    } else if (fromUnitId === 'kelvin') {
      tempInCelsius = value - 273.15;
    }

    if (toUnitId === 'celsius') return tempInCelsius;
    if (toUnitId === 'fahrenheit') return (tempInCelsius * 9) / 5 + 32;
    if (toUnitId === 'kelvin') return tempInCelsius + 273.15;
    return tempInCelsius;
  }

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  // Convert from input to base unit
  const baseValue = value * fromUnit.factorToBase;
  // Convert from base unit to target unit
  return baseValue / toUnit.factorToBase;
}
