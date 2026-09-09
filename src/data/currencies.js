// Comprehensive List of 34 International Fiat Currencies (Excluding Naira)
export const LOCAL_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.36, flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52, flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.89, flag: '🇨🇭' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 154.5, flag: '🇯🇵' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24, flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.5, flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.25, flag: '🇧🇷' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.5, flag: '🇿🇦' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: 3.67, flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', rate: 3.75, flag: '🇸🇦' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QAR', rate: 3.64, flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KWD', rate: 0.31, flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BHD', rate: 0.38, flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'OMR', rate: 0.385, flag: '🇴🇲' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.35, flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.82, flag: '🇭🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.66, flag: '🇳🇿' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', rate: 17.8, flag: '🇲🇽' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 10.65, flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 10.85, flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rate: 6.88, flag: '🇩🇰' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', rate: 3.98, flag: '🇵🇱' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 32.5, flag: '🇹🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1375.0, flag: '🇰🇷' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', rate: 36.8, flag: '🇹🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', rate: 4.71, flag: '🇲🇾' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', rate: 57.5, flag: '🇵🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 16150.0, flag: '🇮🇩' },
  { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', rate: 940.0, flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', rate: 3880.0, flag: '🇨🇴' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 132.0, flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', rate: 14.5, flag: '🇬🇭' }
]

// Map keyed by currency code for instant lookup
export const LOCAL_CURRENCIES_MAP = LOCAL_CURRENCIES.reduce((acc, curr) => {
  acc[curr.code] = {
    ...curr,
    fiatMultiplier: curr.rate
  }
  return acc
}, {})
