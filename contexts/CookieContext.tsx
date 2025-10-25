'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CookieContextType {
  cookiesAccepted: boolean | null
  acceptCookies: () => void
  declineCookies: () => void
  showBanner: boolean
  setShowBanner: (show: boolean) => void
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

export const useCookie = () => {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider')
  }
  return context
}

interface CookieProviderProps {
  children: ReactNode
}

export const CookieProvider = ({ children }: CookieProviderProps) => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  // Load cookie preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('cookie-consent')
    if (savedPreference === null) {
      // No preference saved, show banner
      setShowBanner(true)
    } else {
      setCookiesAccepted(savedPreference === 'accepted')
      setShowBanner(false)
    }
  }, [])

  const acceptCookies = () => {
    setCookiesAccepted(true)
    setShowBanner(false)
    localStorage.setItem('cookie-consent', 'accepted')
    
    // Set actual cookies for functionality
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    
    // Essential cookies
    document.cookie = `cookie-consent=accepted; expires=${expirationDate.toUTCString()}; path=/`
    
    // Analytics cookies (example - replace with your analytics)
    document.cookie = `analytics-enabled=true; expires=${expirationDate.toUTCString()}; path=/`
    
    // Marketing cookies (example)
    document.cookie = `marketing-enabled=true; expires=${expirationDate.toUTCString()}; path=/`
  }

  const declineCookies = () => {
    setCookiesAccepted(false)
    setShowBanner(false)
    localStorage.setItem('cookie-consent', 'declined')
    
    // Only set essential cookies
    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    document.cookie = `cookie-consent=declined; expires=${expirationDate.toUTCString()}; path=/`
  }

  const value = {
    cookiesAccepted,
    acceptCookies,
    declineCookies,
    showBanner,
    setShowBanner
  }

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  )
}
