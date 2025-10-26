'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CheckCircle, 
  Phone, 
  MapPin, 
  Calendar,
  Package,
  ArrowRight,
  Home,
  ShoppingBag
} from 'lucide-react'

interface OrderData {
  orderNumber: string
  customerInfo: {
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    observations: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category: string
  }>
  total: number
  timestamp: string
  whatsappUrl?: string
  deliveryMethod?: string
  paymentMethod?: string
  messageText?: string
}

const CheckoutSuccessPage = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Încarcă datele comenzii din localStorage
    const savedOrder = localStorage.getItem('lastOrder')
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder))
    }
    setIsLoading(false)
  }, [])

  const copyMessage = async () => {
    if (orderData?.messageText) {
      try {
        await navigator.clipboard.writeText(orderData.messageText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.log('Clipboard API nu este disponibil:', err)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!orderData) {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Comandă nu găsită</h1>
              <p className="text-xl text-gray-600 mb-8">
                Nu am putut găsi detaliile comenzii dumneavoastră.
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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative py-4 sm:py-8 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comandă confirmată!
            </h1>
            <p className="text-sm sm:text-xl text-gray-600 mb-4">
              Comanda dumneavoastră a fost procesată cu succes
            </p>
            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg inline-block">
              <span className="font-semibold">Număr comandă: {orderData.orderNumber}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detalii comandă */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informații client */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                Informații client
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nume complet</p>
                  <p className="font-semibold text-gray-900">
                    {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telefon</p>
                  <p className="font-semibold text-gray-900">{orderData.customerInfo.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Adresă de livrare</p>
                  <p className="font-semibold text-gray-900">
                    {orderData.customerInfo.address}, {orderData.customerInfo.city}
                  </p>
                </div>
                {orderData.customerInfo.observations && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Observații</p>
                    <p className="font-semibold text-gray-900">{orderData.customerInfo.observations}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Metoda de livrare</p>
                  <p className="font-semibold text-gray-900">{orderData.deliveryMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Metoda de plată</p>
                  <p className="font-semibold text-gray-900">{orderData.paymentMethod}</p>
                </div>
              </div>
            </motion.div>

            {/* Produse comandate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 text-primary mr-3" />
                Produse comandate
              </h2>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {item.price * item.quantity} RON
                      </p>
                      <p className="text-sm text-gray-600">Cantitate: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Informații livrare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-green-50 rounded-xl p-6 border border-green-200"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Comanda trimisă prin WhatsApp
              </h3>
              <div className="space-y-2 text-green-800">
                <p>• Mesajul a fost copiat automat în clipboard</p>
                <p>• WhatsApp s-a deschis cu mesajul precompletat</p>
                <p>• Doar apasă "Send" pentru a trimite comanda</p>
                <p>• Veți fi contactați în cel mult 30 de minute pentru confirmare</p>
                <p>• Comanda va fi pregătită în funcție de disponibilitatea produselor</p>
                <p>• Livrarea se face gratuit în București</p>
              </div>
              <div className="mt-4 space-y-3">
                {orderData?.whatsappUrl && (
                  <a
                    href={orderData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Deschide WhatsApp din nou</span>
                  </a>
                )}
                
                <button
                  onClick={copyMessage}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    copied 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? 'Copiat!' : 'Copiază mesajul din nou'}</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sumar și acțiuni */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sumar comandă</h2>

              {/* Detalii preț */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({orderData.items.length} {orderData.items.length === 1 ? 'produs' : 'produse'})</span>
                  <span>{orderData.total} RON</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transport</span>
                  <span className="text-green-600">Gratuit</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{orderData.total} RON</span>
                  </div>
                </div>
              </div>

              {/* Data comenzii */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Data comenzii</p>
                <p className="font-semibold text-gray-900">{formatDate(orderData.timestamp)}</p>
              </div>

              {/* Acțiuni */}
              <div className="space-y-3">
                <Link
                  href="/produse"
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Comandă din nou</span>
                </Link>
                
                <Link
                  href="/"
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Acasă</span>
                </Link>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Ai întrebări?</p>
                <a
                  href="tel:0731195126"
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  0731 195 126
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage
