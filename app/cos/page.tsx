'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  CreditCard,
  Truck,
  Shield,
  Heart
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useNotification } from '@/contexts/NotificationContext'

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { showSuccess, showInfo } = useNotification()

  const handleCheckout = () => {
    setIsCheckingOut(true)
    showInfo(
      'Se procesează comanda...',
      'Vă rugăm să așteptați în timp ce procesăm comanda dumneavoastră.',
      2000
    )
    // Simulare procesare comandă
    setTimeout(() => {
      showSuccess(
        'Comandă procesată!',
        'Comanda a fost procesată cu succes! Veți fi contactați pentru confirmarea detaliilor.',
        5000
      )
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Coșul tău este gol</h1>
              <p className="text-xl text-gray-600 mb-8">
                Adaugă produse delicioase în coș pentru a începe comanda
              </p>
              <Link
                href="/produse"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                <span>Vezi produsele</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Coșul de cumpărături</h1>
            <p className="text-xl text-gray-600">
              {getTotalItems()} {getTotalItems() === 1 ? 'produs' : 'produse'} în coș
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista produselor */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    {/* Imagine produs */}
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>

                    {/* Informații produs */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.category}
                      </p>
                      {item.selectedDate && (
                        <p className="text-xs text-primary font-medium">
                          Data livrare: {item.selectedDate}
                        </p>
                      )}
                    </div>

                    {/* Preț și cantitate */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary mb-2">
                        {item.price} RON
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {item.originalPrice} RON
                          </span>
                        )}
                      </div>

                      {/* Controale cantitate */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1)
                            if (item.quantity === 1) {
                              showInfo(
                                'Produs eliminat',
                                `${item.name} a fost eliminat din coș.`,
                                2000
                              )
                            }
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1)
                            showInfo(
                              'Cantitate actualizată',
                              `Cantitatea pentru ${item.name} a fost mărită.`,
                              1500
                            )
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Buton ștergere */}
                    <button
                      onClick={() => {
                        removeFromCart(item.id)
                        showInfo(
                          'Produs eliminat',
                          `${item.name} a fost eliminat din coș.`,
                          2000
                        )
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buton golire coș */}
            <div className="mt-6">
              <button
                onClick={() => {
                  clearCart()
                  showInfo(
                    'Coș golit',
                    'Toate produsele au fost eliminate din coș.',
                    2000
                  )
                }}
                className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Șterge toate produsele
              </button>
            </div>
          </div>

          {/* Sumar comandă */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sumar comandă</h2>

              {/* Detalii preț */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'produs' : 'produse'})</span>
                  <span>{getTotalPrice()} RON</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transport</span>
                  <span className="text-green-600">Gratuit</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{getTotalPrice()} RON</span>
                  </div>
                </div>
              </div>

              {/* Buton checkout */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Se procesează...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Finalizează comanda</span>
                  </>
                )}
              </button>

              {/* Informații suplimentare */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Plăți securizate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Livrare gratuită</span>
                </div>
              </div>

              {/* Link către produse */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/produse"
                  className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Continuă cumpărăturile</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
