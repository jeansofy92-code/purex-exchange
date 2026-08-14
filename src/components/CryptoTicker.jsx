import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import CoinLogo from './CoinLogo'
import RealisticChart from './RealisticChart'
import { useMarketData } from '../hooks/useMarketData'

function CryptoTicker() {
  const { data } = useMarketData()
  const displayItems = data.length > 0 ? data.slice(0, 5) : []

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#06090a]/90 px-5 py-3.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center gap-6 xl:gap-10 flex-1">
          {displayItems.map((item) => (
            <div key={item.pair} className="flex items-center gap-3">
              <div className={`coin-badge coin-${item.symbol.toLowerCase()}`}>
                <CoinLogo symbol={item.symbol} size={24} />
              </div>
              <div className="leading-tight">
                <div className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#8d9691]">{item.pair}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[0.88rem] font-bold text-white">${item.price}</span>
                  <span className={`text-[0.72rem] font-semibold ${item.positive ? 'text-[#58E65B]' : 'text-[#ff6b6b]'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <div className="w-16 hidden sm:block">
                <RealisticChart values={item.trend} positive={item.positive} height={26} />
              </div>
            </div>
          ))}
        </div>

        <NavLink
          to="/markets"
          className="flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-[#58E65B] transition-colors ml-auto whitespace-nowrap group"
        >
          View All Markets
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </NavLink>
      </div>
    </section>
  )
}

export default CryptoTicker

