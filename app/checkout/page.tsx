'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  CreditCard,
  User,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useNotification } from '@/contexts/NotificationContext'

interface CheckoutFormData {
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  observations: string
}

const CheckoutPage = () => {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { showSuccess, showError } = useNotification()
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    observations: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({})
  const [checkoutOptions, setCheckoutOptions] = useState<any>(null)

  // Încarcă opțiunile de checkout din localStorage
  useEffect(() => {
    const savedOptions = localStorage.getItem('checkoutOptions')
    if (savedOptions) {
      setCheckoutOptions(JSON.parse(savedOptions))
    } else {
      // Dacă nu există opțiuni, redirect către steps
      router.push('/checkout/steps')
    }
  }, [router])

  // Validare formular
  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prenumele este obligatoriu'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Numele este obligatoriu'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Numărul de telefon este obligatoriu'
    } else if (!/^(\+40|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numărul de telefon nu este valid'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Adresa este obligatorie'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Orașul este obligatoriu'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Procesare comandă prin WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showError('Formularul conține erori', 'Vă rugăm să corectați toate câmpurile obligatorii.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Generare număr comandă
      const orderNumber = `CMD-${Date.now()}`
      
      // Pregătire mesaj pentru WhatsApp
      const orderDetails = items.map(item => 
        `• ${item.name} x${item.quantity} - ${item.price * item.quantity} RON`
      ).join('\n')
      
      // Obține metodele selectate
      const deliveryMethod = checkoutOptions?.deliveryMethod === 'pickup' ? 'Ridicare din magazin' : 'Livrare la domiciliu'
      const paymentMethod = checkoutOptions?.paymentMethod === 'cash' ? 'Numerar' : 'Card bancar'
      
      const whatsappMessage = `🍰 *COMANDA NOUĂ ${orderNumber}*

👤 *Client:* ${formData.firstName} ${formData.lastName}
📱 *Telefon:* ${formData.phone}
📍 *Adresă:* ${formData.address}, ${formData.city}
🚚 *Livrare:* ${deliveryMethod}
💳 *Plată:* ${paymentMethod}
💰 *Total:* ${getTotalPrice()} RON

🛒 *Produse comandate:*
${orderDetails}

📝 *Observații:* ${formData.observations || 'Niciuna'}

⏰ *Data comenzii:* ${new Date().toLocaleString('ro-RO')}

---
Vă rugăm să confirmați comanda și să stabiliți ora de livrare.`

      // Copiază mesajul în clipboard automat
      try {
        await navigator.clipboard.writeText(whatsappMessage)
        console.log('Mesajul a fost copiat în clipboard')
      } catch (err) {
        console.log('Clipboard API nu este disponibil:', err)
      }

      // Codificare mesaj pentru URL
      const encodedMessage = encodeURIComponent(whatsappMessage)
      
      // Deschidere WhatsApp Web cu mesajul precompletat
      const whatsappUrl = `https://wa.me/40762444577?text=${encodedMessage}`
      
      // Salvare date comandă pentru confirmare
      const orderData = {
        orderNumber,
        customerInfo: formData,
        items: items,
        total: getTotalPrice(),
        timestamp: new Date().toISOString(),
        whatsappUrl,
        deliveryMethod,
        paymentMethod,
        messageText: whatsappMessage
      }
      
      // Salvare în localStorage pentru pagina de confirmare
      localStorage.setItem('lastOrder', JSON.stringify(orderData))
      
      // Golire coș
      clearCart()
      
      // Deschidere WhatsApp în fereastră nouă
      window.open(whatsappUrl, '_blank')
      
      // Redirect către confirmare după scurt delay
      setTimeout(() => {
        router.push('/checkout/success')
      }, 1000)
      
    } catch (error) {
      console.error('Eroare la procesarea comenzii:', error)
      showError('Eroare la procesarea comenzii', 'Vă rugăm să încercați din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Șterge eroarea pentru câmpul modificat
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
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
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Coșul este gol</h1>
              <p className="text-xl text-gray-600 mb-8">
                Nu aveți produse în coș pentru a finaliza comanda
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
              Datele tale
            </h1>
            <p className="text-sm sm:text-xl text-gray-600">
              Pasul 2: Completează datele pentru livrare și confirmă comanda
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formular checkout */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 text-primary mr-3" />
                Datele tale
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nume și Prenume */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prenume *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Introdu prenumele"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Introdu numele"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Număr de telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: 0712345678 sau +40712345678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Adresă */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Adresă completă *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Strada, numărul, blocul, scara, etajul, apartamentul"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Oraș */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oraș *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: București"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Observații */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Observații (opțional)
                  </label>
                  <textarea
                    value={formData.observations}
                    onChange={(e) => handleInputChange('observations', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Instrucțiuni speciale pentru livrare, alergii, preferințe..."
                  />
                </div>

                {/* Butoane navigare */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/checkout/steps"
                    className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Înapoi</span>
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Se deschide WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span>Finalizează comanda</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
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
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Comandă trimisă prin WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Veți fi contactați pentru confirmare</span>
                </div>
              </div>

              {/* Link către coș */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  href="/cos"
                  className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Înapoi la coș</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
