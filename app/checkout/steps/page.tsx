'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ArrowRight,
  ShoppingBag,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  Truck,
  Home
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

const CheckoutStepsPage = () => {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems } = useCart()
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const deliveryMethods = [
    {
      id: 'pickup',
      name: 'Ridicare din magazin',
      description: 'Ridicați comanda direct din cofetărie',
      icon: Home,
      price: 'Gratuit',
      time: 'Imediat'
    },
    {
      id: 'delivery',
      name: 'Livrare la domiciliu',
      description: 'Livrăm comanda la adresa specificată',
      icon: Truck,
      price: 'Gratuit',
      time: 'În aceeași zi'
    }
  ]

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Numerar',
      description: 'Plătiți cu numerar la livrare/ridicare',
      icon: CreditCard
    },
    {
      id: 'card',
      name: 'Card bancar',
      description: 'Plătiți cu cardul la livrare/ridicare',
      icon: CreditCard
    }
  ]

  const handleNextStep = () => {
    if (!selectedDeliveryMethod || !selectedPaymentMethod) {
      alert('Vă rugăm să selectați metoda de livrare și plata')
      return
    }
    
    // Salvare opțiuni în localStorage
    const checkoutOptions = {
      deliveryMethod: selectedDeliveryMethod,
      paymentMethod: selectedPaymentMethod,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('checkoutOptions', JSON.stringify(checkoutOptions))
    
    // Redirect către formularul de date
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <section className="relative py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Coșul este gol</h1>
              <p className="text-xl text-gray-600 mb-8">
                Nu aveți produse în coș pentru a finaliza comanda
              </p>
              <Link
                href="/produse"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                <span>Vezi produsele</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative py-4 sm:py-8 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Finalizează comanda
            </h1>
            <p className="text-sm sm:text-xl text-gray-600">
              Pasul 1: Selectează metoda de livrare și plata
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Opțiuni de livrare și plată */}
          <div className="lg:col-span-2 space-y-8">
            {/* Metode de livrare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Truck className="h-5 w-5 text-primary mr-3" />
                Metoda de livrare
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveryMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedDeliveryMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDeliveryMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <method.icon className={`h-6 w-6 mt-1 ${
                        selectedDeliveryMethod === method.id ? 'text-primary' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{method.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">{method.price}</span>
                          <span className="text-gray-500">{method.time}</span>
                        </div>
                      </div>
                      {selectedDeliveryMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metode de plată */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-5 w-5 text-primary mr-3" />
                Metoda de plată
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPaymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <method.icon className={`h-6 w-6 mt-1 ${
                        selectedPaymentMethod === method.id ? 'text-primary' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Butoane navigare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/cos"
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Înapoi la coș</span>
              </Link>
              
              <button
                onClick={handleNextStep}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Următorul pas</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Sumar comandă */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sumar comandă</h2>

              {/* Lista produselor */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Cantitate: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">
                      {item.price * item.quantity} RON
                    </p>
                  </div>
                ))}
              </div>

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

              {/* Informații suplimentare */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Procesare rapidă</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Livrare gratuită</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutStepsPage
