import { useId } from 'react'

function RealisticChart({ values, positive, height = 40 }) {
  const gradientId = useId().replace(/:/g, '-')
  const safeValues = values && values.length > 0 ? values : [50, 52, 48, 54, 56, 55, 60]
  const max = Math.max(...safeValues)
  const min = Math.min(...safeValues)
  const range = max - min || 1

  const points = safeValues
    .map((value, index) => {
      const x = (index / (safeValues.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  // Create area chart with gradient
  const areaPoints = `0,100 ${points} 100,100`

  return (
    <svg 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none" 
      className="w-full"
      style={{ height: `${height}px` }}
    >
      <defs>
        <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={positive ? '#58E65B' : '#ff6b6b'} stopOpacity="0.35" />
          <stop offset="100%" stopColor={positive ? '#58E65B' : '#ff6b6b'} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      
      {/* Area fill */}
      <polygon
        points={areaPoints}
        fill={`url(#grad-${gradientId})`}
      />
      
      {/* Line chart */}
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#58E65B' : '#ff6b6b'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      
      {/* Data points */}
      {safeValues.map((value, index) => {
        const x = (index / (safeValues.length - 1)) * 100
        const y = 100 - ((value - min) / range) * 100
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1.5"
            fill={positive ? '#58E65B' : '#ff6b6b'}
            opacity={index === safeValues.length - 1 ? 1 : 0.5}
          />
        )
      })}
    </svg>
  )
}

export default RealisticChart

