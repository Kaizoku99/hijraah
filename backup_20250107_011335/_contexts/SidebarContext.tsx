'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { getCookie, setCookie } from 'cookies-next'

interface SidebarContextType {
  isOpen: boolean
  isPinned: boolean
  isHovered: boolean
  toggleSidebar: () => void
  togglePin: () => void
  setIsHovered: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setMounted(true)
    const pinnedState = getCookie('sidebarPinned') === 'true'
    setIsPinned(pinnedState)
    setIsOpen(pinnedState)
  }, [isMobile])

  const toggleSidebar = () => {
    if (!mounted) return
    const newState = !isOpen
    setIsOpen(newState)
    if (newState) {
      setIsPinned(true)
      setCookie('sidebarPinned', 'true')
    }
  }

  const togglePin = () => {
    if (!mounted) return
    const newPinnedState = !isPinned
    setIsPinned(newPinnedState)
    setCookie('sidebarPinned', newPinnedState.toString())
    setIsOpen(newPinnedState)
  }

  return (
    <SidebarContext.Provider
      value={{
        isOpen: mounted ? isOpen : false,
        isPinned: mounted ? isPinned : false,
        isHovered,
        toggleSidebar,
        togglePin,
        setIsHovered: (value: boolean) => {
          setIsHovered(value)
          if (!isPinned) {
            setIsOpen(value)
          }
        },
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
} 