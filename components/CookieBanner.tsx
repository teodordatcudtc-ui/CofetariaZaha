'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Settings, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useCookie } from '@/contexts/CookieContext'

const CookieBanner = () => {
  const { showBanner, acceptCookies, declineCookies, setShowBanner } = useCookie()
  const [showDetails, setShowDetails] = useState(false)

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Cookie className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Folosim Cookie-uri
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Folosim cookie-uri pentru a îmbunătăți experiența ta pe site, 
                pentru analiză și personalizare. Continuând să navighezi, 
                accepți folosirea cookie-urilor conform{' '}
                <Link 
                  href="/politica-cookie-uri" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  Politicii noastre de Cookie-uri
                </Link>.
              </p>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 rounded-lg p-4 mb-4"
                  >
                    <h4 className="font-medium text-gray-900 mb-3">Tipuri de Cookie-uri:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Cookie-uri Esențiale</p>
                          <p className="text-sm text-gray-600">
                            Necesare pentru funcționarea de bază a site-ului (autentificare, coș de cumpărături)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Cookie-uri de Analiză</p>
                          <p className="text-sm text-gray-600">
                            Ne ajută să înțelegem cum folosești site-ul pentru îmbunătățiri
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Cookie-uri de Marketing</p>
                          <p className="text-sm text-gray-600">
                            Pentru personalizarea conținutului și reclamelor relevante
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Settings className="h-4 w-4" />
                <span>Detalii</span>
              </button>
              
              <button
                onClick={declineCookies}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Resping
              </button>
              
              <button
                onClick={acceptCookies}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
              >
                Accept Toate
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CookieBanner
