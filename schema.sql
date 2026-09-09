-- ===================================================================
-- PUREX EXCHANGE - PRODUCTION SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor to initialize all tables
-- ===================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(100),
    referral_code VARCHAR(50),
    referred_by VARCHAR(50),
    email_verified BOOLEAN DEFAULT TRUE,
    total_balance NUMERIC(18, 4) DEFAULT 0.0000,
    available_balance NUMERIC(18, 4) DEFAULT 0.0000,
    invested_balance NUMERIC(18, 4) DEFAULT 0.0000,
    capital NUMERIC(18, 4) DEFAULT 0.0000,
    profit NUMERIC(18, 4) DEFAULT 0.0000,
    tier VARCHAR(50) DEFAULT 'Pro Quant Desk',
    kyc_status VARCHAR(50) DEFAULT 'Unverified',
    role VARCHAR(50) DEFAULT 'user', -- user, moderator, admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. INVESTMENT PLANS TABLE
CREATE TABLE IF NOT EXISTS investment_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50) DEFAULT 'POPULAR',
    min_deposit NUMERIC(18, 2) NOT NULL,
    max_deposit NUMERIC(18, 2) NOT NULL,
    duration_days INT NOT NULL,
    daily_roi NUMERIC(6, 2) NOT NULL, -- e.g., 2.40 for 2.4% daily
    expected_return NUMERIC(6, 2) NOT NULL,
    capital_back BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. USER INVESTMENTS TABLE
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    package_name VARCHAR(100) NOT NULL,
    amount NUMERIC(18, 4) NOT NULL,
    daily_roi VARCHAR(20) DEFAULT '2.4%',
    daily_earnings NUMERIC(18, 4) DEFAULT 0.0000,
    total_earned NUMERIC(18, 4) DEFAULT 0.0000,
    duration VARCHAR(50) DEFAULT '30 Days',
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, MATURED, CANCELLED
    start_date DATE DEFAULT CURRENT_DATE,
    insurance_status VARCHAR(100) DEFAULT '100% SAFU Insured',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CRYPTO & FIAT DEPOSITS TABLE
CREATE TABLE IF NOT EXISTS deposits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(18, 4) NOT NULL,
    coin VARCHAR(50) NOT NULL, -- USDT (TRC20), BTC, ETH, SOL
    wallet_address VARCHAR(255) NOT NULL,
    transaction_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, Completed, Rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. WITHDRAWALS TABLE (Crypto & Local Bank Wire)
CREATE TABLE IF NOT EXISTS withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(18, 4) NOT NULL,
    method VARCHAR(50) NOT NULL, -- CRYPTO, LOCAL_BANK
    asset VARCHAR(20) NOT NULL, -- USDT, BTC, USD, EUR, GBP, etc.
    crypto_address VARCHAR(255),
    crypto_network VARCHAR(50),
    gas_fee_amount NUMERIC(18, 4) DEFAULT 0.0000,
    gas_fee_hash VARCHAR(255),
    bank_name VARCHAR(255),
    account_number VARCHAR(255),
    account_name VARCHAR(255),
    swift_code VARCHAR(100),
    tax_fee_amount NUMERIC(18, 4) DEFAULT 0.0000,
    tax_fee_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending Clearing', -- Pending Clearing, Completed, Rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. GENERAL TRANSACTIONS LEDGER
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- DEPOSIT, WITHDRAWAL, CONVERT, PROFIT, INVESTMENT, REFERRAL
    title VARCHAR(255) NOT NULL,
    asset VARCHAR(20) NOT NULL,
    amount NUMERIC(18, 4) NOT NULL,
    fee_amount NUMERIC(18, 4) DEFAULT 0.0000,
    hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- SEED DEFAULT INVESTMENT PLANS
-- ===================================================================
INSERT INTO investment_plans (name, badge, min_deposit, max_deposit, duration_days, expected_return, capital_back, is_active, description)
VALUES 
    ('Alpha Starter Yield', 'STARTER', 500, 5000, 14, 8.50, TRUE, TRUE, 'High-liquidity algorithmic market-making pool with 14-day cycle.'),
    ('Institutional Growth', 'POPULAR', 5000, 50000, 30, 18.20, TRUE, TRUE, 'Cross-exchange triangular arbitrage & institutional staking.'),
    ('Purex Prime Venture', 'VIP TIER', 50000, 1000000, 90, 42.50, TRUE, TRUE, 'Bespoke OTC liquidity allocation with institutional principal protection guarantee.')
ON CONFLICT DO NOTHING;
