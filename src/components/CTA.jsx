import { ArrowRight } from 'lucide-react'

function CTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="cta-panel">
        <div>
          <p className="eyebrow mb-4">START YOUR JOURNEY</p>
          <h2 className="section-heading text-[2.4rem] leading-[1.08] md:text-[3.2rem]">Start Your Crypto Journey</h2>
          <p className="mt-4 text-lg text-[#8d9691]">Trade smarter with PUREX Exchange.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button type="button" className="primary-btn w-fit">
            Create Account
            <ArrowRight size={18} />
          </button>
          <button type="button" className="secondary-btn w-fit">
            Explore Markets
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
