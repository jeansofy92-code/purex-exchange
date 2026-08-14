import { useState, useCallback } from 'react'

const INVESTMENTS_STORAGE_KEY = 'purex_admin_user_investments'
const DEPOSITS_STORAGE_KEY = 'purex_admin_deposits'
const WITHDRAWALS_STORAGE_KEY = 'purex_admin_withdrawals'
const USERS_STORAGE_KEY = 'purex_admin_users'

const defaultUsers = [
  {
    id: 'usr-101',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    availableBalance: 4850.0,
    investedBalance: 2500.0,
    totalBalance: 7350.0,
    activePlan: 'Growth Alpha',
    kycStatus: 'Verified',
    joinedDate: '2026-06-12',
  },
  {
    id: 'usr-102',
    name: 'Elena Rostova',
    email: 'elena.r@invest.io',
    availableBalance: 18400.0,
    investedBalance: 10000.0,
    totalBalance: 28400.0,
    activePlan: 'Quantum Pro',
    kycStatus: 'Verified',
    joinedDate: '2026-05-18',
  },
  {
    id: 'usr-103',
    name: 'David Miller',
    email: 'david.m@apexcap.com',
    availableBalance: 65000.0,
    investedBalance: 50000.0,
    totalBalance: 115000.0,
    activePlan: 'Sovereign VIP',
    kycStatus: 'Verified',
    joinedDate: '2026-07-02',
  },
  {
    id: 'usr-104',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    availableBalance: 850.0,
    investedBalance: 500.0,
    totalBalance: 1350.0,
    activePlan: 'Starter Yield',
    kycStatus: 'Pending',
    joinedDate: '2026-08-01',
  },
]

const defaultInvestments = [
  {
    id: 'inv-8801',
    userId: 'usr-101',
    userName: 'Alex Chen',
    userEmail: 'alex.chen@example.com',
    planName: 'Growth Alpha',
    planId: 'growth',
    depositAmount: 2500.0,
    dailyRoi: '2.40%',
    dailyProfit: 60.0,
    totalEarned: 480.0,
    durationDays: 14,
    daysElapsed: 8,
    startDate: '2026-08-06',
    endDate: '2026-08-20',
    status: 'active', // 'active' | 'matured' | 'cancelled'
    autoCompound: true,
  },
  {
    id: 'inv-8802',
    userId: 'usr-102',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@invest.io',
    planName: 'Quantum Pro',
    planId: 'pro',
    depositAmount: 10000.0,
    dailyRoi: '3.25%',
    dailyProfit: 325.0,
    totalEarned: 5200.0,
    durationDays: 30,
    daysElapsed: 16,
    startDate: '2026-07-29',
    endDate: '2026-08-28',
    status: 'active',
    autoCompound: false,
  },
  {
    id: 'inv-8803',
    userId: 'usr-103',
    userName: 'David Miller',
    userEmail: 'david.m@apexcap.com',
    planName: 'Sovereign VIP',
    planId: 'institutional',
    depositAmount: 50000.0,
    dailyRoi: '4.20%',
    dailyProfit: 2100.0,
    totalEarned: 63000.0,
    durationDays: 60,
    daysElapsed: 30,
    startDate: '2026-07-15',
    endDate: '2026-09-13',
    status: 'active',
    autoCompound: true,
  },
  {
    id: 'inv-8804',
    userId: 'usr-104',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@gmail.com',
    planName: 'Starter Yield',
    planId: 'starter',
    depositAmount: 500.0,
    dailyRoi: '1.65%',
    dailyProfit: 8.25,
    totalEarned: 57.75,
    durationDays: 7,
    daysElapsed: 7,
    startDate: '2026-08-01',
    endDate: '2026-08-08',
    status: 'matured',
    autoCompound: false,
  },
]

const defaultDeposits = [
  {
    id: 'dep-501',
    userId: 'usr-101',
    userName: 'Alex Chen',
    userEmail: 'alex.chen@example.com',
    amount: 2500.0,
    coin: 'USDT (TRC20)',
    txHash: '0x8f93e...a1b4',
    walletAddress: 'TQn9Y...K98L',
    status: 'pending_approval',
    createdAt: '2026-08-14 11:20:15',
  },
  {
    id: 'dep-502',
    userId: 'usr-104',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@gmail.com',
    amount: 1000.0,
    coin: 'USDT (ERC20)',
    txHash: '0x3c81f...e99d',
    walletAddress: '0x71C...3984',
    status: 'pending_approval',
    createdAt: '2026-08-14 12:05:40',
  },
  {
    id: 'dep-500',
    userId: 'usr-102',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@invest.io',
    amount: 10000.0,
    coin: 'BTC (Bitcoin)',
    txHash: '0x49da...c712',
    walletAddress: 'bc1q...99z1',
    status: 'approved',
    createdAt: '2026-08-13 18:30:10',
  },
]

const defaultWithdrawals = [
  {
    id: 'wth-901',
    userId: 'usr-102',
    userName: 'Elena Rostova',
    userEmail: 'elena.r@invest.io',
    amount: 3500.0,
    asset: 'USDT (TRC20)',
    walletAddress: 'TXp4...92bV',
    status: 'pending',
    createdAt: '2026-08-14 10:45:00',
  },
  {
    id: 'wth-900',
    userId: 'usr-103',
    userName: 'David Miller',
    userEmail: 'david.m@apexcap.com',
    amount: 15000.0,
    asset: 'USDT (ERC20)',
    walletAddress: '0x992...a381',
    status: 'approved',
    createdAt: '2026-08-12 16:15:00',
  },
]

function getStored(key, fallback) {
  try {
    const d = localStorage.getItem(key)
    if (d) return JSON.parse(d)
  } catch (e) {
    console.error(`Failed to load ${key}:`, e)
  }
  return fallback
}

function saveStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    console.error(`Failed to save ${key}:`, e)
  }
}

export function useModeratorData() {
  const [users, setUsers] = useState(() => getStored(USERS_STORAGE_KEY, defaultUsers))
  const [investments, setInvestments] = useState(() => getStored(INVESTMENTS_STORAGE_KEY, defaultInvestments))
  const [deposits, setDeposits] = useState(() => getStored(DEPOSITS_STORAGE_KEY, defaultDeposits))
  const [withdrawals, setWithdrawals] = useState(() => getStored(WITHDRAWALS_STORAGE_KEY, defaultWithdrawals))
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() })
    setTimeout(() => setToast(null), 3500)
  }, [])

  // Sync state helpers
  const updateUsers = useCallback((updater) => {
    setUsers((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStored(USERS_STORAGE_KEY, next)
      return next
    })
  }, [])

  const updateInvestments = useCallback((updater) => {
    setInvestments((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStored(INVESTMENTS_STORAGE_KEY, next)
      return next
    })
  }, [])

  const updateDeposits = useCallback((updater) => {
    setDeposits((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStored(DEPOSITS_STORAGE_KEY, next)
      return next
    })
  }, [])

  const updateWithdrawals = useCallback((updater) => {
    setWithdrawals((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStored(WITHDRAWALS_STORAGE_KEY, next)
      return next
    })
  }, [])

  // 1. APPROVE DEPOSIT
  const approveDeposit = useCallback(
    (depositId) => {
      const dep = deposits.find((d) => d.id === depositId)
      if (!dep) return

      updateDeposits((prev) =>
        prev.map((d) => (d.id === depositId ? { ...d, status: 'approved' } : d))
      )

      // Credit user available balance
      updateUsers((prev) =>
        prev.map((u) => {
          if (u.id === dep.userId || u.email === dep.userEmail) {
            return {
              ...u,
              availableBalance: u.availableBalance + dep.amount,
              totalBalance: u.totalBalance + dep.amount,
            }
          }
          return u
        })
      )

      showToast(`Deposit of $${dep.amount.toLocaleString()} for ${dep.userName} approved & credited!`, 'success')
    },
    [deposits, showToast, updateDeposits, updateUsers]
  )

  // 2. REJECT DEPOSIT
  const rejectDeposit = useCallback(
    (depositId) => {
      updateDeposits((prev) =>
        prev.map((d) => (d.id === depositId ? { ...d, status: 'rejected' } : d))
      )
      showToast(`Deposit ${depositId} marked as rejected.`, 'warning')
    },
    [showToast, updateDeposits]
  )

  // 3. APPROVE WITHDRAWAL
  const approveWithdrawal = useCallback(
    (withdrawalId) => {
      const wth = withdrawals.find((w) => w.id === withdrawalId)
      if (!wth) return

      updateWithdrawals((prev) =>
        prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'approved' } : w))
      )

      // Deduct from user balance
      updateUsers((prev) =>
        prev.map((u) => {
          if (u.id === wth.userId || u.email === wth.userEmail) {
            return {
              ...u,
              availableBalance: Math.max(0, u.availableBalance - wth.amount),
              totalBalance: Math.max(0, u.totalBalance - wth.amount),
            }
          }
          return u
        })
      )

      showToast(`Withdrawal of $${wth.amount.toLocaleString()} for ${wth.userName} approved & dispatched!`, 'success')
    },
    [showToast, updateUsers, updateWithdrawals, withdrawals]
  )

  // 4. REJECT WITHDRAWAL
  const rejectWithdrawal = useCallback(
    (withdrawalId) => {
      updateWithdrawals((prev) =>
        prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'rejected' } : w))
      )
      showToast(`Withdrawal ${withdrawalId} rejected.`, 'warning')
    },
    [showToast, updateWithdrawals]
  )

  // 5. CREATE NEW INVESTMENT FOR USER
  const createInvestment = useCallback(
    ({ userEmail, planId, planName, depositAmount, durationDays, dailyRoi, autoCompound = true }) => {
      const user = users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase())
      const userName = user ? user.name : userEmail.split('@')[0]
      const userId = user ? user.id : `usr-${Date.now().toString().slice(-4)}`

      const numAmount = parseFloat(depositAmount) || 1000
      const numRoi = parseFloat(dailyRoi) || 2.4
      const dailyProfit = numAmount * (numRoi / 100)

      const startDate = new Date().toISOString().split('T')[0]
      const endD = new Date()
      endD.setDate(endD.getDate() + (parseInt(durationDays) || 14))
      const endDate = endD.toISOString().split('T')[0]

      const newInv = {
        id: `inv-${Date.now().toString().slice(-4)}`,
        userId,
        userName,
        userEmail,
        planName: planName || 'Growth Alpha',
        planId: planId || 'growth',
        depositAmount: numAmount,
        dailyRoi: `${numRoi.toFixed(2)}%`,
        dailyProfit,
        totalEarned: 0,
        durationDays: parseInt(durationDays) || 14,
        daysElapsed: 0,
        startDate,
        endDate,
        status: 'active',
        autoCompound,
      }

      updateInvestments((prev) => [newInv, ...prev])

      // Update user invested balance
      updateUsers((prev) =>
        prev.map((u) => {
          if (u.email.toLowerCase() === userEmail.toLowerCase()) {
            return {
              ...u,
              investedBalance: u.investedBalance + numAmount,
              totalBalance: u.totalBalance + numAmount,
              activePlan: newInv.planName,
            }
          }
          return u
        })
      )

      showToast(`Created new ${newInv.planName} investment of $${numAmount.toLocaleString()} for ${userName}!`, 'success')
    },
    [showToast, updateInvestments, updateUsers, users]
  )

  // 6. CREDIT DAILY YIELD / ACCRUE TO INVESTMENT
  const creditYield = useCallback(
    (investmentId) => {
      const inv = investments.find((i) => i.id === investmentId)
      if (!inv || inv.status !== 'active') return

      const addedProfit = inv.dailyProfit
      const updatedTotalEarned = inv.totalEarned + addedProfit
      const updatedDaysElapsed = inv.daysElapsed + 1

      updateInvestments((prev) =>
        prev.map((i) => {
          if (i.id === investmentId) {
            return {
              ...i,
              totalEarned: updatedTotalEarned,
              daysElapsed: updatedDaysElapsed,
              status: updatedDaysElapsed >= i.durationDays ? 'matured' : 'active',
            }
          }
          return i
        })
      )

      // Credit to user available balance
      updateUsers((prev) =>
        prev.map((u) => {
          if (u.email === inv.userEmail || u.id === inv.userId) {
            return {
              ...u,
              availableBalance: u.availableBalance + addedProfit,
              totalBalance: u.totalBalance + addedProfit,
            }
          }
          return u
        })
      )

      showToast(`Credited +$${addedProfit.toFixed(2)} daily yield to ${inv.userName}!`, 'success')
    },
    [investments, showToast, updateInvestments, updateUsers]
  )

  // 7. CLOSE / MATURE INVESTMENT & RETURN CAPITAL
  const closeInvestment = useCallback(
    (investmentId) => {
      const inv = investments.find((i) => i.id === investmentId)
      if (!inv) return

      updateInvestments((prev) =>
        prev.map((i) => (i.id === investmentId ? { ...i, status: 'matured' } : i))
      )

      // Return principal to available balance
      updateUsers((prev) =>
        prev.map((u) => {
          if (u.email === inv.userEmail || u.id === inv.userId) {
            return {
              ...u,
              availableBalance: u.availableBalance + inv.depositAmount,
              investedBalance: Math.max(0, u.investedBalance - inv.depositAmount),
            }
          }
          return u
        })
      )

      showToast(`Investment ${inv.id} matured! Capital $${inv.depositAmount.toLocaleString()} returned to available balance.`, 'success')
    },
    [investments, showToast, updateInvestments, updateUsers]
  )

  // 8. UPDATE USER BALANCE DIRECTLY
  const updateUserBalance = useCallback(
    (userId, newAvailable, newInvested) => {
      const avail = parseFloat(newAvailable) || 0
      const inv = parseFloat(newInvested) || 0
      const total = avail + inv

      updateUsers((prev) =>
        prev.map((u) => {
          if (u.id === userId) {
            return {
              ...u,
              availableBalance: avail,
              investedBalance: inv,
              totalBalance: total,
            }
          }
          return u
        })
      )

      showToast(`Balance updated successfully!`, 'success')
    },
    [showToast, updateUsers]
  )

  return {
    users,
    investments,
    deposits,
    withdrawals,
    toast,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    createInvestment,
    creditYield,
    closeInvestment,
    updateUserBalance,
  }
}
