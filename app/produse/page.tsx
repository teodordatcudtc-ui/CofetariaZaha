'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Cake, 
  Cookie, 
  Heart, 
  Star,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Search,
  Phone,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const ProductsPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Initialize category and search from URL params
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory('all')
    }
    
    if (search) {
      setSearchTerm(search)
    } else {
      setSearchTerm('')
    }
  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      if (showSortDropdown && !target.closest('.sort-dropdown')) {
        setShowSortDropdown(false)
      }
      
      if (showFilterDropdown && !target.closest('.filter-dropdown')) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSortDropdown, showFilterDropdown])


  // Animații
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Categorii de produse
  const categories = [
    { id: 'all', name: 'Toate Produsele', icon: Cake },
    { id: 'mini-prajituri', name: 'Mini prăjituri', icon: Cookie },
    { id: 'prajituri', name: 'Prăjituri', icon: Cookie },
    { id: 'torturi', name: 'Torturi', icon: Cake },
    { id: 'dulciuri', name: 'Dulciuri de Casă', icon: Heart },
    { id: 'evenimente', name: 'Evenimente', icon: Users }
  ]

  // Opțiuni de sortare
  const sortOptions = [
    { id: 'name-asc', label: 'Nume A-Z', icon: ArrowUp },
    { id: 'name-desc', label: 'Nume Z-A', icon: ArrowDown },
    { id: 'price-asc', label: 'Preț Crescător', icon: ArrowUp },
    { id: 'price-desc', label: 'Preț Descrescător', icon: ArrowDown },
    { id: 'rating-asc', label: 'Rating Crescător', icon: ArrowUp },
    { id: 'rating-desc', label: 'Rating Descrescător', icon: ArrowDown },
    { id: 'reviews-asc', label: 'Recenzii Crescător', icon: ArrowUp },
    { id: 'reviews-desc', label: 'Recenzii Descrescător', icon: ArrowDown }
  ]

  // Produse
  const products = [
    // Găluști cu prune
    {
      id: 1,
      name: 'Găluști cu prune',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '100g',
      icon: Heart,
      slug: 'galusti-cu-prune',
      ingredients: ['cartofi', 'ou', 'pesmet', 'unt', 'prune fără sâmbure', 'scorțișoară']
    },
    
    // Mini prăjituri
    {
      id: 2,
      name: 'Caserolă mini prăjituri',
      price: '88 RON',
      priceValue: 88,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '300g',
      icon: Cookie,
      slug: 'caserola-mini-prajituri',
      description: 'Mini tarte, mini eclere, mini amandine, mini kranț'
    },
    {
      id: 3,
      name: 'Platou mini prăjituri',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 25,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'platou-mini-prajituri',
      description: 'Mini tarte, mini eclere, mini amandine, mini kranț'
    },
    
    // Mini tarte
    {
      id: 4,
      name: 'Mini tarte bezea și lămâie',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-tarte-bezea-lamai',
      description: 'Savoarea untului împreunează dulceața bezelei cu asprimea lămâi'
    },
    {
      id: 5,
      name: 'Mini tarte',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-tarte'
    },
    {
      id: 6,
      name: 'Mini krant',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-krant',
      ingredients: ['blat nucă', 'cremă de vanilie cu unt', 'crocant nucă caramelizată']
    },
    {
      id: 7,
      name: 'Mini eclere cu ness',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 14,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-eclere-ness'
    },
    {
      id: 8,
      name: 'Mini eclere cu vanilie și ciocolată',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 17,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-eclere-vanilie-ciocolata'
    },
    {
      id: 9,
      name: 'Mini amandine',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 21,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-amandine'
    },
    {
      id: 10,
      name: 'Mini choux',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 13,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-choux'
    },
    {
      id: 11,
      name: 'Mini duo chocolat cu fructe de pădure',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 23,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-duo-chocolat-fructe-padure'
    },
    
    // Fursecuri
    {
      id: 12,
      name: 'Amestec fursecuri',
      price: '127 RON',
      priceValue: 127,
      category: 'dulciuri',
      rating: 5,
      reviews: 28,
      preparationTime: 'Zilnic',
      servings: '500g',
      icon: Heart,
      slug: 'amestec-fursecuri',
      description: 'Pungă sau caserolă',
      variants: [
        { weight: '500g', price: 127, priceValue: 127 },
        { weight: '700g', price: 177, priceValue: 177 }
      ]
    },
    {
      id: 15,
      name: 'Fursecuri fragede cu nucă',
      price: '254 RON/kg',
      priceValue: 254,
      category: 'dulciuri',
      rating: 5,
      reviews: 26,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'fursecuri-fragede-nuca',
      ingredients: ['făină de grâu', 'unt', 'nucă', 'bicarbonat']
    },
    {
      id: 16,
      name: 'Cornulețe cu nucă și gem',
      price: '254 RON/kg',
      priceValue: 254,
      category: 'dulciuri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'cornulete-nuca-gem',
      ingredients: ['aluat fraged cu făină de grâu', 'unt', 'ou', 'nucă', 'gem de fructe de pădure']
    },
    {
      id: 17,
      name: 'Limbi de pisică',
      price: '254 RON/kg',
      priceValue: 254,
      category: 'dulciuri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'limbi-de-pisica',
      ingredients: ['făină grâu', 'unt', 'albuș', 'vanilie']
    },
    {
      id: 18,
      name: 'Fursec cu gem',
      price: '254 RON/kg',
      priceValue: 254,
      category: 'dulciuri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'fursec-cu-gem',
      ingredients: ['aluat fraged cu unt', 'făină grâu', 'ou', 'gem de fructe de pădure']
    },
    {
      id: 19,
      name: 'Fourstafidă',
      price: '254 RON/kg',
      priceValue: 254,
      category: 'dulciuri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'fourstafida',
      ingredients: ['făină grâu', 'unt', 'ou', 'stafide', 'vanilie păstaie', 'rom']
    },
    {
      id: 20,
      name: 'Pricomigdale',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'dulciuri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '1kg (în jur de 30 bucăți)',
      icon: Heart,
      slug: 'pricomigdale',
      ingredients: ['nucă', 'migdale', 'albuș', 'zahăr', 'cremă de ciocolată']
    },
    
    // Torturi
    {
      id: 21,
      name: 'Duo chocolate',
      price: '266 RON/kg',
      priceValue: 266,
      category: 'torturi',
      rating: 5,
      reviews: 30,
      preparationTime: '2-3 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'duo-chocolate-1kg',
      ingredients: ['blat cacao', 'mousse ciocolată neagră', 'fructe de pădure', 'mousse ciocolată albă']
    },
    {
      id: 22,
      name: 'Tort Maria',
      price: '266 RON',
      priceValue: 266,
      category: 'torturi',
      rating: 5,
      reviews: 35,
      preparationTime: '3-5 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-maria',
      ingredients: ['blat alb', 'cremă de vanilie', 'frișcă naturală', 'fructe de pădure'],
      variants: [
        { weight: '1kg', price: 266, priceValue: 266 },
        { weight: '1.5kg', price: 399, priceValue: 399 },
        { weight: '2kg', price: 532, priceValue: 532 }
      ]
    },
    {
      id: 25,
      name: 'Tort mousse de ciocolată și fructe de pădure',
      price: '399 RON',
      priceValue: 399,
      category: 'torturi',
      rating: 5,
      reviews: 26,
      preparationTime: '3-4 zile',
      servings: '1.5kg',
      icon: Cake,
      slug: 'tort-mousse-ciocolata-fructe-padure'
    },
    {
      id: 26,
      name: 'Tort medovika',
      price: '453 RON',
      priceValue: 453,
      category: 'torturi',
      rating: 5,
      reviews: 24,
      preparationTime: '4-5 zile',
      servings: '1700g',
      icon: Cake,
      slug: 'tort-medovika'
    },
    {
      id: 27,
      name: 'Tort pavlova',
      price: '320 RON',
      priceValue: 320,
      category: 'torturi',
      rating: 5,
      reviews: 29,
      preparationTime: '3-4 zile',
      servings: '1200g',
      icon: Cake,
      slug: 'tort-pavlova',
      ingredients: ['bezea', 'piure de fructul pasiunii', 'frișcă naturală', 'mango', 'fructe mixte decor']
    },
    {
      id: 28,
      name: 'Tort diplomat',
      price: '533 RON',
      priceValue: 533,
      category: 'torturi',
      rating: 5,
      reviews: 22,
      preparationTime: '4-5 zile',
      servings: '2kg',
      icon: Cake,
      slug: 'tort-diplomat',
      ingredients: ['cremă de vanilie', 'frișcă naturală', 'blat alb', 'fructe în compot', 'ananas', 'piersici']
    },
    {
      id: 29,
      name: 'Tort red velvet',
      price: '400 RON',
      priceValue: 400,
      category: 'torturi',
      rating: 5,
      reviews: 27,
      preparationTime: '3-4 zile',
      servings: '1.5kg',
      icon: Cake,
      slug: 'tort-red-velvet',
      ingredients: ['făină', 'unt', 'zahăr', 'ou', 'kefir', 'cremă de brânză', 'frișcă', 'colorant alimentar roșu', 'bicarbonat']
    },
    
    // Cozonac
    {
      id: 30,
      name: 'Cozonac traditional cu nucă și cacao',
      price: '198 RON',
      priceValue: 198,
      category: 'dulciuri',
      rating: 5,
      reviews: 40,
      preparationTime: '2-3 zile',
      servings: '1kg',
      icon: Heart,
      slug: 'cozonac-traditional-nuca-cacao',
      description: 'Cozonac tradițional realizat cu unt, nucă, ouă în coajă'
    },
    
    // Prăjituri
    {
      id: 31,
      name: 'Pavlova',
      price: '35 RON',
      priceValue: 35,
      category: 'prajituri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '100g',
      icon: Cookie,
      slug: 'pavlova',
      ingredients: ['albuș', 'zahăr', 'amidon', 'frișcă naturală', 'fructul pasiunii', 'fructe mixte']
    },
    {
      id: 32,
      name: 'Kataif',
      price: '32 RON',
      priceValue: 32,
      category: 'prajituri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Cookie,
      slug: 'kataif',
      ingredients: ['făină', 'frișcă naturală', 'coajă lămâie', 'portocală']
    },
    {
      id: 33,
      name: 'Amandină',
      price: '36 RON',
      priceValue: 36,
      category: 'prajituri',
      rating: 5,
      reviews: 21,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'amandina',
      ingredients: ['făină', 'cacao', 'unt', 'zahăr', 'rom esență']
    },
    {
      id: 34,
      name: 'Savarină',
      price: '36 RON',
      priceValue: 36,
      category: 'prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '280g',
      icon: Cookie,
      slug: 'savarina',
      ingredients: ['făină', 'ouă', 'frișcă naturală', 'miere', 'drojdie', 'rom']
    },
    {
      id: 35,
      name: 'Boema',
      price: '40 RON',
      priceValue: 40,
      category: 'prajituri',
      rating: 5,
      reviews: 17,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'boema',
      ingredients: ['frișcă naturală', 'făină', 'ciocolată', 'ouă', 'ulei', 'unt', 'rom', 'cacao', 'praf de copt']
    },
    {
      id: 36,
      name: 'Mousse 3 ciocolate',
      price: '41 RON',
      priceValue: 41,
      category: 'prajituri',
      rating: 5,
      reviews: 23,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'mousse-3-ciocolate',
      ingredients: ['frișcă naturală', 'ciocolată albă', 'neagră', 'cu lapte', 'făină', 'ouă', 'zahăr', 'gelatină']
    },
    {
      id: 37,
      name: 'Medovika',
      price: '45 RON',
      priceValue: 45,
      category: 'prajituri',
      rating: 5,
      reviews: 25,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'medovika-prajitura',
      ingredients: ['făină', 'mascarpone', 'miere', 'cremă de brânză', 'zahăr', 'fructe de pădure', 'rodie mere', 'friscă naturală', 'unt', 'ouă', 'gelatină', 'bicarbonat']
    },
    {
      id: 38,
      name: 'Cremes',
      price: '296 RON/kg',
      priceValue: 296,
      category: 'prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'cremes',
      ingredients: ['foietaj: unt', 'făină', 'sare', 'cremă de vanilie', 'frișcă', 'gelatină']
    },
    
    // Saleuri
    {
      id: 39,
      name: 'Saleuri',
      price: '67 RON',
      priceValue: 67,
      category: 'dulciuri',
      rating: 5,
      reviews: 12,
      preparationTime: 'Zilnic',
      servings: '250g',
      icon: Heart,
      slug: 'saleuri',
      ingredients: ['făină', 'unt', 'telemea de vacă']
    },
    
    // Bobfistic
    {
      id: 40,
      name: 'Bobfistic',
      price: '50 RON',
      priceValue: 50,
      category: 'dulciuri',
      rating: 5,
      reviews: 14,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Heart,
      slug: 'bobfistic',
      ingredients: ['crocant de biscuite cu pastă pură de fistic', 'mousse de fistic cu ciocolată', 'jeleu din fructe de pădure']
    },
    
    // Înghețată
    {
      id: 41,
      name: 'Gelato',
      price: '115 RON',
      priceValue: 115,
      category: 'dulciuri',
      rating: 5,
      reviews: 33,
      preparationTime: 'Zilnic',
      servings: '500g',
      icon: Heart,
      slug: 'gelato',
      description: 'Înghețată artizanală realizată în laboratorul nostru cu ingrediente naturale, fructe congelate, fructe proaspete, pastă pură de fistic, pastă pură de ciocolată, etc',
      ingredients: ['fructe congelate', 'fructe proaspete', 'pastă pură de fistic', 'pastă pură de ciocolată'],
      flavors: ['Straciatella, mango', 'fistic, vanilie', 'cheesecake, ciocolată', 'straciatella, fistic', 'vanilie, straciatella', 'ciocolată cu îndulcitor, căpșuni', 'căpșuni, mango'],
      variants: [
        { weight: '500g', price: 115, priceValue: 115 },
        { weight: '1kg', price: 234, priceValue: 234 }
      ]
    }
  ]

  // Funcție de sortare cu grupare pe categorii
  const sortProductsByCategory = (products: any[]) => {
    // Grupează produsele pe categorii
    const groupedProducts = products.reduce((groups: any, product: any) => {
      const category = product.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(product)
      return groups
    }, {})

    // Sortează produsele în cadrul fiecărui grup
    Object.keys(groupedProducts).forEach(category => {
      groupedProducts[category] = [...groupedProducts[category]].sort((a, b) => {
        let aValue, bValue
        
        // Parse sort option (e.g., 'name-asc' -> 'name' and 'asc')
        const [sortField, sortDirection] = sortBy.split('-')
        
        switch (sortField) {
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'price':
            aValue = a.priceValue
            bValue = b.priceValue
            break
          case 'rating':
            aValue = a.rating
            bValue = b.rating
            break
          case 'reviews':
            aValue = a.reviews
            bValue = b.reviews
            break
          default:
            return 0
        }
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
      })
    })

    return groupedProducts
  }

  // Filtrare și sortare produse cu grupare pe categorii
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedProducts = sortProductsByCategory(filteredProducts)

  return (
    <div className="min-h-screen pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative py-2 sm:py-4 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Produsele Noastre <span className="text-gradient">Speciale</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Descoperă selecția noastră de torturi personalizate, prăjituri artizanale 
              și dulciuri de casă preparate cu ingrediente de cea mai bună calitate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtre și Căutare */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Căutare */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex flex-row gap-4 items-center">
              {/* Filtrare */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtrează</span>
                  <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                    {selectedCategory === 'all' ? 'Toate' : categories.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                </button>

                {showFilterDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            const url = category.id === 'all' ? '/produse' : `/produse?category=${category.id}`
                            router.push(url)
                            setShowFilterDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 ${
                            selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sortare */}
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sortare</span>
                  <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                    {sortOptions.find(opt => opt.id === sortBy)?.label.split(' ')[0]}
                  </span>
                </button>

                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id)
                            setShowSortDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 ${
                            sortBy === option.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                          }`}
                        >
                          <option.icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista Produse */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {Object.keys(groupedProducts).length > 0 ? (
            Object.entries(groupedProducts).map(([categoryKey, categoryProducts]) => {
              const categoryInfo = categories.find(cat => cat.id === categoryKey)
              if (!categoryInfo) return null
              
              return (
                <div key={categoryKey} className="mb-12">
                  {/* Subtitlu categorie */}
                  <div className="flex items-center justify-center mb-6">
                    <categoryInfo.icon className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">{categoryInfo.name}</h2>
                  </div>
                  
                  {/* Produsele din categoria respectivă */}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {(categoryProducts as any[]).map((product: any, index: number) => (
                      <Link key={`${product.id}-${categoryKey}`} href={`/produse/${product.slug}`}>
                        <div className="group overflow-hidden cursor-pointer rounded-lg bg-white shadow-lg h-full flex flex-col">
                          <div className="relative overflow-hidden rounded-t-lg h-80">
                            <Image
                              src={`/images/products/${product.slug}.jpg`}
                              alt={product.name}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200 flex-grow">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-base font-bold text-primary">
                                {product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nu am găsit produse
              </h3>
              <p className="text-gray-600 mb-6">
                Încearcă să modifici filtrele sau termenii de căutare.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                }}
                className="btn-primary"
              >
                Resetează Filtrele
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Nu Găsești Ce Cauți?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Creăm produse personalizate pentru fiecare gust și eveniment. 
              Contactează-ne pentru a discuta despre tortul sau dulciurile 
              perfecte pentru tine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Comandă Personalizată
              </Link>
              <a
                href="tel:0731195126"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                0731 195 126
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
