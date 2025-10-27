'use client'

import { useState, useEffect } from 'react'
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
  MessageCircle, 
  Leaf, 
  Lock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Calendar,
  ShoppingCart,
  Phone,
  Sparkles
} from 'lucide-react'

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [selectedFlavor, setSelectedFlavor] = useState<string>('')
  const [expandedSections, setExpandedSections] = useState({
    ingredients: false,
    features: false
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const { addToCart } = useCart()
  const { showSuccess, showInfo } = useNotification()

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Funcții pentru galeria de imagini
  const getProductImages = (slug: string) => {
    const productData = products[slug as keyof typeof products]
    
    // Verifică dacă produsul are imagini definite în câmpul images
    if (productData && (productData as any).images && Array.isArray((productData as any).images)) {
      return (productData as any).images
    }
    
    // Dacă nu, folosește logica default
    const galleryProducts = ['tort-trois-chocolat', 'tort-maria']
    if (galleryProducts.includes(slug)) {
      return [
        `/images/products/${slug}.jpg`,
        `/images/products/${slug}-slice.jpg`
      ]
    }
    return [`/images/products/${slug}.jpg`]
  }

  const nextImage = () => {
    const images = getProductImages(params.slug)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    const images = getProductImages(params.slug)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    }
    if (isRightSwipe) {
      prevImage()
    }
  }

  // Funcții pentru calendar
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('ro-RO', {
      month: 'long',
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
      // Adaugă produsul cu cantitatea selectată
      for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: Array.isArray(product.category) ? product.category[0] : product.category,
        selectedDate: selectedDate
      })
      }
      showSuccess(
        'Produs adăugat!',
        `${product.name} x${quantity} ${quantity === 1 ? 'bucată' : 'bucăți'} a fost adăugat în coșul tău de cumpărături.`,
        3000
      )
    }
  }

  const handleBuyNow = () => {
    if (product) {
      // Adaugă produsul cu cantitatea selectată
      for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: Array.isArray(product.category) ? product.category[0] : product.category,
        selectedDate: selectedDate
      })
      }
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

  // Date produse reale
  const products = {
    // Brownie Fistic
    'brownie-fistic': {
      id: 1,
      name: 'Brownie Fistic',
      price: 33,
      originalPrice: 33,
      category: 'prajituri',
      description: 'Brownie cu fistic - o combinație perfectă de ciocolată și fistic.',
      longDescription: 'Brownie-ul nostru cu fistic este preparat cu făină integrală, ouă, zahăr, unt, ciocolată, merișoare, pastă pură de fistic și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină integrală', 'Ouă', 'Zahăr', 'Unt', 'Ciocolată', 'Merișoare', 'Pastă pură de fistic', 'Gelatină'],
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
    
    // Saleuri
    'saleuri': {
      id: 2,
      name: 'Saleuri',
      price: 206,
      originalPrice: 206,
      category: 'fursecuri',
      description: 'Saleuri tradiționale cu semințe și condimente.',
      longDescription: 'Saleurile noastre tradiționale sunt preparate cu făină, unt, telemea, semințe, chimen, susan, mac, susan negru, in și ou. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Telemea', 'Semințe', 'Chimen', 'Susan', 'Mac', 'Susan negru', 'In', 'Ou'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '250g',
          name: 'Saleuri 250g',
          price: 51,
          servings: '250g'
        },
        {
          id: '500g',
          name: 'Saleuri 500g',
          price: 103,
          servings: '500g'
        },
        {
          id: '750g',
          name: 'Saleuri 750g',
          price: 154,
          servings: '750g'
        },
        {
          id: '1kg',
          name: 'Saleuri 1kg',
          price: 206,
          servings: '1kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Poale'n Brau
    'poale-n-brau': {
      id: 3,
      name: 'Poale\'n Brau',
      price: 19,
      originalPrice: 19,
      category: 'cozonac-chec',
      description: 'Poale\'n Brau tradiționale cu brânză și stafide.',
      longDescription: 'Poale\'n Brau-urile noastre tradiționale sunt preparate cu făină, zahăr, ouă, brânză, lapte, stafide, drojdie, rom, sare, coajă de lămâie și portocală. Gustul autentic românesc.',
      ingredients: ['Făină', 'Zahăr', 'Ouă', 'Brânză', 'Lapte', 'Stafide', 'Drojdie', 'Rom', 'Sare', 'Coajă de lămâie', 'Portocală'],
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
    
    // Rulouri
    'rulouri': {
      id: 4,
      name: 'Rulouri',
      price: 25,
      originalPrice: 25,
      category: 'prajituri',
      description: 'Rulouri delicate cu fistic, arahide și alune.',
      longDescription: 'Rulourile noastre delicate sunt preparate cu făină, unt, gălbenuș, sare, zahăr, lapte, vanilie păstaie, amidon, fistic, arahide și alune. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Gălbenuș', 'Sare', 'Zahăr', 'Lapte', 'Vanilie păstaie', 'Amidon', 'Fistic', 'Arahide', 'Alune'],
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
    
    // Strudel
    'strudel': {
      id: 5,
      name: 'Strudel',
      price: 24,
      originalPrice: 24,
      category: 'prajituri',
      description: 'Strudel cu mere și arahide.',
      longDescription: 'Strudelul nostru cu mere și arahide este preparat cu făină, unt, sare, mere, arahide, ou și scorțișoară. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Sare', 'Mere', 'Arahide', 'Ou', 'Scorțișoară'],
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
    
    // Boema
    'boema': {
      id: 6,
      name: 'Boema',
      price: 31,
      originalPrice: 31,
      category: 'prajituri',
      description: 'Boema cu frișcă naturală și ciocolată.',
      longDescription: 'Boema noastră este preparată cu frișcă naturală, făină, ciocolată, ouă, ulei, unt, rom, cacao și praf de copt. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Frișcă naturală', 'Făină', 'Ciocolată', 'Ouă', 'Ulei', 'Unt', 'Rom', 'Cacao', 'Praf de copt'],
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
    
    // Cornulețe
    'cornulete-nuca-gem': {
      id: 7,
      name: 'Cornulețe',
      price: 196,
      originalPrice: 196,
      category: 'fursecuri',
      description: 'Cornulețe cu nucă și gem de fructe de pădure.',
      longDescription: 'Cornulețele noastre cu nucă și gem de fructe de pădure sunt preparate cu făină, unt, zahăr, gălbenuș, gem de fructe de pădure (magiun) și nucă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Gălbenuș', 'Gem de fructe de pădure (magiun)', 'Nucă'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '250g',
          name: 'Cornulețe 250g',
          price: 49,
          servings: '250g'
        },
        {
          id: '500g',
          name: 'Cornulețe 500g',
          price: 98,
          servings: '500g'
        },
        {
          id: '750g',
          name: 'Cornulețe 750g',
          price: 147,
          servings: '750g'
        },
        {
          id: '1kg',
          name: 'Cornulețe 1kg',
          price: 196,
          servings: '1kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Fursecuri
    'fursec-cu-gem': {
      id: 8,
      name: 'Fursecuri',
      price: 196,
      originalPrice: 196,
      category: 'fursecuri',
      description: 'Fursecuri cu gem de fructe de pădure.',
      longDescription: 'Fursecurii noștri cu gem de fructe de pădure sunt preparați cu făină, unt, zahăr, ouă și gem de fructe de pădure (magiun). O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Ouă', 'Gem de fructe de pădure (magiun)'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '250g',
          name: 'Fursecuri 250g',
          price: 49,
          servings: '250g'
        },
        {
          id: '500g',
          name: 'Fursecuri 500g',
          price: 98,
          servings: '500g'
        },
        {
          id: '750g',
          name: 'Fursecuri 750g',
          price: 147,
          servings: '750g'
        },
        {
          id: '1kg',
          name: 'Fursecuri 1kg',
          price: 196,
          servings: '1kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tiramisu Green Sugar
    'tiramisu-green-sugar': {
      id: 9,
      name: 'Tiramisu Green Sugar',
      price: 35,
      originalPrice: 35,
      category: 'fara-zahar-green-sugar',
      description: 'Tiramisu cu Green Sugar - o versiune modernă a clasicului.',
      longDescription: 'Tiramisu-ul nostru cu Green Sugar este preparat cu făină, Green Sugar, ouă, mascarpone, frișcă naturală, gelatină, cacao și cafea. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Green Sugar', 'Ouă', 'Mascarpone', 'Frișcă naturală', 'Gelatină', 'Cacao', 'Cafea'],
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
    
    // Amandina Green Sugar
    'amandina-green-sugar': {
      id: 10,
      name: 'Amandina Green Sugar',
      price: 39,
      originalPrice: 39,
      category: 'fara-zahar-green-sugar',
      description: 'Amandina cu Green Sugar - o versiune modernă a clasicului.',
      longDescription: 'Amandina noastră cu Green Sugar este preparată cu făină, cacao, ouă, Green Sugar, praf de copt, ulei, unt și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Cacao', 'Ouă', 'Green Sugar', 'Praf de copt', 'Ulei', 'Unt', 'Rom'],
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
    
    // Amandină
    'amandina': {
      id: 11,
      name: 'Amandină',
      price: 28,
      originalPrice: 28,
      category: 'prajituri',
      description: 'Amandină clasică cu fondant și cacao.',
      longDescription: 'Amandina noastră clasică este preparată cu unt, fondant, făină, zahăr, ouă, cacao și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Unt', 'Fondant', 'Făină', 'Zahăr', 'Ouă', 'Cacao', 'Rom'],
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
    
    // Tarte Mari
    'tarte-mari': {
      id: 13,
      name: 'Tarte Mari',
      price: 18,
      originalPrice: 18,
      category: 'prajituri',
      description: 'Tarte mari cu fructe mixte.',
      longDescription: 'Tarte-urile noastre mari cu fructe mixte sunt preparate cu lapte, făină, unt, gălbenuș, zahăr, fructe mixte, vanilie păstaie, gelatină și amidon de porumb. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Lapte', 'Făină', 'Unt', 'Gălbenuș', 'Zahăr', 'Fructe mixte', 'Vanilie păstaie', 'Gelatină', 'Amidon de porumb'],
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
    
    // Carrot Cake
    'carrot-cake': {
      id: 14,
      name: 'Carrot Cake',
      price: 189,
      originalPrice: 189,
      category: 'torturi',
      description: 'Carrot Cake cu morcov și nuci.',
      longDescription: 'Carrot Cake-ul nostru cu morcov și nuci este preparat cu făină, ouă, ulei, zahăr, morcov, nuci, scorțișoară, praf de copt și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ouă', 'Ulei', 'Zahăr', 'Morcov', 'Nuci', 'Scorțișoară', 'Praf de copt', 'Bicarbonat'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Carrot Cake 1kg',
          price: 189,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Carrot Cake 2kg',
          price: 378,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Carrot Cake 2.5kg',
          price: 472,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Trandafir
    'trandafir': {
      id: 15,
      name: 'Trandafir',
      price: 28,
      originalPrice: 28,
      category: 'prajituri',
      description: 'Trandafir cu miere și ciocolată albă.',
      longDescription: 'Trandafirul nostru cu miere și ciocolată albă este preparat cu făină, miere, zahăr, unt, drojdie, ouă, ciocolată albă, frișcă, gelatină, kalamansi și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Miere', 'Zahăr', 'Unt', 'Drojdie', 'Ouă', 'Ciocolată albă', 'Frișcă', 'Gelatină', 'Kalamansi', 'Rom'],
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
    
    // Mousse 3 Ciocolate
    'mousse-3-ciocolate': {
      id: 16,
      name: 'Mousse 3 Ciocolate',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
      description: 'Mousse cu 3 tipuri de ciocolată.',
      longDescription: 'Mousse-ul nostru cu 3 tipuri de ciocolată este preparat cu frișcă naturală, ciocolată albă, neagră și cu lapte, făină, ouă, zahăr, cacao și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Frișcă naturală', 'Ciocolată albă, neagră și cu lapte', 'Făină', 'Ouă', 'Zahăr', 'Cacao', 'Gelatină'],
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
    
    // Cozonac
    'cozonac-traditional-nuca-cacao': {
      id: 17,
      name: 'Cozonac - 950g',
      price: 153,
      originalPrice: 153,
      category: 'cozonac-chec',
      description: 'Cozonac traditional cu nucă și cacao - 950g.',
      longDescription: 'Cozonacul nostru traditional cu nucă și cacao este preparat cu făină, ouă, zahăr, lapte, nucă, unt, drojdie, coajă de lămâie și portocală, mac, stafide, rahat și rom. Gustul autentic românesc în porție de 950g.',
      ingredients: ['Făină', 'Ouă', 'Zahăr', 'Lapte', 'Nucă', 'Unt', 'Drojdie', 'Coajă de lămâie și portocală', 'Mac', 'Stafide', 'Rahat', 'Rom'],
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
    
    // Chec
    'chec': {
      id: 18,
      name: 'Chec cu nucă și scorțișoară',
      price: 120,
      originalPrice: 120,
      category: 'cozonac-chec',
      description: 'Chec cu nucă, făină de grâu, zahăr, ouă, ulei și scorțișoară - 700g.',
      longDescription: 'Checul nostru cu nucă, făină de grâu, zahăr, ouă, ulei și scorțișoară este preparat cu ingrediente de calitate. O combinație perfectă de texturi și gusturi în porție de 700g.',
      ingredients: ['Nucă', 'Făină de grâu', 'Zahăr', 'Ouă', 'Ulei', 'Scorțișoară'],
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
    
    // Pricomigdale
    'pricomigdale': {
      id: 19,
      name: 'Pricomigdale',
      price: 228,
      originalPrice: 228,
      category: 'prajituri',
      description: 'Pricomigdale cu nucă, migdale și ciocolată.',
      longDescription: 'Pricomigdalele noastre cu nucă, migdale și ciocolată sunt preparate cu nucă, migdale, zahăr, ouă, ciocolată, vanilie păstaie, unt, cafea, rom și amidon de porumb. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Nucă', 'Migdale', 'Zahăr', 'Ouă', 'Ciocolată', 'Vanilie păstaie', 'Unt', 'Cafea', 'Rom', 'Amidon de porumb'],
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
    
    // Cheesecake
    'cheesecake': {
      id: 20,
      name: 'Cheesecake',
      price: 37,
      originalPrice: 37,
      category: 'prajituri',
      description: 'Cheesecake cu mascarpone și Philadelphia.',
      longDescription: 'Cheesecake-ul nostru cu mascarpone și Philadelphia este preparat cu biscuiți, mascarpone, frișcă naturală, Philadelphia, coajă de lime, gelatină și fructe. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Biscuiți', 'Mascarpone', 'Frișcă naturală', 'Philadelphia', 'Coajă de lime', 'Gelatină', 'Fructe'],
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
    
    // Ecler
    'ecler': {
      id: 21,
      name: 'Ecler',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
      description: 'Ecler cu vanilie și ciocolată.',
      longDescription: 'Eclerul nostru cu vanilie și ciocolată este preparat cu făină, unt, ulei, ouă, vanilie păstaie, ciocolată, rom și amidon. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ulei', 'Ouă', 'Vanilie păstaie', 'Ciocolată', 'Rom', 'Amidon'],
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
    
    // Profiterol
    'profiterol': {
      id: 22,
      name: 'Profiterol',
      price: 39,
      originalPrice: 39,
      category: 'prajituri',
      description: 'Profiterol cu pastă de fistic și ciocolată.',
      longDescription: 'Profiterolul nostru cu pastă de fistic și ciocolată este preparat cu făină, ulei, unt, ouă, pastă de fistic, ciocolată, frișcă naturală și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ulei', 'Unt', 'Ouă', 'Pastă de fistic', 'Ciocolată', 'Frișcă naturală', 'Gelatină'],
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
    
    // Tort Mousse de Ciocolată și Fructe de Pădure
    'tort-mousse-ciocolata-fructe-padure': {
      id: 23,
      name: 'Tort Mousse de Ciocolată și Fructe de Pădure',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort mousse de ciocolată și fructe de pădure.',
      longDescription: 'Tortul nostru mousse de ciocolată și fructe de pădure este preparat cu făină, cacao, ouă, zahăr, frișcă naturală, ciocolată și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Cacao', 'Ouă', 'Zahăr', 'Frișcă naturală', 'Ciocolată', 'Gelatină'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Mousse 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Mousse 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Mousse 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Negresă de Post
    'negresa-de-post': {
      id: 24,
      name: 'Negresă de Post',
      price: 13,
      originalPrice: 13,
      category: 'prajituri',
      description: 'Negresă de Post cu nucă de cocos.',
      longDescription: 'Negresa noastră de Post cu nucă de cocos este preparată cu făină, nucă de cocos, zahăr, ulei, cacao și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Nucă de cocos', 'Zahăr', 'Ulei', 'Cacao', 'Bicarbonat'],
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
    
    // Tort Brownie cu Fistic
    'tort-brownie-cu-fistic': {
      id: 25,
      name: 'Tort Brownie cu Fistic',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Brownie cremos de ciocolată și cremos de fistic.',
      longDescription: 'Tortul nostru Brownie cu Fistic este preparat cu brownie cremos de ciocolată și cremos de fistic. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Brownie cremos de ciocolată', 'Cremos de fistic'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Brownie 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Brownie 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Brownie 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Ciocolată de Casă
    'ciocolata-de-casa': {
      id: 26,
      name: 'Ciocolată de Casă',
      price: 14,
      originalPrice: 14,
      category: 'prajituri',
      description: 'Ciocolată de casă cu lapte praf și cacao.',
      longDescription: 'Ciocolata noastră de casă cu lapte praf și cacao este preparată cu lapte praf, zahăr, unt, cacao și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Lapte praf', 'Zahăr', 'Unt', 'Cacao', 'Rom'],
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
    
    // Bezele
    'bezele': {
      id: 27,
      name: 'Bezele',
      price: 159,
      originalPrice: 159,
      category: 'prajituri',
      description: 'Bezele cu albuș și zahăr.',
      longDescription: 'Bezelele noastre cu albuș și zahăr sunt preparate cu albuș, zahăr și amidon. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Albuș', 'Zahăr', 'Amidon'],
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
    
    // Colivă
    'coliva': {
      id: 28,
      name: 'Colivă',
      price: 19,
      originalPrice: 19,
      category: 'prajituri',
      description: 'Colivă cu arpacaș și nucă.',
      longDescription: 'Coliva noastră cu arpacaș și nucă este preparată cu arpacaș, nucă, zahăr, coajă de citrice, rom și biscuiți. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Arpacaș', 'Nucă', 'Zahăr', 'Coajă de citrice', 'Rom', 'Biscuiți'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      },
      variants: [
        { weight: '200g', price: 19, priceValue: 19 },
        { weight: '1kg', price: 92, priceValue: 92 }
      ]
    },
    
    // Pavlova
    'pavlova': {
      id: 29,
      name: 'Pavlova',
      price: 28,
      originalPrice: 28,
      category: 'prajituri',
      description: 'Pavlova cu fructul pasiunii și fructe mixte.',
      longDescription: 'Pavlova noastră cu fructul pasiunii și fructe mixte este preparată cu albuș, zahăr, amidon, frișcă naturală, fructul pasiunii și fructe mixte. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Albuș', 'Zahăr', 'Amidon', 'Frișcă naturală', 'Fructul pasiunii', 'Fructe mixte'],
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
    
    // Pișcoturi
    'piscoturi': {
      id: 30,
      name: 'Pișcoturi',
      price: 196,
      originalPrice: 196,
      category: 'prajituri',
      description: 'Pișcoturi cu făină și ouă.',
      longDescription: 'Pișcoturile noastre cu făină și ouă sunt preparate cu făină, ouă și zahăr. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ouă', 'Zahăr'],
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
    
    // Medovika
    'medovika-prajitura': {
      id: 31,
      name: 'Medovika',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
      description: 'Medovika cu mascarpone și fructe de pădure.',
      longDescription: 'Medovika noastră cu mascarpone și fructe de pădure este preparată cu făină, mascarpone, cremă de brânză, zahăr, fructe de pădure, rodie, mere, miere, frișcă naturală, unt, ouă, gelatină și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Mascarpone', 'Cremă de brânză', 'Zahăr', 'Fructe de pădure', 'Rodie', 'Mere', 'Miere', 'Frișcă naturală', 'Unt', 'Ouă', 'Gelatină', 'Bicarbonat'],
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
    
    // Dobos
    'dobos': {
      id: 32,
      name: 'Dobos',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
      description: 'Dobos cu ciocolată belgiană.',
      longDescription: 'Dobosul nostru cu ciocolată belgiană este preparat cu unt, ciocolată belgiană, ouă, zahăr, făină și ulei. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Unt', 'Ciocolată belgiană', 'Ouă', 'Zahăr', 'Făină', 'Ulei'],
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
    
    // Trufe
    'trufe': {
      id: 33,
      name: 'Trufe',
      price: 277,
      originalPrice: 277,
      category: 'prajituri',
      description: 'Trufe cu ciocolată și tonka.',
      longDescription: 'Trufele noastre cu ciocolată și tonka sunt preparate cu ciocolată, frișcă și tonka. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Ciocolată', 'Frișcă', 'Tonka'],
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
    
    // Savarină
    'savarina': {
      id: 34,
      name: 'Savarină',
      price: 28,
      originalPrice: 28,
      category: 'prajituri',
      description: 'Savarină cu frișcă și gem de fructe de pădure.',
      longDescription: 'Savarina noastră cu frișcă și gem de fructe de pădure este preparată cu făină, ouă, frișcă, zahăr, drojdie, coajă de lămâie, rom (alcool) și gem de fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ouă', 'Frișcă', 'Zahăr', 'Drojdie', 'Coajă de lămâie', 'Rom (alcool)', 'Gem de fructe de pădure'],
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
    
    // Fourstafidă
    'fourstafida': {
      id: 35,
      name: 'Fourstafidă',
      price: 196,
      originalPrice: 196,
      category: 'fursecuri',
      description: 'Fourstafidă cu stafide și rom.',
      longDescription: 'Fourstafida noastră cu stafide și rom este preparată cu unt, făină, ouă, zahăr, stafide, rom, esență și vanilie păstaie. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Unt', 'Făină', 'Ouă', 'Zahăr', 'Stafide', 'Rom', 'Esență', 'Vanilie păstaie'],
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
    
    // Tort Maria
    'tort-maria': {
      id: 36,
      name: 'Tort Maria',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort Maria cu cremă de vanilie și fructe de pădure.',
      longDescription: 'Tortul nostru Maria cu cremă de vanilie și fructe de pădure este preparat cu cremă de vanilie, frișcă și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Cremă de vanilie', 'Frișcă', 'Fructe de pădure'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Maria 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Maria 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Maria 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-5 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Cannoli
    'cannoli': {
      id: 37,
      name: 'Cannoli',
      price: 28,
      originalPrice: 28,
      category: 'prajituri',
      description: 'Cannoli cu cremă de brânză și ciocolată.',
      longDescription: 'Cannoli-ul nostru cu cremă de brânză și ciocolată este preparat cu făină, untură, cremă de brânză, unt, frișcă și ciocolată. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Untură', 'Cremă de brânză', 'Unt', 'Frișcă', 'Ciocolată'],
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
    
    // Danish
    'danish': {
      id: 38,
      name: 'Danish',
      price: 36,
      originalPrice: 36,
      category: 'prajituri',
      description: 'Danish cu fructe mixte și scorțișoară.',
      longDescription: 'Danish-ul nostru cu fructe mixte și scorțișoară este preparat cu făină, unt, ouă, zahăr, lapte, drojdie, vanilie păstaie, scorțișoară și fructe mixte. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Lapte', 'Drojdie', 'Vanilie păstaie', 'Scorțișoară', 'Fructe mixte'],
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
    
    // Tort Red Velvet
    'tort-red-velvet': {
      id: 39,
      name: 'Tort Red Velvet',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort Red Velvet cu blat cu chefir și cremă de brânză.',
      longDescription: 'Tortul nostru Red Velvet cu blat cu chefir și cremă de brânză este preparat cu blat cu chefir, cremă de brânză și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat cu chefir', 'Cremă de brânză', 'Fructe de pădure'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Red Velvet 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Red Velvet 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Red Velvet 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Snickers
    'tort-snickers': {
      id: 40,
      name: 'Tort Snickers',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Tort Snickers cu caramel sărat cu arahide.',
      longDescription: 'Tortul nostru Snickers cu caramel sărat cu arahide este preparat cu blat umed de cacao, mousse de ciocolată, caramel sărat cu arahide și cremă de caramel. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată', 'Caramel sărat cu arahide', 'Cremă de caramel'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Snickers 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Snickers 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Snickers 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Tiramisu
    'tort-tiramisu': {
      id: 41,
      name: 'Tort Tiramisu',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Tort Tiramisu cu mousse mascarpone și cafea.',
      longDescription: 'Tortul nostru Tiramisu cu mousse mascarpone și cafea este preparat cu pișcot, mousse mascarpone, cafea, cacao și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Pișcot', 'Mousse mascarpone', 'Cafea', 'Cacao', 'Gelatină'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Tiramisu 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Tiramisu 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Tiramisu 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Duo Chocolat
    'duo-chocolate-1kg': {
      id: 42,
      name: 'Tort Duo Chocolat',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort Duo Chocolat cu mousse de ciocolată albă și neagră.',
      longDescription: 'Tortul nostru Duo Chocolat cu mousse de ciocolată albă și neagră este preparat cu blat umed de cacao, mousse de ciocolată albă și neagră și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată albă și neagră', 'Fructe de pădure'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Duo Chocolat 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Duo Chocolat 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Duo Chocolat 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Pavlova
    'tort-pavlova': {
      id: 43,
      name: 'Tort Pavlova',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort Pavlova cu bezea și fructe mixte.',
      longDescription: 'Tortul nostru Pavlova cu bezea și fructe mixte este preparat cu bezea, piure fructul pasiunii, mango, frișcă și fructe mixte. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Bezea', 'Piure fructul pasiunii', 'Mango', 'Frișcă', 'Fructe mixte'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Pavlova 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Pavlova 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Pavlova 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Trois Chocolat
    'tort-trois-chocolat': {
      id: 44,
      name: 'Tort Trois Chocolat',
      price: 205,
      originalPrice: 205,
      category: 'torturi',
      description: 'Tort Trois Chocolat cu 3 tipuri de ciocolată.',
      longDescription: 'Tortul nostru Trois Chocolat cu 3 tipuri de ciocolată este preparat cu blat umed de cacao și mousse de ciocolată albă, cu lapte și neagră. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată albă, cu lapte și neagră'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Trois Chocolat 1kg',
          price: 205,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Trois Chocolat 2kg',
          price: 410,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Trois Chocolat 2.5kg',
          price: 512,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Tort Boema
    'tort-boema': {
      id: 45,
      name: 'Tort Boema',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Tort Boema cu blat însiropat cu rom și vișine.',
      longDescription: 'Tortul nostru Boema cu blat însiropat cu rom și vișine este preparat cu blat însiropat cu rom (alcool), cremă de ciocolată neagră, vișine și mousse de frișcă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat însiropat cu rom (alcool)', 'Cremă de ciocolată neagră', 'Vișine', 'Mousse de frișcă'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Boema 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Boema 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Boema 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Alba ca Zăpada
    'alba-ca-zapada': {
      id: 46,
      name: 'Alba ca Zăpada',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Tort Alba ca Zăpada cu griș și coajă de lămâie.',
      longDescription: 'Tortul nostru Alba ca Zăpada cu griș și coajă de lămâie este preparat cu unt, făină, ouă, zahăr, griș, amidon de porumb, bicarbonat și coajă de lămâie. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Unt', 'Făină', 'Ouă', 'Zahăr', 'Griș', 'Amidon de porumb', 'Bicarbonat', 'Coajă de lămâie'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Alba ca Zăpada 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Alba ca Zăpada 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Alba ca Zăpada 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },
    
    // Cookies
    'cookies': {
      id: 47,
      name: 'Cookies',
      price: 17,
      originalPrice: 17,
      category: 'fursecuri',
      description: 'Cookies cu migdale și ciocolată.',
      longDescription: 'Cookies-urile noastre cu migdale și ciocolată sunt preparate cu făină, unt, migdale, ouă, ciocolată și praf de copt. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Migdale', 'Ouă', 'Ciocolată', 'Praf de copt'],
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
    
    // Brownie
    'brownie': {
      id: 48,
      name: 'Brownie',
      price: 15,
      originalPrice: 15,
      category: 'prajituri',
      description: 'Brownie cu ciocolată și merișoare.',
      longDescription: 'Brownie-ul nostru cu ciocolată și merișoare este preparat cu ciocolată, ouă, zahăr, făină integrală, unt, merișoare și nucă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Ciocolată', 'Ouă', 'Zahăr', 'Făină integrală', 'Unt', 'Merișoare', 'Nucă'],
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
    
    // Limbi de Pisică
    'limbi-de-pisica': {
      id: 49,
      name: 'Limbi de Pisică',
      price: 196,
      originalPrice: 196,
      category: 'fursecuri',
      description: 'Limbi de pisică cu unt și albuș.',
      longDescription: 'Limbii noștri de pisică cu unt și albuș sunt preparați cu unt, zahăr, albuș și făină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Unt', 'Zahăr', 'Albuș', 'Făină'],
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
    
    // Plăcintă cu Mere
    'placinta-cu-mere': {
      id: 50,
      name: 'Plăcintă cu Mere',
      price: 19,
      originalPrice: 19,
      category: 'post',
      description: 'Plăcintă cu mere și griș.',
      longDescription: 'Plăcinta noastră cu mere și griș este preparată cu făină, ulei de cocos, griș, zahăr și mere. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ulei de cocos', 'Griș', 'Zahăr', 'Mere'],
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
    
    // Plăcintă de Dovleac
    'placinta-de-dovleac': {
      id: 51,
      name: 'Plăcintă de Dovleac',
      price: 19,
      originalPrice: 19,
      category: 'post',
      description: 'Plăcintă de dovleac cu scorțișoară.',
      longDescription: 'Plăcinta noastră de dovleac cu scorțișoară este preparată cu făină, ulei de cocos, griș, zahăr, dovleac și scorțișoară. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ulei de cocos', 'Griș', 'Zahăr', 'Dovleac', 'Scorțișoară'],
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
    
    // Cataif
    'cataif': {
      id: 52,
      name: 'Cataif',
      price: 25,
      originalPrice: 25,
      category: 'prajituri',
      description: 'Cataif cu sirop de zahăr și frișcă naturală.',
      longDescription: 'Cataiful nostru cu sirop de zahăr și frișcă naturală este preparat cu cataif, unt, sirop de zahăr, coajă de portocală și frișcă naturală. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Cataif', 'Unt', 'Sirop de zahăr', 'Coajă de portocală', 'Frișcă naturală'],
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
    
    // Cartof
    'cartof': {
      id: 53,
      name: 'Cartof',
      price: 18,
      originalPrice: 18,
      category: 'prajituri',
      description: 'Cartof cu blat umed de cacao și fructe de pădure.',
      longDescription: 'Cartoful nostru cu blat umed de cacao și fructe de pădure este preparat cu blat umed de cacao, blat umed alb, unt, ciocolată, rom și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat umed de cacao', 'Blat umed alb', 'Unt', 'Ciocolată', 'Rom', 'Fructe de pădure'],
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
    
    // Platou Mini Prăjituri
    'platou-mix-mini-prajituri': {
      id: 54,
      name: 'Platou Mini Prăjituri',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Selecție variată de mini prăjituri.',
      longDescription: 'Platoul nostru cu mini prăjituri include o selecție variată de mini prăjituri. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Selecție variată de mini prăjituri'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Platou 1kg',
          price: 228,
          originalPrice: 228,
          servings: '1kg'
        },
        {
          id: '700g',
          name: 'Platou 700g',
          price: 150,
          originalPrice: 150,
          servings: '700g'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Produse lipsă din carusel
    // Găluști cu prune
    'galusti-cu-prune': {
      id: 55,
      name: 'Găluști cu prune',
      price: 12,
      originalPrice: 12,
      category: 'prajituri',
      description: 'Găluști tradiționali cu prune fără sâmbure și scorțișoară. Gustul autentic românesc.',
      longDescription: 'Găluștii noștri tradiționali sunt preparați cu cartofi, ou, pesmet, unt și prune fără sâmbure, condimentați cu scorțișoară. Gustul autentic românesc care îți va aminti de copilărie. 100g per bucată.',
      ingredients: ['Cartofi', 'Ou', 'Pesmet', 'Unt', 'Prune fără sâmbure', 'Scorțișoară'],
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

    // Caserolă mini prăjituri
    'caserola-mini-prajituri': {
      id: 56,
      name: 'Caserolă mini prăjituri - 350g',
      price: 75,
      originalPrice: 75,
      category: 'mini-prajituri',
      description: 'Caserolă cu mini prăjituri variate: mini tarte, mini eclere, mini amandine, mini kranț.',
      longDescription: 'Caserola noastră cu mini prăjituri include o selecție variată de mini tarte, mini eclere, mini amandine și mini kranț. Perfect pentru gustări sau evenimente. 350g per caserolă.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Vanilie', 'Ciocolată'],
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

    // Mini tarte
    'mini-tarte': {
      id: 57,
      name: 'Mini tarte',
      price: 8,
      originalPrice: 8,
      category: 'mini-prajituri',
      description: 'Mini tarte delicate cu cremă și fructe.',
      longDescription: 'Mini tarte-urile noastre delicate sunt preparate cu făină, unt, ouă, zahăr, cremă și fructe. Perfect pentru gustări sau evenimente.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cremă', 'Fructe'],
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

    // Mini amandine
    'mini-amandine': {
      id: 58,
      name: 'Mini amandine',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini amandine cu cacao și cremă.',
      longDescription: 'Mini amandinele noastre sunt preparate cu făină, unt, ouă, zahăr, cacao și cremă. O combinație perfectă de texturi și gusturi. Prețul este per kilogram.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cacao', 'Cremă'],
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

    // Mini eclere cu vanilie și ciocolată
    'mini-eclere-vanilie-ciocolata': {
      id: 59,
      name: 'Mini eclere cu vanilie și ciocolată',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini eclere cu cremă de vanilie și ciocolată.',
      longDescription: 'Mini eclerele noastre sunt preparate cu făină, unt, ouă, zahăr, vanilie, ciocolată și cremă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Vanilie', 'Ciocolată', 'Cremă'],
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

    // Mini eclere cu ness
    'mini-eclere-ness': {
      id: 60,
      name: 'Mini eclere cu ness',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini eclere cu cremă de ness.',
      longDescription: 'Mini eclerele noastre cu ness sunt preparate cu făină, unt, ouă, zahăr, ness și cremă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Ness', 'Cremă'],
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

    // Fursecuri fragede cu nucă
    'fursecuri-fragede-nuca': {
      id: 61,
      name: 'Fursecuri fragede cu nucă',
      price: 196,
      originalPrice: 196,
      category: 'fursecuri',
      description: 'Fursecuri fragede cu nucă și vanilie.',
      longDescription: 'Fursecurii noștri fragede sunt preparați cu făină, unt, zahăr, nucă și vanilie. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Nucă', 'Vanilie'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '250g',
          name: 'Fursecuri fragede 250g',
          price: 49,
          servings: '250g'
        },
        {
          id: '500g',
          name: 'Fursecuri fragede 500g',
          price: 98,
          servings: '500g'
        },
        {
          id: '750g',
          name: 'Fursecuri fragede 750g',
          price: 147,
          servings: '750g'
        },
        {
          id: '1kg',
          name: 'Fursecuri fragede 1kg',
          price: 196,
          servings: '1kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Platou fără lactoză
    'platou-fara-lactoza': {
      id: 62,
      name: 'Platou fără lactoză',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Platou fără lactoză cu brownie, pandispan și pavlova.',
      longDescription: 'Platoul nostru fără lactoză conține brownie cu merișoare, pandispan cu prune sau vișine și Pavlova cu cremă de kalamansi, fructul pasiunii și mango. Perfect pentru cei cu intoleranță la lactoză.',
      ingredients: ['Brownie cu merișoare', 'Pandispan cu prune sau vișine', 'Pavlova cu cremă de kalamansi', 'Fructul pasiunii', 'Mango'],
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

    // Mini trio chocolate
    'mini-trio-chocolate': {
      id: 63,
      name: 'Mini trio chocolate',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini trio chocolate cu 3 tipuri de ciocolată.',
      longDescription: 'Mini trio chocolate-ul nostru include o selecție variată de mini prăjituri cu ciocolată albă, cu lapte și neagră. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Ciocolată albă', 'Ciocolată cu lapte', 'Ciocolată neagră', 'Cremă', 'Făină', 'Unt'],
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

    // Căciulițe cu ciocolată și portocală
    'caciulite-ciocolata-portocala': {
      id: 64,
      name: 'Căciulițe cu ciocolată și portocală',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Căciulițe cu ciocolată și portocală.',
      longDescription: 'Căciulițele noastre cu ciocolată și portocală sunt preparate cu ciocolată fină și coajă de portocală. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Ciocolată', 'Coajă de portocală', 'Făină', 'Unt', 'Ouă', 'Zahăr'],
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

    // Mini Choux a la creme
    'mini-choux-creme': {
      id: 65,
      name: 'Mini Choux a la creme',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini Choux a la creme cu vanilie și frișcă naturală.',
      longDescription: 'Mini Choux-urile noastre a la creme sunt preparate cu vanilie și frișcă naturală. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Vanilie', 'Frișcă naturală', 'Zahăr'],
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

    // Mini krant
    'mini-krant': {
      id: 66,
      name: 'Mini krant',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini krant cu cremă de vanilie și crocant din nucă caramelizată.',
      longDescription: 'Mini krant-ul nostru cu cremă de vanilie și crocant din nucă caramelizată este preparat cu unt și ingrediente de calitate. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Cremă de vanilie', 'Unt', 'Nucă caramelizată', 'Făină', 'Zahăr', 'Ouă'],
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

    // Mini cannoli
    'mini-cannoli': {
      id: 67,
      name: 'Mini cannoli',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini cannoli cu cremă de brânză și ciocolată neagră.',
      longDescription: 'Mini cannoli-urile noastre cu cremă de brânză și ciocolată neagră sunt preparate cu unt și ingrediente de calitate. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Cremă de brânză', 'Unt', 'Ciocolată neagră', 'Făină', 'Zahăr', 'Ouă'],
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

    // Mini Red velvet
    'mini-red-velvet': {
      id: 68,
      name: 'Mini Red velvet',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini Red velvet cu cremă de brânză.',
      longDescription: 'Mini Red velvet-ul nostru cu cremă de brânză este preparat cu colorant roșu și ingrediente de calitate. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Cacao', 'Cremă de brânză', 'Colorant roșu', 'Unt', 'Zahăr'],
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

    // Cozonac cu nucă, cacao, stafide și rahat
    'cozonac-nuca-cacao-stafide-rahat': {
      id: 69,
      name: 'Cozonac cu nucă, cacao, stafide și rahat - 1kg',
      price: 153,
      originalPrice: 153,
      category: 'cozonac-chec',
      description: 'Cozonac cu nucă, cacao, stafide și rahat - 1kg.',
      longDescription: 'Cozonacul nostru cu nucă, cacao, stafide și rahat este preparat cu ingrediente de calitate și gustul autentic românesc. Perfect pentru sărbători în porție de 1kg.',
      ingredients: ['Făină', 'Ouă', 'Zahăr', 'Lapte', 'Nucă', 'Cacao', 'Stafide', 'Rahat', 'Unt', 'Drojdie'],
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

    // Mini tarte cu lămâie, kalamansi și meringa
    'mini-tarte-lamaie-kalamansi-meringa': {
      id: 70,
      name: 'Mini tarte cu lămâie, kalamansi și meringa',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Mini tarte cu lămâie, kalamansi și meringa.',
      longDescription: 'Mini tarte-urile noastre cu lămâie, kalamansi și meringa sunt preparate cu ingrediente de calitate. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Lămâie', 'Kalamansi', 'Meringa', 'Cremă'],
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

    // Mini exotic
    'mini-exotic': {
      id: 71,
      name: 'Mini exotic',
      price: 228,
      originalPrice: 228,
      category: 'fara-zahar-green-sugar',
      description: 'Mini exotic cu blat de vanilie și cremos din fructul pasiunii cu Green Sugar.',
      longDescription: 'Mini exotic-ul nostru cu blat de vanilie, cremă de vanilie și cremos din fructul pasiunii integral făcută cu Green Sugar. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Blat de vanilie', 'Cremă de vanilie', 'Cremos din fructul pasiunii', 'Green Sugar', 'Făină', 'Unt', 'Ouă'],
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

    // Chec cu morcov
    'chec-morcov': {
      id: 72,
      name: 'Chec cu morcov',
      price: 120,
      originalPrice: 120,
      category: 'cozonac-chec',
      description: 'Chec cu morcov, nucă, ouă, ulei și scorțișoară - 700g.',
      longDescription: 'Checul nostru cu morcov, nucă, ouă, ulei și scorțișoară este preparat cu ingrediente de calitate. O combinație perfectă de texturi și gusturi în porție de 700g.',
      ingredients: ['Morcov', 'Nucă', 'Ouă', 'Ulei', 'Scorțișoară', 'Făină', 'Zahăr'],
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

    // Chec simplu
    'chec-simplu': {
      id: 73,
      name: 'Chec simplu',
      price: 120,
      originalPrice: 120,
      category: 'cozonac-chec',
      description: 'Chec simplu cu unt, zahăr, ouă, lapte, amidon de cartofi, coajă de lămâie și praf de copt - 700g.',
      longDescription: 'Checul nostru simplu cu unt, zahăr, ouă, lapte, amidon de cartofi, coajă de lămâie și praf de copt este preparat cu ingrediente de calitate. O combinație perfectă de texturi și gusturi în porție de 700g.',
      ingredients: ['Unt', 'Zahăr', 'Ouă', 'Lapte', 'Amidon de cartofi', 'Coajă de lămâie', 'Praf de copt'],
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

    // Mucenici
    'mucenici': {
      id: 79,
      name: 'Mucenici',
      price: 15,
      originalPrice: 15,
      category: 'cozonac-chec',
      description: 'Mucenici tradiționali cu aluat de cozonac, miere și nucă - 700g.',
      longDescription: 'Mucenicii noștri tradiționali sunt preparați cu aluat de cozonac, miere și nucă. O specialitate românească pentru momentele festive, disponibilă în porție de 700g.',
      ingredients: ['Aluat de cozonac', 'Miere', 'Nucă'],
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

    // Melci
    'melci': {
      id: 80,
      name: 'Melci',
      price: 15,
      originalPrice: 15,
      category: 'cozonac-chec',
      description: 'Melci tradiționali cu aluat de cozonac cu scorțișoară - 700g.',
      longDescription: 'Melcii noștri tradiționali sunt preparați cu aluat de cozonac cu scorțișoară. Disponibili în două variante: cu cremă de vanilie sau simpli. O specialitate românească pentru momentele festive.',
      ingredients: ['Aluat de cozonac cu scorțișoară'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: 'vanilie',
          name: 'Melci cu cremă de vanilie',
          price: 15,
          servings: '700g',
          description: 'Melci tradiționali cu cremă de vanilie'
        },
        {
          id: 'simplu',
          name: 'Melci simpli',
          price: 15,
          servings: '700g',
          description: 'Melci tradiționali simpli'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata zilnic',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Plăcintă cu ciuperci de post
    'placinta-ciuperci-post': {
      id: 81,
      name: 'Plăcintă cu ciuperci de post',
      price: 22,
      originalPrice: 22,
      category: 'post',
      description: 'Plăcintă cu ciuperci de post preparată cu foi de plăcintă și umplutură de ciuperci - 120g.',
      longDescription: 'Plăcinta noastră cu ciuperci de post este preparată cu foi de plăcintă cu umplutură de ciuperci. O specialitate pentru perioadele de post, disponibilă în porție de 120g.',
      ingredients: ['Foi de plăcintă', 'Umplutură de ciuperci'],
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

    // Tort Inimă
    'tort-inima': {
      id: 72,
      name: 'Tort Inimă',
      price: 206,
      originalPrice: 206,
      category: 'torturi',
      description: 'Tort Inimă cu cremă și fructe.',
      longDescription: 'Tortul nostru Inimă este preparat cu făină, unt, ouă, zahăr, cremă, fructe și ciocolată. O combinație perfectă de texturi și gusturi pentru momentele speciale.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cremă', 'Fructe', 'Ciocolată'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Inimă 1kg',
          price: 206,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Inimă 2kg',
          price: 412,
          servings: '2kg'
        },
        {
          id: '3kg',
          name: 'Tort Inimă 3kg',
          price: 618,
          servings: '3kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Tort Diplomat
    'tort-diplomat': {
      id: 75,
      name: 'Tort Diplomat',
      price: 206,
      originalPrice: 206,
      category: 'torturi',
      description: 'Tort Diplomat cu cremă și fructe.',
      longDescription: 'Tortul nostru Diplomat este preparat cu făină, unt, ouă, zahăr, cremă, fructe și ciocolată. O combinație perfectă de texturi și gusturi pentru momentele speciale.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cremă', 'Fructe', 'Ciocolată'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1.5kg',
          name: 'Tort Diplomat 1.5kg',
          price: 309,
          servings: '1.5kg'
        },
        {
          id: '2kg',
          name: 'Tort Diplomat 2kg',
          price: 412,
          servings: '2kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Tort fără lactoză cu cremă de vanilie
    'tort-fara-lactoza-vanilie': {
      id: 76,
      name: 'Tort fără lactoză cu cremă de vanilie',
      price: 228,
      originalPrice: 228,
      category: 'torturi',
      description: 'Tort fără lactoză cu cremă de vanilie din lapte de cocos.',
      longDescription: 'Tortul nostru fără lactoză cu cremă de vanilie este preparat cu lapte de cocos, gălbenuș, zahăr, vanilie păstaie și fructe în compot. Decorul variază. Perfect pentru cei cu intoleranță la lactoză.',
      ingredients: ['Lapte de cocos', 'Gălbenuș', 'Zahăr', 'Vanilie păstaie', 'Fructe în compot'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort fără lactoză 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort fără lactoză 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort fără lactoză 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Plăcintă de magiun cu nucă
    'placinta-magiun-nuca': {
      id: 77,
      name: 'Plăcintă de magiun cu nucă',
      price: 22,
      originalPrice: 22,
      category: 'post',
      description: 'Plăcintă de magiun cu nucă.',
      longDescription: 'Plăcinta noastră de magiun cu nucă este preparată cu făină, ulei de cocos, magiun, nucă, zahăr și scorțișoară. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Ulei de cocos', 'Magiun', 'Nucă', 'Zahăr', 'Scorțișoară'],
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

    // Tort de post
    'tort-de-post': {
      id: 78,
      name: 'Tort de post',
      price: 228,
      originalPrice: 228,
      category: ['torturi', 'post'],
      description: 'Tort de post cu blat din ciocolată neagră și nucă.',
      longDescription: 'Tortul nostru de post cu blat din ciocolată neagră și nucă, fructe de pădure congelate și cremă din ciocolată neagră și lapte de cocos concentrat. Decorul variază.',
      ingredients: ['Blat din ciocolată neagră și nucă', 'Fructe de pădure congelate', 'Cremă din ciocolată neagră', 'Lapte de cocos concentrat'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' }
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort de post 1kg',
          price: 228,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort de post 2kg',
          price: 456,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort de post 2.5kg',
          price: 570,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 3-4 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    },

    // Tort Revelion
    'tort-revelion': {
      id: 77,
      name: 'Tort Revelion',
      price: 206,
      originalPrice: 206,
      category: 'torturi',
      description: 'Tort special de Revelion cu decor personalizat.',
      longDescription: 'Tortul nostru de Revelion este un tort special cu decor personalizat, perfect pentru a începe anul nou cu dulceață. Realizat cu ingrediente de calitate superioară și decorat special pentru momentul de revelion.',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cremă', 'Fructe', 'Ciocolată', 'Decor personalizat'],
      features: [
        { icon: MessageCircle, text: 'Mesajul personalizat se adaugă înainte de Checkout' },
        { icon: Leaf, text: 'Produs artizanal' },
        { icon: Lock, text: 'Plăți securizate' },
        { icon: Sparkles, text: 'Decor Revelion personalizat' }
      ],
      images: [
        '/images/products/tort-revelion-1.jpg',
        '/images/products/tort-revelion-2.jpg',
        '/images/products/tort-revelion-3.jpg',
        '/images/products/tort-revelion-4.jpg'
      ],
      variants: [
        {
          id: '1kg',
          name: 'Tort Revelion 1kg',
          price: 206,
          originalPrice: 206,
          servings: '1kg'
        },
        {
          id: '2kg',
          name: 'Tort Revelion 2kg',
          price: 412,
          originalPrice: 412,
          servings: '2kg'
        },
        {
          id: '2.5kg',
          name: 'Tort Revelion 2.5kg',
          price: 515,
          originalPrice: 515,
          servings: '2.5kg'
        }
      ],
      delivery: {
        area: 'Luni - Duminică București și Ilfov',
        time: 'Gata în 2-3 zile',
        pickup: 'Ridicare disponibilă la Sos. Alexandriei București'
      }
    }
  }

  const product = products[params.slug as keyof typeof products]

  // Initialize current price and selected variant only when slug changes
  useEffect(() => {
    if (product) {
      if ((product as any).variants && (product as any).variants.length > 0) {
        const firstVariant = (product as any).variants[0]
        setSelectedVariant(firstVariant)
        setCurrentPrice(firstVariant.price)
      } else {
        setSelectedVariant(null)
        setCurrentPrice(product.price)
      }
      if ((product as any).flavors && (product as any).flavors.length > 0) {
        setSelectedFlavor((product as any).flavors[0])
      } else {
        setSelectedFlavor('')
      }
    }
    // Resetează indexul imaginii când se schimbă produsul
    setCurrentImageIndex(0)
  }, [params.slug])

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

      {/* Main Content */}
      <div className="container-custom py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-md"
          >
            <div className="relative">
              {(() => {
                const images = getProductImages(params.slug)
                const hasMultipleImages = images.length > 1
                
                return (
                  <div 
                    className="relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
              <Image
                      src={images[currentImageIndex]}
                alt={product.name}
                width={500}
                height={400}
                      className="w-full object-contain rounded-lg shadow-lg"
                    />
                    
                    {/* Săgeți de navigare */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                          aria-label="Imaginea anterioară"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                          aria-label="Imaginea următoare"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Indicatori de pagină */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Imaginea ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-primary">
                  {selectedVariant ? selectedVariant.price : Math.round(currentPrice * quantity)} RON{currentPrice === 228 && !product.name.includes('Platou') ? '/kg' : ''}
                </span>
                {selectedVariant 
                  ? (selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price && (
                  <span className="text-xl text-gray-500 line-through">
                        {selectedVariant.originalPrice} RON{selectedVariant.originalPrice === 228 && !product.name.includes('Platou') ? '/kg' : ''}
                  </span>
                    ))
                  : (product.originalPrice && product.originalPrice > currentPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        {Math.round(product.originalPrice * quantity)} RON{product.originalPrice === 228 && !product.name.includes('Platou') ? '/kg' : ''}
                      </span>
                    ))
                }
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descriere</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Mesaj Revelion pentru Tort Revelion */}
              {(product as any).slug === 'tort-revelion' && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-500 rounded-lg">
                  <p className="text-gray-800 font-semibold">
                    ✨ Toate torturile din magazinul nostru pot deveni torturi de Revelion! ✨
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Contactează-ne pentru detalii despre decor personalizat de Revelion.
                  </p>
                </div>
              )}

              {/* Variants */}
              {(product as any).variants && (product as any).variants.length > 0 && (
              <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alege greutatea</h3>
                  <div className="flex flex-wrap gap-3">
                    {(product as any).variants.map((variant: any) => (
                  <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setCurrentPrice(variant.price)
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {variant.name} - {variant.price} RON{variant.price === 228 && !product.name.includes('Platou') ? '/kg' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors */}
              {(product as any).flavors && (product as any).flavors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alege aroma</h3>
                  <div className="flex flex-wrap gap-3">
                    {(product as any).flavors.map((flavor: string) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedFlavor === flavor
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}


              {/* Butoane de comandă */}
              <div className="space-y-3 pt-4">
                <a
                  href="https://food.bolt.eu/ro-RO/325-bucharest/p/103885-cofet%C4%83ria-zaha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Comandă prin Bolt Food</span>
                </a>
                
                <a
                  href="tel:0731195126"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Apel telefonic - 0731 195 126</span>
                </a>
                      </div>

              {/* Informații suplimentare */}
              <div className="mt-8 space-y-4">
          {/* Ingredients */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('ingredients')}
              className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900">Ingrediente</h3>
              {expandedSections.ingredients ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
              </button>
            {expandedSections.ingredients && (
              <div className="px-6 py-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {product.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
            </div>
          )}
          </div>

          {/* Features */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('features')}
              className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900">Caracteristici</h3>
              {expandedSections.features ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
              </button>
            {expandedSections.features && (
              <div className="px-6 py-4 space-y-4">
                {product.features && product.features.map((feature: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Livrare</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Zonă:</strong> {product.delivery.area}</p>
                    <p><strong>Timp:</strong> {product.delivery.time}</p>
                    <p><strong>Ridicare:</strong> {product.delivery.pickup}</p>
                  </div>
                </div>
            </div>
          )}
                </div>
              </div>
          </div>
        </motion.div>
        </div>

      </div>
    </div>
  )
}

export default ProductPage
