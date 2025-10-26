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
  Minus,
  Plus
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
    'galusti-cu-prune': {
      id: 1,
      name: 'Găluști cu prune',
      price: 19,
      originalPrice: 19,
      category: 'dulciuri',
      description: 'Găluști tradiționali cu prune fără sâmbure și scorțișoară. Gustul autentic românesc.',
      longDescription: 'Găluștii noștri tradiționali sunt preparați cu cartofi, ou, pesmet, unt și prune fără sâmbure, condimentați cu scorțișoară. Gustul autentic românesc care îți va aminti de copilărie.',
      ingredients: ['cartofi', 'ou', 'pesmet', 'unt', 'prune fără sâmbure', 'scorțișoară'],
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
    'caserola-mini-prajituri': {
      id: 2,
      name: 'Caserolă mini prăjituri',
      price: 88,
      originalPrice: 88,
      category: 'prajituri',
      description: 'Caserolă cu mini prăjituri variate: mini tarte, mini eclere, mini amandine, mini kranț.',
      longDescription: 'Caserola noastră cu mini prăjituri include o selecție variată de mini tarte, mini eclere, mini amandine și mini kranț. Perfect pentru gustări sau evenimente.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'ciocolată'],
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
    'platou-mini-prajituri-1kg': {
      id: 3,
      name: 'Platou mini prăjituri 1kg',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Platou cu mini prăjituri variate la kilogram: mini tarte, mini eclere, mini amandine, mini kranț.',
      longDescription: 'Platoul nostru cu mini prăjituri la kilogram include o selecție variată de mini tarte, mini eclere, mini amandine și mini kranț. Perfect pentru evenimente mai mari.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'ciocolată'],
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
    'platou-mini-prajituri': {
      id: 3,
      name: 'Platou mini prăjituri',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Platou cu mini prăjituri variate: mini tarte, mini eclere, mini amandine, mini kranț.',
      longDescription: 'Platoul nostru cu mini prăjituri include o selecție variată de mini tarte, mini eclere, mini amandine și mini kranț. Perfect pentru evenimente.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'ciocolată'],
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
        { weight: '600g', price: 175, priceValue: 175 },
        { weight: '1kg', price: 296, priceValue: 296 }
      ]
    },
    'mini-tarte-bezea-lamai': {
      id: 5,
      name: 'Mini tarte bezea și lămâie',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini tarte cu bezea și lămâie la kilogram. Savoarea untului împreună cu dulceața bezelei și asprimea lămâii.',
      longDescription: 'Mini tarte-urile noastre cu bezea și lămâie combină savoarea untului cu dulceața bezelei și asprimea lămâii. O combinație perfectă de gusturi.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'lămâie', 'vanilie'],
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
    'mini-tarte': {
      id: 6,
      name: 'Mini tarte',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini tarte la kilogram cu diverse arome și umpluturi.',
      longDescription: 'Mini tarte-urile noastre la kilogram sunt preparate cu diverse arome și umpluturi, oferind o varietate de gusturi pentru toate preferințele.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'diverse umpluturi'],
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
    'mini-krant': {
      id: 7,
      name: 'Mini krant 1kg',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini krant la kilogram cu blat nucă, cremă de vanilie cu unt și crocant nucă caramelizată.',
      longDescription: 'Mini krant-ul nostru la kilogram este preparat cu blat nucă, cremă de vanilie cu unt și crocant nucă caramelizată. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'nucă', 'unt', 'ouă', 'zahăr', 'vanilie', 'caramel'],
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
    'mini-eclere-ness': {
      id: 8,
      name: 'Mini eclere cu ness',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini eclere cu ness la kilogram. Delicat și savuros.',
      longDescription: 'Mini eclere-urile noastre cu ness la kilogram sunt preparate cu atenție la detalii, oferind un gust delicat și savuros.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'ness', 'vanilie'],
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
    'mini-eclere-vanilie-ciocolata': {
      id: 9,
      name: 'Mini eclere cu vanilie și ciocolată',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini eclere cu vanilie și ciocolată la kilogram. Combinația perfectă de gusturi.',
      longDescription: 'Mini eclere-urile noastre cu vanilie și ciocolată la kilogram combină dulceața vaniliei cu bogăția ciocolatei, oferind o experiență gustativă deosebită.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'ciocolată'],
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
    'mini-amandine': {
      id: 10,
      name: 'Mini amandine',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini amandine la kilogram. Delicat și savuros.',
      longDescription: 'Mini amandine-urile noastre la kilogram sunt preparate cu atenție la detalii, oferind un gust delicat și savuros.',
      ingredients: ['făină', 'migdale', 'unt', 'ouă', 'zahăr', 'vanilie'],
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
    'mini-choux': {
      id: 11,
      name: 'Mini choux',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini choux la kilogram. Delicat și savuros.',
      longDescription: 'Mini choux-urile noastre la kilogram sunt preparate cu atenție la detalii, oferind un gust delicat și savuros.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'diverse umpluturi'],
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
    'mini-duo-chocolat-fructe-padure': {
      id: 12,
      name: 'Mini duo chocolat cu fructe de pădure',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Mini duo chocolat cu fructe de pădure la kilogram. Combinația perfectă de ciocolată și fructe.',
      longDescription: 'Mini duo-ul nostru chocolat cu fructe de pădure la kilogram combină bogăția ciocolatei cu prospețimea fructelor de pădure, oferind o experiență gustativă deosebită.',
      ingredients: ['făină', 'ciocolată', 'fructe de pădure', 'unt', 'ouă', 'zahăr'],
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
    'amestec-fursecuri': {
      id: 13,
      name: 'Amestec fursecuri',
      price: 127,
      originalPrice: 127,
      category: 'dulciuri',
      description: 'Amestec fursecuri în pungă sau caserolă. Varietate de fursecuri tradiționale.',
      longDescription: 'Amestecul nostru de fursecuri include o varietate de fursecuri tradiționale, perfect pentru gustări sau evenimente. Disponibil în pungă sau caserolă.',
      ingredients: ['făină', 'unt', 'ouă', 'zahăr', 'vanilie', 'diverse arome'],
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
        { weight: '500g', price: 127, priceValue: 127 },
        { weight: '700g', price: 177, priceValue: 177 }
      ]
    },
    'fursecuri-fragede-nuca': {
      id: 14,
      name: 'Fursecuri fragede cu nucă',
      price: 254,
      originalPrice: 254,
      category: 'dulciuri',
      description: 'Fursecuri fragede cu nucă la kilogram. Făină de grâu, unt, nucă și bicarbonat.',
      longDescription: 'Fursecurii noștri fragede cu nucă la kilogram sunt preparați cu făină de grâu, unt, nucă și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină de grâu', 'unt', 'nucă', 'bicarbonat'],
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
    'cornulete-nuca-gem': {
      id: 15,
      name: 'Cornulețe cu nucă și gem',
      price: 254,
      originalPrice: 254,
      category: 'dulciuri',
      description: 'Cornulețe cu nucă și gem la kilogram. Aluat fraged cu făină de grâu, unt, ou, nucă și gem de fructe de pădure.',
      longDescription: 'Cornulețele noastre cu nucă și gem la kilogram sunt preparate cu aluat fraged din făină de grâu, unt, ou, nucă și gem de fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină de grâu', 'unt', 'ou', 'nucă', 'gem de fructe de pădure'],
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
    'limbi-de-pisica': {
      id: 16,
      name: 'Limbi de pisică',
      price: 254,
      originalPrice: 254,
      category: 'dulciuri',
      description: 'Limbi de pisică la kilogram. Făină de grâu, unt, albuș și vanilie.',
      longDescription: 'Limbii noștri de pisică la kilogram sunt preparați cu făină de grâu, unt, albuș și vanilie. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină de grâu', 'unt', 'albuș', 'vanilie'],
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
    'fursec-cu-gem': {
      id: 17,
      name: 'Fursec cu gem',
      price: 254,
      originalPrice: 254,
      category: 'dulciuri',
      description: 'Fursec cu gem la kilogram. Aluat fraged cu unt, făină de grâu, ou și gem de fructe de pădure.',
      longDescription: 'Fursecul nostru cu gem la kilogram este preparat cu aluat fraged din unt, făină de grâu, ou și gem de fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină de grâu', 'unt', 'ou', 'gem de fructe de pădure'],
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
    'fourstafida': {
      id: 18,
      name: 'Fourstafidă',
      price: 254,
      originalPrice: 254,
      category: 'dulciuri',
      description: 'Fourstafidă la kilogram. Făină de grâu, unt, ou, stafide, vanilie păstaie și rom.',
      longDescription: 'Fourstafida noastră la kilogram este preparată cu făină de grâu, unt, ou, stafide, vanilie păstaie și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină de grâu', 'unt', 'ou', 'stafide', 'vanilie păstaie', 'rom'],
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
    'pricomigdale': {
      id: 19,
      name: 'Pricomigdale',
      price: 296,
      originalPrice: 296,
      category: 'dulciuri',
      description: 'Pricomigdale la kilogram (în jur de 30 bucăți). Nucă, migdale, albuș, zahăr și cremă de ciocolată.',
      longDescription: 'Pricomigdalele noastre la kilogram (în jur de 30 bucăți) sunt preparate cu nucă, migdale, albuș, zahăr și cremă de ciocolată. O combinație perfectă de texturi și gusturi.',
      ingredients: ['nucă', 'migdale', 'albuș', 'zahăr', 'cremă de ciocolată'],
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
    'duo-chocolate-1kg': {
      id: 20,
      name: 'Duo chocolate 1kg',
      price: 266,
      originalPrice: 266,
      category: 'torturi',
      description: 'Tort duo chocolate 1kg cu blat cacao, mousse ciocolată neagră, fructe de pădure și mousse ciocolată albă.',
      longDescription: 'Tortul nostru duo chocolate 1kg este preparat cu blat cacao, mousse ciocolată neagră, fructe de pădure și mousse ciocolată albă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['blat cacao', 'mousse ciocolată neagră', 'fructe de pădure', 'mousse ciocolată albă'],
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
    'tort-maria': {
      id: 21,
      name: 'Tort Maria 2kg',
      price: 532,
      originalPrice: 532,
      category: 'torturi',
      description: 'Tort Maria 2kg cu blat alb, cremă de vanilie, frișcă naturală și fructe de pădure.',
      longDescription: 'Tortul nostru Maria 2kg este preparat cu blat alb, cremă de vanilie, frișcă naturală și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['blat alb', 'cremă de vanilie', 'frișcă naturală', 'fructe de pădure'],
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
    'tort-maria-1kg': {
      id: 22,
      name: 'Tort Maria 1kg',
      price: 266,
      originalPrice: 266,
      category: 'torturi',
      description: 'Tort Maria 1kg cu cremă de vanilie, frișcă naturală și fructe de pădure.',
      longDescription: 'Tortul nostru Maria 1kg este preparat cu cremă de vanilie, frișcă naturală și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['cremă de vanilie', 'frișcă naturală', 'fructe de pădure'],
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
    'tort-maria-1-5kg': {
      id: 23,
      name: 'Tort Maria 1.5kg',
      price: 399,
      originalPrice: 399,
      category: 'torturi',
      description: 'Tort Maria 1.5kg cu blat de vanilie, cremă de vanilie aerată cu frișcă naturală și fructe de pădure.',
      longDescription: 'Tortul nostru Maria 1.5kg este preparat cu blat de vanilie, cremă de vanilie aerată cu frișcă naturală și fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['blat de vanilie', 'cremă de vanilie aerată', 'frișcă naturală', 'fructe de pădure'],
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
    'tort-mousse-ciocolata-fructe-padure': {
      id: 24,
      name: 'Tort mousse de ciocolată și fructe de pădure',
      price: 399,
      originalPrice: 399,
      category: 'torturi',
      description: 'Tort mousse de ciocolată și fructe de pădure 1.5kg. Delicat și savuros.',
      longDescription: 'Tortul nostru mousse de ciocolată și fructe de pădure 1.5kg este preparat cu atenție la detalii, oferind un gust delicat și savuros.',
      ingredients: ['mousse ciocolată', 'fructe de pădure', 'blat', 'cremă'],
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
    'tort-medovika': {
      id: 25,
      name: 'Tort medovika',
      price: 453,
      originalPrice: 453,
      category: 'torturi',
      description: 'Tort medovika 1700g. Delicat și savuros.',
      longDescription: 'Tortul nostru medovika 1700g este preparat cu atenție la detalii, oferind un gust delicat și savuros.',
      ingredients: ['făină', 'miere', 'unt', 'ouă', 'diverse condimente'],
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
    'tort-pavlova': {
      id: 26,
      name: 'Tort pavlova',
      price: 320,
      originalPrice: 320,
      category: 'torturi',
      description: 'Tort pavlova 1200g cu bezea, piure de fructul pasiunii, frișcă naturală, mango și fructe mixte decor.',
      longDescription: 'Tortul nostru pavlova 1200g este preparat cu bezea, piure de fructul pasiunii, frișcă naturală, mango și fructe mixte decor. O combinație perfectă de texturi și gusturi.',
      ingredients: ['bezea', 'piure fructul pasiunii', 'frișcă naturală', 'mango', 'fructe mixte'],
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
    'tort-diplomat': {
      id: 27,
      name: 'Tort diplomat 2kg',
      price: 533,
      originalPrice: 533,
      category: 'torturi',
      description: 'Tort diplomat 2kg cu cremă de vanilie, frișcă naturală, blat alb și fructe în compot (ananas, piersici).',
      longDescription: 'Tortul nostru diplomat 2kg este preparat cu cremă de vanilie, frișcă naturală, blat alb și fructe în compot (ananas, piersici). O combinație perfectă de texturi și gusturi.',
      ingredients: ['cremă de vanilie', 'frișcă naturală', 'blat alb', 'fructe în compot', 'ananas', 'piersici'],
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
    'tort-red-velvet': {
      id: 28,
      name: 'Tort red velvet',
      price: 400,
      originalPrice: 400,
      category: 'torturi',
      description: 'Tort red velvet 1.5kg cu făină, unt, zahăr, ou, kefir, cremă de brânză, frișcă, colorant alimentar roșu și bicarbonat.',
      longDescription: 'Tortul nostru red velvet 1.5kg este preparat cu făină, unt, zahăr, ou, kefir, cremă de brânză, frișcă, colorant alimentar roșu și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'unt', 'zahăr', 'ou', 'kefir', 'cremă de brânză', 'frișcă', 'colorant alimentar roșu', 'bicarbonat'],
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
    'cozonac-traditional-nuca-cacao': {
      id: 29,
      name: 'Cozonac traditional cu nucă și cacao',
      price: 198,
      originalPrice: 198,
      category: 'dulciuri',
      description: 'Cozonac traditional cu nucă și cacao 1kg. Cozonac tradițional realizat cu unt, nucă și ouă în coajă.',
      longDescription: 'Cozonacul nostru traditional cu nucă și cacao 1kg este realizat cu unt, nucă și ouă în coajă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'unt', 'nucă', 'ouă în coajă', 'cacao', 'zahăr', 'drojdie'],
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
    'pavlova': {
      id: 30,
      name: 'Pavlova 100g',
      price: 35,
      originalPrice: 35,
      category: 'prajituri',
      description: 'Pavlova 100g cu albuș, zahăr, amidon, frișcă naturală, fructul pasiunii și fructe mixte.',
      longDescription: 'Pavlova noastră 100g este preparată cu albuș, zahăr, amidon, frișcă naturală, fructul pasiunii și fructe mixte. O combinație perfectă de texturi și gusturi.',
      ingredients: ['albuș', 'zahăr', 'amidon', 'frișcă naturală', 'fructul pasiunii', 'fructe mixte'],
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
    'kataif': {
      id: 31,
      name: 'Kataif',
      price: 32,
      originalPrice: 32,
      category: 'prajituri',
      description: 'Kataif 200g cu făină, frișcă naturală, coajă lămâie și portocală.',
      longDescription: 'Kataiful nostru 200g este preparat cu făină, frișcă naturală, coajă lămâie și portocală. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'frișcă naturală', 'coajă lămâie', 'portocală'],
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
    'amandina': {
      id: 32,
      name: 'Amandină',
      price: 36,
      originalPrice: 36,
      category: 'prajituri',
      description: 'Amandină 150g cu făină, cacao, unt, zahăr și rom esență.',
      longDescription: 'Amandina noastră 150g este preparată cu făină, cacao, unt, zahăr și rom esență. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'cacao', 'unt', 'zahăr', 'rom esență'],
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
    'savarina': {
      id: 33,
      name: 'Savarină',
      price: 36,
      originalPrice: 36,
      category: 'prajituri',
      description: 'Savarină 280g cu făină, ouă, frișcă naturală, miere, drojdie și rom.',
      longDescription: 'Savarina noastră 280g este preparată cu făină, ouă, frișcă naturală, miere, drojdie și rom. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'ouă', 'frișcă naturală', 'miere', 'drojdie', 'rom'],
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
    'boema': {
      id: 34,
      name: 'Boema',
      price: 40,
      originalPrice: 40,
      category: 'prajituri',
      description: 'Boema 150g cu frișcă naturală, făină, ciocolată, ouă, ulei, unt, rom, cacao și praf de copt.',
      longDescription: 'Boema noastră 150g este preparată cu frișcă naturală, făină, ciocolată, ouă, ulei, unt, rom, cacao și praf de copt. O combinație perfectă de texturi și gusturi.',
      ingredients: ['frișcă naturală', 'făină', 'ciocolată', 'ouă', 'ulei', 'unt', 'rom', 'cacao', 'praf de copt'],
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
    'mousse-3-ciocolate': {
      id: 35,
      name: 'Mousse 3 ciocolate',
      price: 41,
      originalPrice: 41,
      category: 'prajituri',
      description: 'Mousse 3 ciocolate 150g cu frișcă naturală, ciocolată albă, neagră, cu lapte, făină, ouă, zahăr și gelatină.',
      longDescription: 'Mousse-ul nostru 3 ciocolate 150g este preparat cu frișcă naturală, ciocolată albă, neagră, cu lapte, făină, ouă, zahăr și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['frișcă naturală', 'ciocolată albă', 'ciocolată neagră', 'ciocolată cu lapte', 'făină', 'ouă', 'zahăr', 'gelatină'],
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
    'medovika-prajitura': {
      id: 36,
      name: 'Medovika 150g',
      price: 45,
      originalPrice: 45,
      category: 'prajituri',
      description: 'Medovika 150g cu făină, mascarpone, miere, cremă de brânză, zahăr, fructe de pădure, rodie mere, frișcă naturală, unt, ouă, gelatină și bicarbonat.',
      longDescription: 'Medovika noastră 150g este preparată cu făină, mascarpone, miere, cremă de brânză, zahăr, fructe de pădure, rodie mere, frișcă naturală, unt, ouă, gelatină și bicarbonat. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'mascarpone', 'miere', 'cremă de brânză', 'zahăr', 'fructe de pădure', 'rodie mere', 'frișcă naturală', 'unt', 'ouă', 'gelatină', 'bicarbonat'],
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
    'cremes': {
      id: 37,
      name: 'Cremes',
      price: 296,
      originalPrice: 296,
      category: 'prajituri',
      description: 'Cremes la kilogram cu foietaj (unt, făină, sare), cremă de vanilie, frișcă și gelatină.',
      longDescription: 'Cremes-urile noastre la kilogram sunt preparate cu foietaj (unt, făină, sare), cremă de vanilie, frișcă și gelatină. O combinație perfectă de texturi și gusturi.',
      ingredients: ['foietaj', 'unt', 'făină', 'sare', 'cremă de vanilie', 'frișcă', 'gelatină'],
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
    'saleuri': {
      id: 38,
      name: 'Saleuri',
      price: 67,
      originalPrice: 67,
      category: 'dulciuri',
      description: 'Saleuri 250g cu făină, unt și telemea de vacă.',
      longDescription: 'Saleurile noastre 250g sunt preparate cu făină, unt și telemea de vacă. O combinație perfectă de texturi și gusturi.',
      ingredients: ['făină', 'unt', 'telemea de vacă'],
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
    'bobfistic': {
      id: 39,
      name: 'Bobfistic',
      price: 50,
      originalPrice: 50,
      category: 'dulciuri',
      description: 'Bobfistic 150g cu crocant de biscuite cu pastă pură de fistic, mousse de fistic cu ciocolată și jeleu din fructe de pădure.',
      longDescription: 'Bobfisticul nostru 150g este preparat cu crocant de biscuite cu pastă pură de fistic, mousse de fistic cu ciocolată și jeleu din fructe de pădure. O combinație perfectă de texturi și gusturi.',
      ingredients: ['crocant biscuite', 'pastă pură de fistic', 'mousse fistic', 'ciocolată', 'jeleu fructe de pădure'],
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
    'gelato': {
      id: 40,
      name: 'Gelato',
      price: 115,
      originalPrice: 115,
      category: 'dulciuri',
      description: 'Înghețată artizanală realizată în laboratorul nostru cu ingrediente naturale, fructe congelate, fructe proaspete, pastă pură de fistic, pastă pură de ciocolată, etc.',
      longDescription: 'Înghețata noastră artizanală este realizată în laboratorul nostru cu ingrediente naturale, fructe congelate, fructe proaspete, pastă pură de fistic, pastă pură de ciocolată, etc. Arome disponibile: Straciatella, mango, fistic, vanilie, cheesecake, ciocolată, căpșuni.',
      ingredients: ['ingrediente naturale', 'fructe congelate', 'fructe proaspete', 'pastă pură de fistic', 'pastă pură de ciocolată'],
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
      flavors: ['Straciatella', 'Mango', 'Fistic', 'Vanilie', 'Cheesecake', 'Ciocolată', 'Căpșuni'],
      variants: [
        { weight: '500g', price: 115, priceValue: 115 },
        { weight: '1kg', price: 234, priceValue: 234 }
      ]
    },
    'gelato-1kg': {
      id: 41,
      name: 'Gelato 1kg',
      price: 234,
      originalPrice: 234,
      category: 'dulciuri',
      description: 'Înghețată artizanală 1kg realizată în laboratorul nostru cu ingrediente naturale, fructe congelate, fructe proaspete, pastă pură de fistic, pastă pură de ciocolată, etc.',
      longDescription: 'Înghețata noastră artizanală 1kg este realizată în laboratorul nostru cu ingrediente naturale, fructe congelate, fructe proaspete, pastă pură de fistic, pastă pură de ciocolată, etc. Arome disponibile: Straciatella, mango, fistic, vanilie, cheesecake, ciocolată, căpșuni.',
      ingredients: ['ingrediente naturale', 'fructe congelate', 'fructe proaspete', 'pastă pură de fistic', 'pastă pură de ciocolată'],
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
      flavors: ['Straciatella', 'Mango', 'Fistic', 'Vanilie', 'Cheesecake', 'Ciocolată', 'Căpșuni']
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
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Data livrării */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data livrării</h3>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                  >
                    {selectedDate || 'Selectează data'}
                  </button>
                  
                  {showCalendar && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => navigateMonth('prev')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <h4 className="font-semibold text-gray-900">
                          {currentMonth.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button
                          onClick={() => navigateMonth('next')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day.date)}
                            disabled={isDateDisabled(day.date)}
                            className={`p-2 text-sm rounded-lg transition-colors duration-200 ${
                              isDateSelected(day.date)
                                ? 'bg-primary text-white'
                                : day.isCurrentMonth
                                ? 'hover:bg-gray-100 text-gray-900'
                                : 'text-gray-400'
                            } ${
                              isDateDisabled(day.date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            {day.date.getDate()}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Cantitate */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cantitate</h3>
                {(product as any).variants ? (
                  <div className="flex flex-wrap gap-2">
                    {(product as any).variants.map((variant: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedVariant(variant)
                          setCurrentPrice(variant.price)
                          setQuantity(1)
                        }}
                        className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                          selectedVariant && selectedVariant.weight === variant.weight
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {variant.weight} - {variant.price} RON
                      </button>
                    ))}
                  </div>
                ) : product.category === 'torturi' ? (
                  <div className="flex space-x-2">
                    {[
                      { weight: '2kg (10 persoane)', multiplier: 1 },
                      { weight: '3kg (15 persoane)', multiplier: 1.5 },
                      { weight: '5kg (25 persoane)', multiplier: 2.5 }
                    ].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setQuantity(option.multiplier)}
                        className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                          quantity === option.multiplier
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {option.weight}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Arome (pentru gelato) */}
              {(product as any).flavors && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alege aroma</h3>
                  <div className="flex flex-wrap gap-2">
                    {(product as any).flavors.map((flavor: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                          selectedFlavor === flavor
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
                >
                  Adaugă în coș
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
                >
                  Cumpără acum
                </button>
              </div>

              {/* Taxe și transport */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Taxe și transport</h4>
                <p className="text-sm text-gray-600">
                  Transport gratuit pentru comenzi peste 200 RON în București și Ilfov.
                  Pentru comenzi sub 200 RON, taxa de transport este de 15 RON.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 space-y-8"
        >
          {/* Ingrediente */}
          {product.ingredients && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <button
                onClick={() => toggleSection('ingredients')}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-xl font-semibold text-gray-900">Ingrediente</h3>
                <motion.div
                  animate={{ rotate: expandedSections.ingredients ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections.ingredients ? 'auto' : 0,
                  opacity: expandedSections.ingredients ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="capitalize">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}

          {/* Caracteristici */}
          {product.features && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-xl font-semibold text-gray-900">Caracteristici</h3>
                <motion.div
                  animate={{ rotate: expandedSections.features ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections.features ? 'auto' : 0,
                  opacity: expandedSections.features ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-gray-600">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Informații livrare */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Informații livrare</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-900">Timp livrare</p>
                  <p className="text-sm text-gray-600">{product.delivery.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-900">Zonă livrare</p>
                  <p className="text-sm text-gray-600">{product.delivery.area}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-900">Ridicare</p>
                  <p className="text-sm text-gray-600">{product.delivery.pickup}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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