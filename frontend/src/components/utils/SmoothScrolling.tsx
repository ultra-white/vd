'use client'
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 1, duration: 0.8 }}>
      {children}
    </ReactLenis>
  )
}

export default SmoothScrolling
