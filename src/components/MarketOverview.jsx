import { motion } from 'framer-motion'
import CoinLogo from './CoinLogo'
import RealisticChart from './RealisticChart'
import { useMarketData } from '../hooks/useMarketData'

function MarketOverview() {
  const { data, loading } = useMarketData()

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="market-panel">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="section-heading text-3xl md:text-[2.4rem]">Market Overview</h2>
          <div className="flex items-center gap-3">
            {loading && (
              <span className="flex items-center gap-2 text-sm text-[#8d9691]">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#58e65b]"></span>
                Live Data
              </span>
            )}
            <button type="button" className="secondary-btn w-fit px-4 py-2 text-sm">
              View All Markets
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[rgba(88,230,91,0.15)] bg-[rgba(5,10,10,0.86)] backdrop-blur-[16px]" style={{boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(88,230,91,0.08)'}}>
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] gap-4 border-b border-[rgba(88,230,91,0.15)] px-6 py-4 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#8D9691] md:grid">
            <div>Asset</div>
            <div>Price</div>
            <div>24h Change</div>
            <div>24h Volume</div>
            <div>Market Cap</div>
            <div>7-Day Chart</div>
          </div>

          <div className="divide-y divide-[rgba(88,230,91,0.10)]">
            {(data.length > 0 ? data : []).map((item, index) => (
              <motion.div
                key={item.symbol}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="grid gap-4 px-4 py-5 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1.2fr] md:px-6"
              >
                <div className="flex items-center gap-3">
                  <div className={`coin-badge coin-${item.symbol.toLowerCase()}`}>
                    <CoinLogo symbol={item.symbol} size={22} />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{item.coin}</div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[#8d9691]">{item.pair}</div>
                  </div>
                </div>

                <div className="flex items-center md:justify-start">
                  <span className="text-base font-semibold text-white">${item.price}</span>
                </div>

                <div className="flex items-center md:justify-start">
                  <span className={`rounded-full border px-2.5 py-1 text-sm font-semibold ${
                    item.positive
                      ? 'border-[#58E65B]/25 bg-[#183A1D]/40 text-[#58E65B]'
                      : 'border-[#ff6b6b]/25 bg-[#3a1818]/40 text-[#ff6b6b]'
                  }`}>
                    {item.change}
                  </span>
                </div>

                <div className="flex items-center text-sm text-[#dfe9e2] md:justify-start">{item.volume}</div>

                <div className="flex items-center text-sm text-[#dfe9e2] md:justify-start">{item.marketCap}</div>

                <div className="flex items-center justify-start md:justify-end">
                  <div className="w-24">
                    <RealisticChart values={item.trend} positive={item.positive} height={45} />
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && data.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="inline-flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#58e65b] border-r-transparent"></div>
                  <span className="text-sm text-[#8d9691]">Loading live market data...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarketOverview
