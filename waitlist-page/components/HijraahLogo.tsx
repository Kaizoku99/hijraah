'use client'

import Image from 'next/image'
import { useState } from 'react'

interface HijraahLogoProps {
  width?: number
  height?: number
  className?: string
  showText?: boolean
}

export function HijraahLogo({ 
  width = 40, 
  height = 40, 
  className = "", 
  showText = false 
}: HijraahLogoProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    // Fallback elegant logo design if image fails to load
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div 
          className="relative bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold shadow-lg"
          style={{ 
            width, 
            height, 
            borderRadius: '50%',
            border: '2px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <span className="relative text-lg font-bold" style={{ fontSize: `${Math.max(width * 0.4, 12)}px` }}>ه</span>
        </div>
        {showText && (
          <div>
            <h1 className="text-lg font-bold text-white">هجرة</h1>
            <p className="text-xs text-gray-400">Hijraah</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative" style={{ width, height }}>
        <Image
          src="/hijraah-logo.png"
          alt="Hijraah - Arabic Immigration Consultant"
          fill
          className="object-contain filter drop-shadow-sm"
          onError={() => setImageError(true)}
          priority={width > 32}
          quality={90}
          sizes={`${width}px`}
        />
      </div>
      {showText && (
        <div>
          <h1 className="text-lg font-bold text-white">هجرة</h1>
          <p className="text-xs text-gray-400">Hijraah</p>
        </div>
      )}
    </div>
  )
}