'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { useNotification } from '@/contexts/NotificationContext'
import { 
  ArrowLeft, 
  ArrowRight,
  Heart, 
  Star, 
  Clock, 
  Users, 
  Shield, 
  Truck,
  Calendar,
  MessageCircle,
  Leaf,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState({
    ingredients: false,
    features: false
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { addToCart } = useCart()
  const { showSuccess, showInfo } = useNotification()

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Funcții pentru calendar
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Zilele din luna precedentă
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month, -i)
      days.push({ date: prevMonth, isCurrentMonth: false })
    }
    
    // Zilele din luna curentă
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({ date: currentDate, isCurrentMonth: true })
    }
    
    // Zilele din luna următoare pentru a completa săptămâna
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = new Date(year, month + 1, day)
      days.push({ date: nextMonth, isCurrentMonth: false })
    }
    
    return days
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(formatDate(date))
    setShowCalendar(false)
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    const selected = new Date(selectedDate.split('.').reverse().join('-'))
    return date.toDateString() === selected.toDateString()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        selectedDate: selectedDate
      })
      showSuccess(
        'Produs adăugat!',
        `${product.name} a fost adăugat în coșul tău de cumpărături.`,
        3000
      )
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        selectedDate: selectedDate
      })
      showInfo(
        'Redirecționare...',
        'Te ducem la coșul de cumpărături pentru finalizarea comenzii.',
        2000
      )
      // Redirect to cart after notification
      setTimeout(() => {
        window.location.href = '/cos'
      }, 1000)
    }
  }

  // Date produse (în realitate ar veni din API)
  const products = {
    'tort-nunta-elegant': {
      id: 1,
      name: 'Tort de Nuntă Elegant',
      price: 800,
      originalPrice: 1000,
      category: 'Torturi',
      description: 'Tort cu 3 etaje, fondant alb și decorațiuni florale personalizate. Perfect pentru momentul cel mai special din viața voastră.',
      longDescription: 'Tortul nostru elegant de nuntă este o creație specială cu 3 etaje, fondant alb și decorațiuni florale personalizate. Pregătit cu ingrediente de cea mai bună calitate, acest tort va fi punctul culminant al petrecerii voastre de nuntă.',
      ingredients: ['Fondant alb de calitate superioară', 'Crema de vanilie', 'Fructe proaspete', 'Decorațiuni florale', 'Ciocolată belgiană'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-5 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'tort-aniversare': {
      id: 2,
      name: 'Tort de Aniversare',
      price: 300,
      originalPrice: 400,
      category: 'Torturi',
      description: 'Tort personalizat cu tematica aleasă de client. Perfect pentru a celebra momente speciale.',
      longDescription: 'Tortul nostru de aniversare este personalizat cu tematica aleasă de client. Pregătit cu ingrediente de cea mai bună calitate și decorat cu atenție la detalii.',
      ingredients: ['Fondant colorat', 'Crema de ciocolată', 'Fructe proaspete', 'Decoruri personalizate', 'Zahăr natural'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'tort-botez': {
      id: 3,
      name: 'Tort de Botez',
      price: 250,
      originalPrice: 350,
      category: 'Torturi',
      description: 'Tort delicat cu decorațiuni pentru copii. Perfect pentru celebrarea botezului.',
      longDescription: 'Tortul nostru de botez este delicat și decorat special pentru copii. Pregătit cu ingrediente de cea mai bună calitate și decorat cu atenție la detalii.',
      ingredients: ['Fondant pastel', 'Crema de vanilie', 'Fructe proaspete', 'Decorațiuni pentru copii', 'Zahăr natural'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'ecler-crema-vanilie': {
      id: 4,
      name: 'Ecler cu Cremă de Vanilie',
      price: 8,
      originalPrice: 12,
      category: 'Prăjituri',
      description: 'Ecler clasic cu cremă de vanilie și glazură de ciocolată. Gustul tradițional francez.',
      longDescription: 'Eclerul nostru cu cremă de vanilie este preparat după rețeta tradițională franceză. Cu glazură de ciocolată și cremă de vanilie de calitate superioară.',
      ingredients: ['Făină organică', 'Ouă proaspete', 'Unt de calitate', 'Vanilie naturală', 'Ciocolată belgiană'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'profiterol-ciocolata': {
      id: 5,
      name: 'Profiterol cu Ciocolată',
      price: 10,
      originalPrice: 15,
      category: 'Prăjituri',
      description: 'Profiterol cu cremă de ciocolată și glazură de ciocolată. Delicat și savuros.',
      longDescription: 'Profiterolul nostru cu ciocolată este preparat cu cremă de ciocolată de calitate superioară și glazură de ciocolată. Perfect pentru iubitorii de ciocolată.',
      ingredients: ['Făină organică', 'Ouă proaspete', 'Unt de calitate', 'Ciocolată belgiană', 'Zahăr natural'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'tiramisu-clasic': {
      id: 6,
      name: 'Tiramisu Clasic',
      price: 12,
      originalPrice: 18,
      category: 'Prăjituri',
      description: 'Tiramisu preparat după rețeta tradițională italiană. Gustul autentic al Italiei.',
      longDescription: 'Tiramisu-ul nostru clasic este preparat după rețeta tradițională italiană, cu mascarpone de calitate superioară și cafea aromată.',
      ingredients: ['Mascarpone italian', 'Cafea aromată', 'Ouă proaspete', 'Zahăr natural', 'Cacao de calitate'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'papanasi-smantana': {
      id: 7,
      name: 'Papanași cu Smântână',
      price: 15,
      originalPrice: 22,
      category: 'Dulciuri',
      description: 'Papanași tradiționali cu smântână și dulceață de fructe. Gustul autentic românesc.',
      longDescription: 'Papanașii noștri tradiționali sunt preparați cu smântână de casă și dulceață de fructe naturale. Gustul autentic al României în fiecare înghițitură.',
      ingredients: ['Făină organică', 'Smântână de casă', 'Dulceață de fructe', 'Ouă proaspete', 'Zahăr natural'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'clatite-dulceata': {
      id: 8,
      name: 'Clătite cu Dulceață',
      price: 12,
      originalPrice: 18,
      category: 'Dulciuri',
      description: 'Clătite delicate cu dulceață de casă de prune. Gustul copilăriei.',
      longDescription: 'Clătitele noastre delicate sunt preparate cu dulceață de casă de prune, făcută după rețeta tradițională românească. Gustul copilăriei în fiecare înghițitură.',
      ingredients: ['Făină organică', 'Dulceață de prune de casă', 'Ouă proaspete', 'Lapte de calitate', 'Zahăr natural'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    'catering-evenimente': {
      id: 9,
      name: 'Catering Evenimente',
      price: 50,
      originalPrice: 70,
      category: 'Evenimente',
      description: 'Servicii complete de catering pentru evenimente speciale. Soluția perfectă pentru orice ocazie.',
      longDescription: 'Serviciile noastre complete de catering pentru evenimente speciale includ meniuri personalizate, servire profesională și atenție la detalii. Soluția perfectă pentru orice ocazie specială.',
      ingredients: ['Meniu personalizat', 'Ingrediente de calitate', 'Servire profesională', 'Atenție la detalii', 'Experiență în evenimente'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Servicii artizanale' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 1-2 săptămâni',
        pickup: 'Servicii la domiciliu'
      }
    }
  }

  const product = products[params.slug as keyof typeof products]

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Produsul nu a fost găsit</h1>
          <Link href="/produse" className="btn-primary">
            Înapoi la produse
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Acasă</Link>
            <span>/</span>
            <Link href="/produse" className="hover:text-primary">Produse</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagine produs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Imaginea principală */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden mx-4 h-64 sm:h-auto">
              {/* Placeholder pentru imagine */}
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
                <p className="text-primary/80">Imagine produs</p>
              </div>
            </div>
          </motion.div>

          {/* Informații produs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 px-4"
          >
            {/* Titlu și preț */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-primary">{product.price} RON</span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">{product.originalPrice} RON</span>
                )}
              </div>
            </div>

            {/* Butoane acțiune */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  Adaugă în coș
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Cumpără acum
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Mai multe opțiuni de plată
              </p>
            </div>

            {/* Descriere */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descriere</h3>
              <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Data livrării */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alege data livrării cu atenție
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Ne ocupăm personal fiecare comandă pentru ca tu să o primești la momentul ideal.
              </p>
              <div className="relative">
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedDate || 'Selectează data'}
                    </span>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showCalendar ? 'rotate-90' : ''}`} />
                </button>

                {/* Calendar personalizat */}
                {showCalendar && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4"
                  >
                    {/* Header calendar */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                      </button>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentMonth.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Zilele săptămânii */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                        <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Zilele calendarului */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((day, index) => {
                        const isDisabled = isDateDisabled(day.date)
                        const isSelected = isDateSelected(day.date)
                        const isToday = day.date.toDateString() === new Date().toDateString()
                        
                        return (
                          <button
                            key={index}
                            onClick={() => !isDisabled && handleDateSelect(day.date)}
                            disabled={isDisabled}
                            className={`
                              h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200
                              ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                              ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary/10 cursor-pointer'}
                              ${isSelected ? 'bg-primary text-white shadow-lg' : ''}
                              ${isToday && !isSelected ? 'bg-primary/20 text-primary font-semibold' : ''}
                              ${!isDisabled && !isSelected && day.isCurrentMonth ? 'hover:bg-primary/5' : ''}
                            `}
                          >
                            {day.date.getDate()}
                          </button>
                        )
                      })}
                    </div>

                    {/* Buton închidere */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setShowCalendar(false)}
                        className="w-full text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                      >
                        Închide
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Cantitate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantitate</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>


            {/* Taxe și transport */}
            <div className="text-sm text-gray-500">
              <p>Taxe incluse. Transportul este calculat la checkout.</p>
            </div>

            {/* Ingrediente - Expandabil */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleSection('ingredients')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">Ingrediente</h3>
                <motion.div
                  animate={{ rotate: expandedSections.ingredients ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedSections.ingredients ? 'auto' : 0,
                  opacity: expandedSections.ingredients ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Caracteristici - Expandabil */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">Caracteristici</h3>
                <motion.div
                  animate={{ rotate: expandedSections.features ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedSections.features ? 'auto' : 0,
                  opacity: expandedSections.features ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <feature.icon className="h-5 w-5 text-primary mr-3" />
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Informații livrare */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informații livrare</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Zona:</strong> {product.delivery.area}</p>
                <p><strong>Timp preparare:</strong> {product.delivery.time}</p>
                <p><strong>Ridicare:</strong> {product.delivery.pickup}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Buton înapoi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/produse"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la produse
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductPage
