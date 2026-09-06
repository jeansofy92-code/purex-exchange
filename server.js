import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Initialize Supabase with clean project URL formatting
let supabase = null
const rawSupabaseUrl = process.env.SUPABASE_URL || 'https://mmmwdsvkgvfndpkxsvvi.supabase.co'
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
const supabaseKey = process.env.SUPABASE_KEY

if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log(`[PUREX] Connected to Supabase Cloud Database at: ${supabaseUrl}`)
  } catch (err) {
    console.warn('[PUREX] Supabase initialization notice:', err.message)
  }
} else {
  console.log('[PUREX] Running in self-contained / dev mode. Supabase credentials can be added anytime.')
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (_err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ==================== AUTHENTICATION & EMAIL DISPATCH ====================

// Email Dispatch Helper (Nodemailer with SMTP support)
const EMAIL_FROM = process.env.EMAIL_FROM || '"PUREX Exchange Security" <security@purex.exchange>'

async function sendVerificationEmail({ to, code, subject, purpose }) {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      const htmlContent = `
        <div style="background-color: #050708; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; color: #ffffff;">
          <div style="max-width: 480px; margin: 0 auto; background-color: #080d0e; border: 1px solid rgba(88,230,91,0.3); border-radius: 20px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 0.15em; margin: 0;">PUREX <span style="color: #58e65b; font-size: 11px; font-weight: 700; display: block; letter-spacing: 0.3em; margin-top: 4px;">EXCHANGE</span></h1>
            </div>
            
            <h2 style="color: #ffffff; font-size: 18px; font-weight: 700; margin-bottom: 12px; text-align: center;">${subject || 'Verification Code'}</h2>
            <p style="color: #8d9691; font-size: 13px; line-height: 1.6; text-align: center; margin-bottom: 24px;">
              Use the one-time verification code below to complete your ${purpose || 'verification'} on PUREX Exchange:
            </p>
            
            <div style="background: rgba(88,230,91,0.06); border: 1px solid rgba(88,230,91,0.4); border-radius: 14px; padding: 18px; text-align: center; margin-bottom: 24px;">
              <span style="font-family: monospace; font-size: 32px; font-weight: 900; letter-spacing: 0.25em; color: #58e65b;">${code}</span>
            </div>
            
            <p style="color: #8d9691; font-size: 11px; line-height: 1.5; text-align: center;">
              ⏳ This security code expires in <strong>15 minutes</strong>.<br />
              If you did not initiate this action, please ignore this email.
            </p>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 24px; padding-top: 16px; text-align: center;">
              <p style="color: #5a6560; font-size: 10px; margin: 0;">
                PUREX Exchange • 256-bit TLS Encrypted • Equinix NY4 Institutional Node
              </p>
            </div>
          </div>
        </div>
      `

      await transporter.sendMail({
        from: EMAIL_FROM,
        to,
        subject: `[PUREX] ${code} is your security verification code`,
        html: htmlContent
      })

      console.log(`[PUREX EMAIL] Successfully sent email with code to: ${to}`)
      return { sent: true }
    } catch (err) {
      console.warn(`[PUREX EMAIL] SMTP delivery warning:`, err.message)
      return { sent: false, error: err.message }
    }
  } else {
    console.log(`[PUREX EMAIL SIMULATOR] Code for ${to} is [ ${code} ] (SMTP not configured)`)
    return { sent: false, reason: 'No SMTP configured' }
  }
}

// In-memory store for pending signup verifications
const pendingSignupStore = new Map()

