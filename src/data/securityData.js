export const securityPillars = [
  {
    layer: 'Layer 01',
    name: 'Account & Identity Shield',
    subtitle: 'Zero-Trust Client Authentication & Access Control',
    icon: 'Fingerprint',
    accent: '#58e65b',
    borderGlow: 'hover:border-[#58e65b]/50 hover:shadow-[0_0_30px_rgba(88,230,91,0.2)]',
    points: [
      'Hardware security keys (FIDO2, YubiKey) & WebAuthn support',
      'Time-based One-Time Password (TOTP via Google Authenticator/Authy)',
      'Custom cryptographic anti-phishing codes embedded in all emails',
      'Adaptive device fingerprinting with geo-anomaly IP triggers',
      '24-Hour withdrawal suspension on password/2FA resets',
    ],
  },
  {
    layer: 'Layer 02',
    name: 'AI Neural Anomaly Engine',
    subtitle: 'Sub-Millisecond Threat Detection & Circuit Breakers',
    icon: 'Cpu',
    accent: '#38bdf8',
    borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]',
    points: [
      'Machine-learning behavioral baseline scoring for every account',
      'Automated withdrawal velocity limiters & instant rate-limiting',
      'Automated smart contract exploit mitigation & bot filtration',
      'Darknet credential leak scanning & proactive proactive account alerts',
      'Real-time honeypot traps & distributed DDoS mitigation (Cloudflare Magic Transit)',
    ],
  },
  {
    layer: 'Layer 03',
    name: 'Multi-Sig Cold Storage Vaults',
    subtitle: 'Air-Gapped Institutional Grade Custody Architecture',
    icon: 'Lock',
    accent: '#a855f7',
    borderGlow: 'hover:border-[#a855f7]/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    points: [
      '98%+ of client assets stored in geographically dispersed cold vaults',
      'Multi-party computation (MPC) with M-of-N threshold consensus',
      'FIPS 140-2 Level 4 Hardware Security Modules (HSMs)',
      'Underground bunker facilities with biometric and armed physical security',
      'Zero single point of failure — no single executive holds private keys',
    ],
  },
  {
    layer: 'Layer 04',
    name: '$100M SAFU & Proof of Reserves',
    subtitle: 'Transparent On-Chain Backing & Emergency Guarantee',
    icon: 'ShieldCheck',
    accent: '#eab308',
    borderGlow: 'hover:border-[#eab308]/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
    points: [
      'Dedicated $100,000,000 Secure Asset Fund for Users (SAFU)',
      '100% 1:1 on-chain reserve backing with Merkle-tree verification',
      'Monthly cryptographic solvency attestations by independent auditors',
      'Full legal indemnity coverage against protocol-level vulnerabilities',
      'Segregated client funds never lent, re-hypothecated, or staked without consent',
    ],
  },
]

export const safuAllocations = [
  { asset: 'Bitcoin (BTC)', share: '40%', value: '$40,000,000', color: '#f59e0b', barPct: 40 },
  { asset: 'Tether (USDT) & Cash', share: '35%', value: '$35,000,000', color: '#58e65b', barPct: 35 },
  { asset: 'Ethereum (ETH)', share: '25%', value: '$25,000,000', color: '#38bdf8', barPct: 25 },
]

export const complianceBadges = [
  {
    name: 'ISO/IEC 27001',
    description: 'International benchmark for Information Security Management Systems (ISMS)',
    status: 'Certified Active',
  },
  {
    name: 'SOC 2 Type II',
    description: 'Independent audit verifying Security, Confidentiality, and Availability controls',
    status: 'Audited & Compliant',
  },
  {
    name: 'CCSS Level 3',
    description: 'Highest tier Cryptocurrency Security Standard for institutional multi-sig custody',
    status: 'Tier 3 Certified',
  },
  {
    name: 'GDPR & CCPA',
    description: 'Full compliance with global data privacy and cryptographic erasure rights',
    status: 'Verified Compliant',
  },
]

export const bountyTiers = [
  { severity: 'Critical', reward: 'Up to $250,000', color: '#ff6b6b' },
  { severity: 'High', reward: 'Up to $50,000', color: '#f97316' },
  { severity: 'Medium', reward: 'Up to $15,000', color: '#eab308' },
  { severity: 'Low', reward: 'Up to $2,500', color: '#58e65b' },
]

export const securityFaqs = [
  {
    question: 'How are my funds stored and protected on Purex?',
    answer:
      'Over 98% of all digital assets are held in geographically distributed, air-gapped cold storage vaults powered by Multi-Party Computation (MPC) and Hardware Security Modules (HSMs). Keys are split across multiple high-security facilities worldwide, requiring M-of-N threshold quorum approval for any fund movement.',
  },
  {
    question: 'What is the $100,000,000 SAFU Insurance Reserve Fund?',
    answer:
      'The Secure Asset Fund for Users (SAFU) is an emergency reserve fund established by Purex holding $100M+ in liquid crypto and fiat assets (BTC, USDT, ETH). In the unlikely event of extreme protocol stress or security emergencies, the SAFU fund guarantees full reimbursement of user capital.',
  },
  {
    question: 'Can I independently verify that my assets are backed 1:1?',
    answer:
      'Yes. Purex implements Merkle Tree Cryptographic Proof of Reserves. Users can generate their individual Merkle leaf hash directly in their dashboard to verify that their balance is included in the on-chain total and backed 1:1 without compromising privacy.',
  },
  {
    question: 'What happens if I suspect unauthorized access to my account?',
    answer:
      'Purex provides an Instant 1-Click Self-Lockdown mechanism in every login notification email and SMS. Clicking this immediately freezes all trading, API keys, and withdrawals within 5 milliseconds. Our 24/7 Red Team will then guide you through biometric identity restoration.',
  },
  {
    question: 'Are withdrawals subject to security delays?',
    answer:
      'Standard withdrawals to whitelisted addresses process in seconds. However, if a withdrawal is initiated from an unrecognized device, IP address, or exceeds automated velocity thresholds, it undergoes automated risk verification and may require secondary biometric / hardware key confirmation to prevent theft.',
  },
]
