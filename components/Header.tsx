'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Cake, ChevronDown, Heart, Star, Coffee, Gift, ShoppingCart, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/contexts/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { getTotalItems } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/produse?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      if (isSearchOpen && !target.closest('.search-dropdown') && !target.closest('button[aria-label="Search"]')) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  const navigation = [
    { name: 'Acasă', href: '/' },
    { name: 'Produse', href: '/produse', hasDropdown: true },
    { name: 'Despre Noi', href: '/despre' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Contact', href: '/contact' },
  ]

  // Categorii de produse pentru dropdown
  const productCategories = [
    {
      name: 'Torturi Personalizate',
      href: '/produse?category=torturi',
      icon: Cake,
      description: 'Torturi de nuntă, botez, aniversare'
    },
    {
      name: 'Prăjituri Artizanale',
      href: '/produse?category=prajituri',
      icon: Heart,
      description: 'Ecler, tiramisu, papanași'
    },
    {
      name: 'Fără zahăr / Green Sugar',
      href: '/produse?category=fara-zahar-green-sugar',
      icon: Star,
      description: 'Produse fără zahăr cu Green Sugar'
    },
    {
      name: 'Dulciuri de Casă',
      href: '/produse?category=dulciuri',
      icon: Star,
      description: 'Clătite, gogoși, cozonac'
    },
    {
      name: 'Catering Evenimente',
      href: '/produse?category=evenimente',
      icon: Coffee,
      description: 'Servicii complete pentru evenimente'
    }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg' 
          : 'top-10 bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Cake className="h-8 w-8 text-primary" />
              <motion.div
                className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-3xl font-bold text-gradient group-hover:scale-105 transition-transform duration-200 font-dancing">
              Cofetăria Zaha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group ${
                        isActive(item.href) 
                          ? 'text-primary' 
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.name}
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isProductsDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-primary ${
                          isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isProductsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.1 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                        >
                          <div className="p-2">
                            {productCategories.map((category, index) => (
                              <motion.div
                                key={category.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                              >
                                <Link
                                  href={category.href}
                                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group"
                                  onClick={() => setIsProductsDropdownOpen(false)}
                                >
                                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                    <category.icon className="h-5 w-5 text-primary group-hover:text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                                      {category.name}
                                      {category.name === 'Fără zahăr / Green Sugar' && (
                                        <span className="ml-2 text-green-500 font-bold text-xs">●</span>
                                      )}
                                    </p>
                                    <p className="text-xs text-gray-500 group-hover:text-primary/70 transition-colors duration-200">
                                      {category.description}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                            <Link
                              href="/produse"
                              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex items-center justify-center"
                              onClick={() => setIsProductsDropdownOpen(false)}
                            >
                              Vezi toate produsele
                              <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group ${
                      isActive(item.href) 
                        ? 'text-primary' 
                        : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.name}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary ${
                        isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info, Search & Cart - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <a 
              href="tel:0731195126" 
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <span>📞</span>
              <span>0731 195 126</span>
            </a>
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
              <span>Caută</span>
            </button>
            
            {/* Cart Button */}
            <Link
              href="/cos"
              className="relative flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Coș</span>
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Cart Button - Mobile */}
            <Link
              href="/cos"
              className="relative p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                            isActive(item.href) 
                              ? 'text-primary bg-primary/10' 
                              : 'text-gray-700'
                          }`}
                        >
                          {item.name}
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isMobileProductsOpen ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileProductsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pl-6 space-y-1">
                                {productCategories.map((category, catIndex) => (
                                  <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: catIndex * 0.05 }}
                                  >
                                    <Link
                                      href={category.href}
                                      onClick={() => {
                                        setIsMenuOpen(false)
                                        setIsMobileProductsOpen(false)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                                    >
                                      <category.icon className="h-4 w-4 mr-3 text-primary" />
                                      <div>
                                        <p className="font-medium">
                                          {category.name}
                                          {category.name === 'Fără zahăr / Green Sugar' && (
                                            <span className="ml-2 text-green-500 font-bold text-xs">●</span>
                                          )}
                                        </p>
                                        <p className="text-xs text-gray-500">{category.description}</p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: productCategories.length * 0.05 }}
                                  className="pt-2"
                                >
                                  <Link
                                    href="/produse"
                                    onClick={() => {
                                      setIsMenuOpen(false)
                                      setIsMobileProductsOpen(false)
                                    }}
                                    className="flex items-center px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                                  >
                                    Vezi toate produsele
                                    <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                                  </Link>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                          isActive(item.href) 
                            ? 'text-primary bg-primary/10' 
                            : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="px-4 py-3 border-t border-gray-200 space-y-3">
                  {/* Cart Button - Mobile */}
                  <Link
                    href="/cos"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between text-primary font-medium hover:underline"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Coș de cumpărături</span>
                    </div>
                    {getTotalItems() > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                  
                  <a 
                    href="tel:0731195126" 
                    className="flex items-center space-x-2 text-primary font-medium hover:underline"
                  >
                    <span>📞</span>
                    <span>0731 195 126</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 search-dropdown"
            >
              <div className="p-4">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Caută produse..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    Caută
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header
