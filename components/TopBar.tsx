'use client'

import { Clock, Facebook, Instagram } from 'lucide-react'

const TopBar = () => {
  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="container-custom flex items-center justify-between text-sm">
        {/* Program */}
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-white" />
          <span>Luni - Sâmbătă: 08:00 - 20:00 | Duminică: 09:00 - 18:00</span>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.facebook.com/profile.php?id=100058296618834"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white/80 transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>
          
          <a
            href="https://www.instagram.com/cofetariazaha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white/80 transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
