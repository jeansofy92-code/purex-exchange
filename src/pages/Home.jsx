function Home() {
  return (
    <main className="min-h-screen bg-[#0c0d14] text-white font-sans flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#151726] px-4 py-1 text-xs font-semibold text-[#8f9ca9]">
          <span className="h-2 w-2 rounded-full bg-[#356df1] animate-pulse" />
          <span>PureX • Clean Slate Ready</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Ready to build section by section.
        </h1>
        <p className="text-sm text-[#8f9ca9] leading-relaxed">
          All previous landing components have been cleared. Tell me what section you would like to build first (e.g. Header, Hero, Market overview, Bots, etc.) and exactly how you want it designed!
        </p>
      </div>
    </main>
  )
}

export default Home
