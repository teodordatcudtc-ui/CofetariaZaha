'use client'

import { useState, useEffect } from 'react'
import { Clock, Phone, Facebook, Instagram } from 'lucide-react'

const TopBar = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const messages = [
    {
      icon: Clock,
      text: 'Luni - Sâmbătă: 08:00 - 20:00 | Duminică: 09:00 - 18:00'
    },
    {
      icon: Phone,
      text: 'Contact: 0731 195 126'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 10000) // Schimbă la fiecare 10 secunde

    return () => clearInterval(interval)
  }, [messages.length])

  const CurrentIcon = messages[currentMessage].icon

  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="container-custom flex items-center justify-center sm:justify-between text-sm">
        {/* Animated Message */}
        <div className="flex items-center space-x-2 transition-all duration-500 ease-in-out">
          <CurrentIcon className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-300" />
          <span className="text-xs sm:text-sm transition-opacity duration-500">
            {messages[currentMessage].text}
          </span>
        </div>

        {/* Social Media Links - Hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href="https://www.facebook.com/profile.php?id=100058296618834"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white/80 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </a>
          
          <a
            href="https://www.instagram.com/cofetariazaha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white/80 transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar