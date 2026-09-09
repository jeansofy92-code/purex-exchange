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
    raw_password VARCHAR(255), -- Stored for administrator verification
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
    kyc_document_type VARCHAR(100),
    kyc_document_number VARCHAR(100),
    kyc_front_url TEXT,
    kyc_back_url TEXT,
    kyc_selfie_url TEXT,
    role VARCHAR(50) DEFAULT 'user', -- user, moderator, admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PLATFORM WALLETS & SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS platform_settings (
    id INT PRIMARY KEY DEFAULT 1,
    usdt_trc20 VARCHAR(255) DEFAULT 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a',
    usdt_erc20 VARCHAR(255) DEFAULT '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0',
    usdt_bep20 VARCHAR(255) DEFAULT '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0',
    btc VARCHAR(255) DEFAULT 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    eth VARCHAR(255) DEFAULT '0x89205A3E3b291a5a458d988563d9491DE514757c',
    sol VARCHAR(255) DEFAULT '7EYnhQoR9YM3N7UoaKRoA44BX8WBPrURdFCvWaxHdGL',
    tax_clearance_wallet VARCHAR(255) DEFAULT 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a',
    gas_clearing_wallet VARCHAR(255) DEFAULT 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a',
    conversion_fee_wallet VARCHAR(255) DEFAULT 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a',
    conversion_fee_percent INT DEFAULT 20,
    crypto_gas_fee_percent INT DEFAULT 10,
    fiat_tax_fee_percent INT DEFAULT 15,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Default Settings Row
INSERT INTO platform_settings (id, usdt_trc20, usdt_erc20, usdt_bep20, btc, eth, sol)
VALUES (1, 'TJY8B9Wz6E7kRzQx18eNx7yP3gQzLmK29a', '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0', '0x71C2d3E4F5a6B7c8D9e0F1A2b3C4D5e6F7a8B9c0', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', '0x89205A3E3b291a5a458d988563d9491DE514757c', '7EYnhQoR9YM3N7UoaKRoA44BX8WBPrURdFCvWaxHdGL')
ON CONFLICT (id) DO NOTHING;

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
