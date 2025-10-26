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
  ShoppingCart
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
      category: 'dulciuri',
      description: 'Saleuri tradiționale cu semințe și condimente.',
      longDescription: 'Saleurile noastre tradiționale sunt preparate cu făină, unt, telemea, semințe, chimen, susan, mac, susan negru, in și ou. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Telemea', 'Semințe', 'Chimen', 'Susan', 'Mac', 'Susan negru', 'In', 'Ou'],
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
    
    // Poale'n Brau
    'poale-n-brau': {
      id: 3,
      name: 'Poale\'n Brau',
      price: 19,
      originalPrice: 19,
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
      description: 'Cornulețe cu nucă și gem de fructe de pădure.',
      longDescription: 'Cornulețele noastre cu nucă și gem de fructe de pădure sunt preparate cu făină, unt, zahăr, gălbenuș, gem de fructe de pădure (magiun) și nucă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Gălbenuș', 'Gem de fructe de pădure (magiun)', 'Nucă'],
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
    
    // Fursecuri
    'fursec-cu-gem': {
      id: 8,
      name: 'Fursecuri',
      price: 196,
      originalPrice: 196,
      category: 'dulciuri',
      description: 'Fursecuri cu gem de fructe de pădure.',
      longDescription: 'Fursecurii noștri cu gem de fructe de pădure sunt preparați cu făină, unt, zahăr, ouă și gem de fructe de pădure (magiun). O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Ouă', 'Gem de fructe de pădure (magiun)'],
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
    
    // Tiramisu Green Sugar
    'tiramisu-green-sugar': {
      id: 9,
      name: 'Tiramisu Green Sugar',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
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
      category: 'prajituri',
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
    
    // Tarte Mici
    'tarte-mici': {
      id: 12,
      name: 'Tarte Mici',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Tarte mici cu fructe mixte.',
      longDescription: 'Tarte-urile noastre mici cu fructe mixte sunt preparate cu lapte, făină, unt, gălbenuș, zahăr, fructe mixte, vanilie păstaie, gelatină și amidon de porumb. O combinație perfectă de texturi și gusturi.',
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
      name: 'Cozonac',
      price: 153,
      originalPrice: 153,
      category: 'dulciuri',
      description: 'Cozonac traditional cu nucă și cacao.',
      longDescription: 'Cozonacul nostru traditional cu nucă și cacao este preparat cu făină, ouă, zahăr, lapte, nucă, unt, drojdie, coajă de lămâie și portocală, mac, stafide, rahat și rom. Gustul autentic românesc.',
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
      name: 'Chec',
      price: 178,
      originalPrice: 178,
      category: 'dulciuri',
      description: 'Chec cu amidon de cartofi și coajă de lămâie.',
      longDescription: 'Checul nostru cu amidon de cartofi și coajă de lămâie este preparat cu unt, zahăr, ouă, lapte, amidon de cartofi, coajă de lămâie și praf de copt. O combinație perfectă de texturi și gusturi.',
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
    
    // Pricomigdale
    'pricomigdale': {
      id: 19,
      name: 'Pricomigdale',
      price: 228,
      originalPrice: 228,
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      },
      variants: [
        { weight: '150g', price: 35, priceValue: 35 },
        { weight: '1kg', price: 205, priceValue: 205 }
      ]
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
      category: 'dulciuri',
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
    'kataif': {
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
    
    // Platou Mixt / Mini Prăjituri
    'platou-mix-mini-prajituri': {
      id: 54,
      name: 'Platou Mixt / Mini Prăjituri',
      price: 228,
      originalPrice: 228,
      category: 'mini-prajituri',
      description: 'Selecție variată de mini prăjituri.',
      longDescription: 'Platoul nostru mixt cu mini prăjituri include o selecție variată de mini prăjituri. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Selecție variată de mini prăjituri'],
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

    // Produse lipsă din carusel
    // Găluști cu prune
    'galusti-cu-prune': {
      id: 55,
      name: 'Găluști cu prune',
      price: 19,
      originalPrice: 19,
      category: 'dulciuri',
      description: 'Găluști tradiționali cu prune fără sâmbure și scorțișoară. Gustul autentic românesc.',
      longDescription: 'Găluștii noștri tradiționali sunt preparați cu cartofi, ou, pesmet, unt și prune fără sâmbure, condimentați cu scorțișoară. Gustul autentic românesc care îți va aminti de copilărie.',
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
      name: 'Caserolă mini prăjituri',
      price: 88,
      originalPrice: 88,
      category: 'mini-prajituri',
      description: 'Caserolă cu mini prăjituri variate: mini tarte, mini eclere, mini amandine, mini kranț.',
      longDescription: 'Caserola noastră cu mini prăjituri include o selecție variată de mini tarte, mini eclere, mini amandine și mini kranț. Perfect pentru gustări sau evenimente.',
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
      price: 11,
      originalPrice: 11,
      category: 'mini-prajituri',
      description: 'Mini amandine cu cacao și cremă.',
      longDescription: 'Mini amandinele noastre sunt preparate cu făină, unt, ouă, zahăr, cacao și cremă. O combinație perfectă de texturi și gusturi.',
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
      price: 9,
      originalPrice: 9,
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
      price: 9,
      originalPrice: 9,
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
      price: 5,
      originalPrice: 5,
      category: 'dulciuri',
      description: 'Fursecuri fragede cu nucă și vanilie.',
      longDescription: 'Fursecurii noștri fragede sunt preparați cu făină, unt, zahăr, nucă și vanilie. O combinație perfectă de texturi și gusturi.',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Nucă', 'Vanilie'],
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
              <Image
                src={`/images/products/${params.slug}.jpg`}
                alt={product.name}
                width={500}
                height={400}
                className="w-full h-64 sm:h-auto object-cover rounded-lg shadow-lg"
              />
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
                  {Math.round(currentPrice * quantity)} RON
                </span>
                {product.originalPrice && product.originalPrice > currentPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {Math.round(product.originalPrice * quantity)} RON
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Descriere</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Variants */}
              {(product as any).variants && (product as any).variants.length > 0 && (
              <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alege greutatea</h3>
                  <div className="flex flex-wrap gap-3">
                    {(product as any).variants.map((variant: any) => (
                  <button
                        key={variant.weight}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setCurrentPrice(variant.price)
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedVariant?.weight === variant.weight
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {variant.weight} - {variant.price} RON
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

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cantitate</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                    >
                    -
                    </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors"
                    >
                    +
                    </button>
                  </div>
              </div>

              {/* Date Selection */}
                <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Alege data livrării</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-left hover:border-primary transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {selectedDate || 'Selectează data'}
                    </span>
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </button>

                  {showCalendar && (
                    <div className="absolute z-10 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 w-full">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => navigateMonth('prev')}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="font-semibold">{formatMonthYear(currentMonth)}</span>
                        <button
                          onClick={() => navigateMonth('next')}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
                          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                            {day}
                          </div>
                        ))}
                        {getDaysInMonth(currentMonth).map((day, index) => (
                      <button
                        key={index}
                            onClick={() => !isDateDisabled(day.date) && handleDateSelect(day.date)}
                            disabled={isDateDisabled(day.date)}
                            className={`
                              p-2 text-sm rounded-lg transition-colors
                              ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                              ${isDateDisabled(day.date) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                              ${isDateSelected(day.date) ? 'bg-primary text-white hover:bg-primary' : ''}
                            `}
                          >
                            {day.date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adaugă în coș</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Cumpără acum</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 space-y-4"
        >
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
        </motion.div>
      </div>
    </div>
  )
}

export default ProductPage
