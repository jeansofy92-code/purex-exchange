import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CoinLogo from '../CoinLogo'

const spotlightCoins = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    pair: 'BTC/USDT',
    price: '$68,573.61',
    change: '+3.29%',
    isUp: true,
    vol24h: '$1.42B',
    sparkline: 'M0,28 Q15,22 30,24 T60,16 T90,18 T120,6',
    color: '#f7931a',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    pair: 'ETH/USDT',
    price: '$3,742.21',
    change: '+4.71%',
    isUp: true,
    vol24h: '$840.5M',
    sparkline: 'M0,26 Q20,30 40,20 T80,14 T100,10 T120,4',
    color: '#627eea',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    pair: 'SOL/USDT',
    price: '$171.35',
    change: '+6.19%',
    isUp: true,
    vol24h: '$492.1M',
    sparkline: 'M0,30 Q25,28 50,18 T80,12 T100,8 T120,2',
    color: '#14f195',
  },
  {
    symbol: 'BNB',
    name: 'BNB Chain',
    pair: 'BNB/USDT',
    price: '$612.40',
    change: '+2.85%',
    isUp: true,
    vol24h: '$210.8M',
    sparkline: 'M0,24 Q20,22 45,26 T75,18 T100,12 T120,8',
    color: '#f3ba2f',
  },
]

export default function HomeMarketGainers() {
  return (
    <section className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="green-badge">
              <Sparkles size={11} className="text-[#58e65b]" />
              LIVE MARKETS
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Top Market Spotlight & Momentum
          </h2>
        </div>
        <Link
          to="/markets"
          className="flex items-center gap-1.5 text-xs font-bold text-[#58e65b] hover:underline"
        >
          View All 150+ Markets
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {spotlightCoins.map((coin, index) => (
          <motion.div
            key={coin.symbol}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="exchange-card group p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CoinLogo symbol={coin.symbol} size={36} />
                <div>
                  <div className="font-bold text-white group-hover:text-[#58e65b] transition-colors">
                    {coin.name}
                  </div>
                  <div className="text-xs font-mono text-[#8d9691]">{coin.pair}</div>
                </div>
              </div>
              <span className="rounded-md bg-[#58e65b]/10 px-2 py-0.5 text-xs font-bold text-[#58e65b]">
                {coin.change}
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-xl font-mono font-extrabold text-white">{coin.price}</div>
                <div className="text-[11px] text-[#8d9691]">24h Vol: {coin.vol24h}</div>
              </div>

              {/* Sparkline Visual */}
              <div className="h-8 w-24">
                <svg viewBox="0 0 120 32" className="h-full w-full overflow-visible">
                  <path
                    d={coin.sparkline}
                    fill="none"
                    stroke="#58e65b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <Link
                to={`/trade?pair=${coin.symbol}_USDT`}
                className="flex items-center justify-between text-xs font-semibold text-[#dfe9e2] group-hover:text-[#58e65b]"
              >
                <span>Instant Trade</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
