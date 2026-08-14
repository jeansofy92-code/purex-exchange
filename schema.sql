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
    email_verified BOOLEAN DEFAULT FALSE,
    total_balance NUMERIC(18, 4) DEFAULT 0.0000,
    available_balance NUMERIC(18, 4) DEFAULT 0.0000,
    invested_balance NUMERIC(18, 4) DEFAULT 0.0000,
    tier VARCHAR(50) DEFAULT 'VIP Tier 1',
    kyc_status VARCHAR(50) DEFAULT 'Pending Verification',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. INVESTMENT PLANS TABLE
CREATE TABLE IF NOT EXISTS investment_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50) DEFAULT 'STANDARD',
    min_deposit NUMERIC(18, 2) NOT NULL,
    max_deposit NUMERIC(18, 2) NOT NULL,
    duration_days INT NOT NULL,
    expected_return NUMERIC(6, 2) NOT NULL, -- e.g., 14.50 for 14.5%
    capital_back BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. USER INVESTMENTS TABLE
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT REFERENCES investment_plans(id),
    amount NUMERIC(18, 4) NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, cancelled
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    current_value NUMERIC(18, 4) NOT NULL,
    expected_return NUMERIC(18, 4) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CRYPTO DEPOSITS TABLE
CREATE TABLE IF NOT EXISTS deposits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(18, 4) NOT NULL,
    coin VARCHAR(20) NOT NULL, -- BTC, ETH, USDT, SOL, etc.
    wallet_address VARCHAR(255) NOT NULL,
    transaction_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, pending_approval, approved, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. WITHDRAWALS TABLE
CREATE TABLE IF NOT EXISTS withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(18, 4) NOT NULL,
    asset VARCHAR(20) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. GENERAL TRANSACTIONS / AUDIT LEDGER
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- deposit, withdrawal, investment_start, investment_payout, trade_buy, trade_sell
    asset VARCHAR(20) NOT NULL,
    amount NUMERIC(18, 4) NOT NULL,
    fee NUMERIC(18, 4) DEFAULT 0.0000,
    status VARCHAR(50) DEFAULT 'completed',
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
