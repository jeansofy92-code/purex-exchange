-- ===================================================================
-- PUREX EXCHANGE - PRODUCTION SUPABASE DATABASE SCHEMA
-- Execute this complete script in your Supabase SQL Editor to initialize all tables
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

-- 3. INVESTMENT PLANS TABLE
CREATE TABLE IF NOT EXISTS investment_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    badge VARCHAR(50) DEFAULT 'STANDARD',
    min_deposit NUMERIC(18, 4) NOT NULL,
    max_deposit NUMERIC(18, 4) NOT NULL,
    duration_days INT NOT NULL,
    expected_return NUMERIC(8, 2) NOT NULL,
    capital_back BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Investment Plans
INSERT INTO investment_plans (name, badge, min_deposit, max_deposit, duration_days, expected_return, capital_back, is_active, description)
VALUES 
    ('Alpha Starter Yield', 'STARTER', 500, 5000, 14, 8.50, TRUE, TRUE, 'High-liquidity algorithmic market-making pool with 14-day cycle.'),
    ('Institutional Growth', 'POPULAR', 5000, 50000, 30, 18.20, TRUE, TRUE, 'Cross-exchange triangular arbitrage & institutional staking.'),
    ('Purex Prime Venture', 'VIP TIER', 50000, 1000000, 90, 42.50, TRUE, TRUE, 'Bespoke OTC liquidity allocation with institutional principal protection guarantee.')
ON CONFLICT DO NOTHING;

-- 4. USER INVESTMENTS TABLE
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES investment_plans(id) ON DELETE SET NULL,
    package_name VARCHAR(100) NOT NULL,
    amount NUMERIC(18, 4) NOT NULL,
    daily_roi VARCHAR(20) DEFAULT '2.4%',
    daily_earnings NUMERIC(18, 4) DEFAULT 0.0000,
    total_earned NUMERIC(18, 4) DEFAULT 0.0000,
    duration VARCHAR(50) DEFAULT '30 Days',
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, MATURED, CANCELLED
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    current_value NUMERIC(18, 4) DEFAULT 0.0000,
    expected_return NUMERIC(18, 4) DEFAULT 0.0000,
    insurance_status VARCHAR(100) DEFAULT '100% SAFU Insured',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CRYPTO & FIAT DEPOSITS TABLE
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

-- 6. WITHDRAWALS TABLE (Crypto & Local Bank Wire)
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

-- 7. GENERAL TRANSACTIONS LEDGER
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- DEPOSIT, WITHDRAWAL, CONVERT, PROFIT, INVESTMENT, REFERRAL, TRADE, SYSTEM
    title VARCHAR(255) NOT NULL,
    asset VARCHAR(20) NOT NULL,
    amount NUMERIC(18, 4) NOT NULL,
    fee_amount NUMERIC(18, 4) DEFAULT 0.0000,
    hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Completed',
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. LIVE SUPPORT DESK & CHAT CONVERSATIONS
CREATE TABLE IF NOT EXISTS support_conversations (
    id VARCHAR(100) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    topic VARCHAR(255) DEFAULT 'General Support',
    status VARCHAR(50) DEFAULT 'active_bot', -- active_bot, active_admin, resolved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id VARCHAR(100) REFERENCES support_conversations(id) ON DELETE CASCADE,
    sender VARCHAR(50) NOT NULL, -- user, admin, bot
    agent_name VARCHAR(100),
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SEED DEMO ADMINISTRATOR & SAMPLE TRADER
INSERT INTO users (id, email, password, raw_password, full_name, phone, role, capital, profit, available_balance, total_balance, tier, kyc_status)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'admin@purex.exchange', '$2a$10$wT0Xk7q.8Fq9lB1wE3lZqea8J6qL2M6E0v5xG3n8M5m3m5m3m5m3m', 'admin123', 'Purex Executive Admin', '+1 (800) 555-0199', 'admin', 500000.00, 120000.00, 80000.00, 700000.00, 'Executive Board', 'Verified Level 2'),
    ('a0000000-0000-0000-0000-000000000002', 'trader@purex.exchange', '$2a$10$wT0Xk7q.8Fq9lB1wE3lZqea8J6qL2M6E0v5xG3n8M5m3m5m3m5m3m', 'Password123!', 'Alex Vance (Alpha Trader)', '+1 (555) 234-8921', 'user', 85000.00, 21170.50, 42350.00, 148520.50, 'Pro Quant Desk', 'Verified Level 2')
ON CONFLICT (email) DO NOTHING;

-- 10. ENABLE ROW LEVEL SECURITY (Optional/Permissive for Backend Service Role)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Allow Full Access for Service Role / Authenticated operations
CREATE POLICY "Allow service role full access users" ON users FOR ALL USING (true);
CREATE POLICY "Allow service role full access settings" ON platform_settings FOR ALL USING (true);
CREATE POLICY "Allow service role full access plans" ON investment_plans FOR ALL USING (true);
CREATE POLICY "Allow service role full access investments" ON investments FOR ALL USING (true);
CREATE POLICY "Allow service role full access deposits" ON deposits FOR ALL USING (true);
CREATE POLICY "Allow service role full access withdrawals" ON withdrawals FOR ALL USING (true);
CREATE POLICY "Allow service role full access transactions" ON transactions FOR ALL USING (true);
CREATE POLICY "Allow service role full access conversations" ON support_conversations FOR ALL USING (true);
CREATE POLICY "Allow service role full access messages" ON support_messages FOR ALL USING (true);
