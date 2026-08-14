const particles = [
  { left: '10%', top: '18%', size: '3px', delay: '0s' },
  { left: '18%', top: '34%', size: '2px', delay: '2.2s' },
  { left: '28%', top: '20%', size: '3px', delay: '1.1s' },
  { left: '38%', top: '41%', size: '2px', delay: '3.5s' },
  { left: '47%', top: '28%', size: '3px', delay: '0.6s' },
  { left: '55%', top: '55%', size: '2px', delay: '3.8s' },
  { left: '63%', top: '25%', size: '3px', delay: '1.7s' },
  { left: '72%', top: '48%', size: '2px', delay: '2.8s' },
  { left: '80%', top: '31%', size: '3px', delay: '1.4s' },
  { left: '88%', top: '52%', size: '2px', delay: '4.1s' },
  { left: '14%', top: '72%', size: '2px', delay: '2.5s' },
  { left: '24%', top: '63%', size: '3px', delay: '0.3s' },
  { left: '35%', top: '80%', size: '2px', delay: '4.4s' },
  { left: '52%', top: '72%', size: '3px', delay: '3.1s' },
  { left: '68%', top: '75%', size: '2px', delay: '1.8s' },
  { left: '83%', top: '68%', size: '3px', delay: '0.9s' },
  { left: '91%', top: '30%', size: '2px', delay: '2.9s' },
  { left: '58%', top: '12%', size: '2px', delay: '4.6s' },
  { left: '12%', top: '48%', size: '2px', delay: '5.1s' },
  { left: '44%', top: '58%', size: '2px', delay: '2.1s' },
  { left: '62%', top: '68%', size: '2px', delay: '3.6s' },
  { left: '76%', top: '22%', size: '2px', delay: '4.8s' },
  { left: '96%', top: '48%', size: '2px', delay: '1.5s' },
  { left: '32%', top: '11%', size: '2px', delay: '0.8s' },
]

function HomeBackground() {
  return (
    <div className="home-bg" aria-hidden="true">
      <div className="home-bg__grid" />

      <div className="home-bg__map">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="rgba(127, 149, 139, 0.45)" strokeWidth="1.1">
            <path d="M120 420l90-72 52 18 67-52 60 19 58-34 50 10 66-36 68 24 66-46 84 27 76-18 79 12 62-30 51 18 48-28 64 24 68-25 52 18 94-48 40 17 58-32 44 18 89-38 51 14 80-30 67 18 70-28 59 11 63-18 72 38 63-41 84 26 92-22 70 26 90-47 42 20 61-17 56 22 62-24 49 16 83-28 46 17 64-12 72 20 78-32 49 20 78-26 60 17 52-9 36 31 17 18 33 8 44-6 66 14 81-16 55 8 30 25 16 12 35 11 46-15 82 14 59-14 76 12 20 17 40 6 18 25 38 9 36 21 56-12 66 18 41-5 48 21 49-6 46 16 36-14 46 26 54-19 67 28 23 32 13 39 88-30 71 32 59-12 15 30 32 9 31 41 56-2 25 26 49-7 22 31 13 32 66 10 36 17 25 43 41 10 79 36 44 9 52-12 32 22 37-14 44 18 72-34 54 10 69-26 86 18 46-8 46 24"
              opacity="0.8" />
            <path d="M258 334L290 355L332 345L354 362L395 348L444 379L476 366L507 385L549 371L591 394L645 372L695 401L743 382L795 392L854 366L904 390L950 374L1003 391L1066 372L1108 397L1154 385L1185 407L1237 398L1295 418L1340 410" opacity="0.7" />
            <path d="M190 525L252 505L319 528L375 512L425 541L487 522L554 548L600 534L650 560L716 548L770 564L840 548L910 574L967 559L1022 585L1092 568L1148 591L1201 576L1263 601L1341 592" opacity="0.7" />
          </g>
        </svg>
      </div>

      <div className="home-bg__glow home-bg__glow--left" />
      <div className="home-bg__glow home-bg__glow--center" />
      <div className="home-bg__radar home-bg__radar--one" />
      <div className="home-bg__radar home-bg__radar--two" />

      <div className="home-bg__chart home-bg__chart--one">
        <span />
      </div>
      <div className="home-bg__chart home-bg__chart--two">
        <span />
      </div>

      <div className="home-bg__connections" aria-hidden="true">
        <span className="home-bg__connection home-bg__connection--one" />
        <span className="home-bg__connection home-bg__connection--two" />
        <span className="home-bg__connection home-bg__connection--three" />
        <span className="home-bg__node home-bg__node--one" />
        <span className="home-bg__node home-bg__node--two" />
        <span className="home-bg__node home-bg__node--three" />
        <span className="home-bg__node home-bg__node--four" />
      </div>

      <div className="home-bg__particles">
        {particles.map((particle, index) => (
          <span
            key={`particle-${index}`}
            className="home-bg__particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HomeBackground