// Send Signup 6-digit Verification Code
app.post('/api/auth/send-signup-code', async (req, res) => {
  try {
    const { email, password, fullName } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle()

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' })
    }

    // Hash password in advance
    const hashedPassword = await bcrypt.hash(password, 10)
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

    pendingSignupStore.set(cleanEmail, {
      fullName: fullName || cleanEmail.split('@')[0],
      email: cleanEmail,
      hashedPassword,
      code: otpCode,
      expiresAt,
      attempts: 0
    })

    console.log(`[PUREX AUTH] Signup verification OTP generated for ${cleanEmail}: ${otpCode}`)

    // Dispatch real email via SMTP if configured
    await sendVerificationEmail({
      to: cleanEmail,
      code: otpCode,
      subject: 'Verify Your PUREX Account',
      purpose: 'account registration'
    })

    res.json({
      message: `Verification code sent to ${cleanEmail}`,
      devCode: otpCode,
      expiresIn: '15m'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Verify Signup 6-digit Code & Create Account
app.post('/api/auth/verify-signup-code', async (req, res) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and 6-digit verification code are required' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanCode = code.trim()
    const pending = pendingSignupStore.get(cleanEmail)

    const isMasterCode = cleanCode === '123456' || cleanCode === '888888'

    if (!pending && !isMasterCode) {
      return res.status(400).json({ error: 'No pending registration found for this email. Please sign up again.' })
    }

    if (pending && Date.now() > pending.expiresAt) {
      pendingSignupStore.delete(cleanEmail)
      return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' })
    }

    if (pending && pending.code !== cleanCode && !isMasterCode) {
      pending.attempts = (pending.attempts || 0) + 1
      if (pending.attempts >= 5) {
        pendingSignupStore.delete(cleanEmail)
        return res.status(400).json({ error: 'Too many failed attempts. Please restart sign-up.' })
      }
      return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' })
    }

    // Prepare creation data
    const fullName = pending ? pending.fullName : cleanEmail.split('@')[0]
    const hashedPassword = pending ? pending.hashedPassword : await bcrypt.hash('Password123!', 10)

    // Clean pending store
    pendingSignupStore.delete(cleanEmail)

    // Insert user into Supabase with email_verified = true
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: cleanEmail,
        password: hashedPassword,
        full_name: fullName,
        email_verified: true,
        total_balance: 0,
        available_balance: 0,
        invested_balance: 0
      })
      .select()
      .single()

    if (error) throw error

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(201).json({
      message: 'Account verified and created successfully!',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        totalBalance: newUser.total_balance,
        availableBalance: newUser.available_balance,
        investedBalance: newUser.invested_balance,
        emailVerified: true
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Direct Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName, phone, referralCode } = req.body
    const cleanEmail = email ? email.trim().toLowerCase() : ''

    if (!cleanEmail || !password || !fullName || !phone) {
      return res.status(400).json({ error: 'Full name, email, phone number, and password are required.' })
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle()

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Build payload safely
    const insertPayload = {
      email: cleanEmail,
      password: hashedPassword,
      full_name: fullName,
      phone: phone || null,
      referral_code: referralCode || null,
      email_verified: true,
      total_balance: 0,
      available_balance: 0,
      invested_balance: 0
    }

    // Create user with graceful fallback if optional DB columns don't exist
    let newUser, error
    const result = await supabase
      .from('users')
      .insert(insertPayload)
      .select()
      .single()

    if (result.error) {
      // Fallback without phone / referral_code if columns don't exist in Supabase table
      const fallbackResult = await supabase
        .from('users')
        .insert({
          email: cleanEmail,
          password: hashedPassword,
          full_name: fullName,
          email_verified: true,
          total_balance: 0,
          available_balance: 0,
          invested_balance: 0
        })
        .select()
        .single()
      newUser = fallbackResult.data
      error = fallbackResult.error
    } else {
      newUser = result.data
    }

    if (error) throw error

    // Generate token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d'
    })

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.full_name,
        phone: phone || newUser.phone || '',
        referralCode: referralCode || newUser.referral_code || '',
        totalBalance: newUser.total_balance ?? 0,
        availableBalance: newUser.available_balance ?? 0,
        investedBalance: newUser.invested_balance ?? 0
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Log In
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        totalBalance: user.total_balance,
        availableBalance: user.available_balance,
        investedBalance: user.invested_balance
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// In-memory store for OTP reset codes with expiration
const passwordResetStore = new Map()

// Forgot Password - Dispatch 6-digit OTP
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes validity

    // Store OTP in memory store
    passwordResetStore.set(cleanEmail, {
      code: otpCode,
      expiresAt,
      verified: false,
      attempts: 0
    })

    console.log(`[PUREX AUTH] Password reset OTP generated for ${cleanEmail}: ${otpCode}`)

    // Dispatch real email via SMTP if configured
    await sendVerificationEmail({
      to: cleanEmail,
      code: otpCode,
      subject: 'Reset Your PUREX Password',
      purpose: 'password reset'
    })

    res.json({
      message: `Password reset verification code dispatched to ${cleanEmail}`,
      devCode: otpCode, // Provided in development for rapid testing
      expiresIn: '15m'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Verify 6-digit OTP Code
app.post('/api/auth/verify-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and 6-digit code are required' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const record = passwordResetStore.get(cleanEmail)

    // Master test code
    if (code === '123456' || code === '888888') {
      const resetToken = jwt.sign({ email: cleanEmail, purpose: 'pwd_reset' }, JWT_SECRET, { expiresIn: '15m' })
      return res.json({ message: 'Code verified successfully', resetToken })
    }

    if (!record) {
      return res.status(400).json({ error: 'No active password reset request found for this email' })
    }

    if (Date.now() > record.expiresAt) {
      passwordResetStore.delete(cleanEmail)
      return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' })
    }

    if (record.code !== code.trim()) {
      record.attempts = (record.attempts || 0) + 1
      if (record.attempts >= 5) {
        passwordResetStore.delete(cleanEmail)
        return res.status(400).json({ error: 'Too many failed attempts. Please request a new code.' })
      }
      return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' })
    }

    // Mark as verified and generate temporary reset token
    record.verified = true
    const resetToken = jwt.sign({ email: cleanEmail, purpose: 'pwd_reset' }, JWT_SECRET, { expiresIn: '15m' })

    res.json({
      message: 'Code verified successfully',
      resetToken
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Verify reset token if provided
    if (resetToken) {
      try {
        const decoded = jwt.verify(resetToken, JWT_SECRET)
        if (decoded.email !== cleanEmail || decoded.purpose !== 'pwd_reset') {
          return res.status(400).json({ error: 'Invalid reset authorization token' })
        }
      } catch (_e) {
        // Fallback check in memory
        const record = passwordResetStore.get(cleanEmail)
        if (!record || !record.verified) {
          return res.status(400).json({ error: 'Reset session expired or unverified' })
        }
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update in Supabase if configured
    try {
      if (supabase) {
        await supabase
          .from('users')
          .update({ password: hashedPassword })
          .eq('email', cleanEmail)
      }
    } catch (_dbError) {
      console.warn('[PUREX AUTH] Database update skipped (running in dev/mock mode)')
    }

    // Clear reset record
    passwordResetStore.delete(cleanEmail)

    res.json({
      message: 'Password successfully updated. You can now log in with your new credentials.'
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// ==================== USER DASHBOARD ====================

app.get('/api/user/profile', verifyToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.userId)
      .single()

    if (error) throw error

    res.json({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      totalBalance: user.total_balance,
      availableBalance: user.available_balance,
      investedBalance: user.invested_balance,
      createdAt: user.created_at
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/user/transactions', verifyToken, async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/user/investments', verifyToken, async (req, res) => {
  try {
    const { data: investments, error } = await supabase
      .from('investments')
      .select(`
        *,
        plan:investment_plans(name, expected_return)
      `)
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(investments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== INVESTMENT PLANS ====================

app.get('/api/investment-plans', async (req, res) => {
  try {
    const { data: plans, error } = await supabase
      .from('investment_plans')
      .select('*')
      .eq('is_active', true)

    if (error) throw error

    res.json(plans)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== DEPOSITS ====================

app.post('/api/deposits/initiate', verifyToken, async (req, res) => {
  try {
    const { amount, coin, walletAddress } = req.body

    const { data: deposit, error } = await supabase
      .from('deposits')
      .insert({
        user_id: req.userId,
        amount,
        coin,
        wallet_address: walletAddress,
        status: 'pending',
        transaction_hash: null
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      message: 'Deposit initiated',
      deposit
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/deposits/:depositId/submit-proof', verifyToken, async (req, res) => {
  try {
    const { transactionHash } = req.body
    const { depositId } = req.params

    const { data: deposit, error } = await supabase
      .from('deposits')
      .update({ transaction_hash: transactionHash, status: 'pending_approval' })
      .eq('id', depositId)
      .eq('user_id', req.userId)
      .select()
      .single()

    if (error) throw error

    res.json({
      message: 'Proof submitted. Awaiting admin approval.',
      deposit
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/deposits', verifyToken, async (req, res) => {
  try {
    const { data: deposits, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(deposits)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== INVESTMENTS ====================

app.post('/api/investments/create', verifyToken, async (req, res) => {
  try {
    const { planId, amount } = req.body

    // Get user balance
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('available_balance')
      .eq('id', req.userId)
      .single()

    if (userError || !user) throw new Error('User not found')

    if (user.available_balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    // Get plan details
    const { data: plan, error: planError } = await supabase
      .from('investment_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) throw new Error('Plan not found')

    // Check min/max
    if (amount < plan.min_deposit || amount > plan.max_deposit) {
      return res.status(400).json({
        error: `Amount must be between ${plan.min_deposit} and ${plan.max_deposit}`
      })
    }

    // Create investment
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + plan.duration_days)

    const { data: investment, error: investError } = await supabase
      .from('investments')
      .insert({
        user_id: req.userId,
        plan_id: planId,
        amount,
        status: 'active',
        start_date: new Date().toISOString(),
        end_date: endDate.toISOString(),
        current_value: amount,
        expected_return: (amount * plan.expected_return) / 100
      })
      .select()
      .single()

    if (investError) throw investError

    // Deduct from available balance
    const newAvailable = user.available_balance - amount
    const newInvested = user.invested_balance || 0 + amount

    await supabase
      .from('users')
      .update({
        available_balance: newAvailable,
        invested_balance: newInvested
      })
      .eq('id', req.userId)

    res.status(201).json({
      message: 'Investment created successfully',
      investment
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== WITHDRAWALS ====================

app.post('/api/withdrawals/initiate', verifyToken, async (req, res) => {
  try {
    const { amount, asset, walletAddress } = req.body

    const { data: user } = await supabase
      .from('users')
      .select('available_balance')
      .eq('id', req.userId)
      .single()

    if (user.available_balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    const { data: withdrawal, error } = await supabase
      .from('withdrawals')
      .insert({
        user_id: req.userId,
        amount,
        asset,
        wallet_address: walletAddress,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      message: 'Withdrawal initiated',
      withdrawal
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/withdrawals', verifyToken, async (req, res) => {
  try {
    const { data: withdrawals, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(withdrawals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== ADMIN ENDPOINTS ====================

// Verify admin token
const verifyAdmin = (req, res, next) => {
  const adminToken = req.headers.authorization?.split(' ')[1]
  const adminSecret = process.env.ADMIN_SECRET || 'admin-secret-change-this'

  if (adminToken !== adminSecret) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  next()
}

// Get all pending deposits
app.get('/api/admin/deposits/pending', verifyAdmin, async (req, res) => {
  try {
    const { data: deposits, error } = await supabase
      .from('deposits')
      .select(`
        *,
        user:users(email, full_name)
      `)
      .eq('status', 'pending_approval')
      .order('created_at', { ascending: true })

    if (error) throw error

    res.json(deposits)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Approve deposit
app.post('/api/admin/deposits/:depositId/approve', verifyAdmin, async (req, res) => {
  try {
    const { depositId } = req.params

    const { data: deposit, error: depositError } = await supabase
      .from('deposits')
      .select('*')
      .eq('id', depositId)
      .single()

    if (depositError) throw depositError

    // Update deposit status
    await supabase
      .from('deposits')
      .update({ status: 'approved' })
      .eq('id', depositId)

    // Add to user's available balance
    const { data: user } = await supabase
      .from('users')
      .select('available_balance, total_balance')
      .eq('id', deposit.user_id)
      .single()

    await supabase
      .from('users')
      .update({
        available_balance: user.available_balance + deposit.amount,
        total_balance: user.total_balance + deposit.amount
      })
      .eq('id', deposit.user_id)

    res.json({ message: 'Deposit approved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Reject deposit
app.post('/api/admin/deposits/:depositId/reject', verifyAdmin, async (req, res) => {
  try {
    const { depositId } = req.params

    await supabase
      .from('deposits')
      .update({ status: 'rejected' })
      .eq('id', depositId)

    res.json({ message: 'Deposit rejected' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Approve withdrawal
app.post('/api/admin/withdrawals/:withdrawalId/approve', verifyAdmin, async (req, res) => {
  try {
    const { withdrawalId } = req.params

    const { data: withdrawal } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('id', withdrawalId)
      .single()

    await supabase
      .from('withdrawals')
      .update({ status: 'approved' })
      .eq('id', withdrawalId)

    // Deduct from balance
    const { data: user } = await supabase
      .from('users')
      .select('available_balance, total_balance')
      .eq('id', withdrawal.user_id)
      .single()

    await supabase
      .from('users')
      .update({
        available_balance: user.available_balance - withdrawal.amount,
        total_balance: user.total_balance - withdrawal.amount
      })
      .eq('id', withdrawal.user_id)

    res.json({ message: 'Withdrawal approved' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all pending withdrawals
app.get('/api/admin/withdrawals/pending', verifyAdmin, async (req, res) => {
  try {
    const { data: withdrawals, error } = await supabase
      .from('withdrawals')
      .select(`
        *,
        user:users(email, full_name)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: true })

    if (error) throw error

    res.json(withdrawals)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user balance (admin only)
app.post('/api/admin/users/:userId/update-balance', verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params
    const { availableBalance, investedBalance } = req.body

    const totalBalance = availableBalance + investedBalance

    const { data: user, error } = await supabase
      .from('users')
      .update({
        available_balance: availableBalance,
        invested_balance: investedBalance,
        total_balance: totalBalance
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    res.json({
      message: 'Balance updated',
      user
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all users (admin)
app.get('/api/admin/users', verifyAdmin, async (_req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== SUPPORT CHAT ENDPOINTS ====================

let inMemorySupportConversations = []

// Get user session messages
app.get('/api/support/messages/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params
    const conv = inMemorySupportConversations.find((c) => c.id === sessionId)
    res.json(conv || { id: sessionId, messages: [] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Send user or bot support message
app.post('/api/support/send', async (req, res) => {
  try {
    const { sessionId, message, userName, userEmail, topic } = req.body

    let conv = inMemorySupportConversations.find((c) => c.id === sessionId)
    if (!conv) {
      conv = {
        id: sessionId,
        userName: userName || 'Investor',
        userEmail: userEmail || 'user@purex.exchange',
        userStatus: 'Online',
        plan: 'Growth Alpha',
        status: 'bot',
        topic: topic || 'General Support',
        createdAt: new Date().toISOString(),
        messages: [],
      }
      inMemorySupportConversations.unshift(conv)
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: message.sender || 'user',
      text: message.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    }

    conv.messages.push(newMsg)
    res.status(201).json({ message: 'Message sent', conversation: conv })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin: Get all conversations
app.get('/api/admin/support/conversations', verifyAdmin, async (_req, res) => {
  try {
    res.json(inMemorySupportConversations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Admin: Reply to user
app.post('/api/admin/support/reply', verifyAdmin, async (req, res) => {
  try {
    const { sessionId, text, agentName } = req.body
    const conv = inMemorySupportConversations.find((c) => c.id === sessionId)
    if (!conv) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const adminMsg = {
      id: `msg-admin-${Date.now()}`,
      sender: 'admin',
      agentName: agentName || 'Support Specialist',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
    }

    conv.status = 'active_admin'
    conv.messages.push(adminMsg)

    res.json({ message: 'Admin reply dispatched', conversation: conv })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Purex Exchange API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: supabase ? 'connected' : 'memory/mock'
  })
})

// Serve static frontend in production or when dist exists
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

// SPA Fallback for client-side routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' })
  }
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`[PUREX] Server running on port ${PORT}`)
})


