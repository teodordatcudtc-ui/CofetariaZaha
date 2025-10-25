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

  // Initialize category from URL params
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    } else {
      // If no category in URL, reset to 'all'
      setSelectedCategory('all')
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
    { id: 'torturi', name: 'Torturi', icon: Cake },
    { id: 'prajituri', name: 'Prăjituri', icon: Cookie },
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
    {
      id: 1,
      name: 'Tort de Nuntă Elegant',
      price: 'De la 800 RON',
      priceValue: 800,
      category: 'torturi',
      rating: 5,
      reviews: 24,
      preparationTime: '3-5 zile',
      servings: '50-80 persoane',
      icon: Cake,
      slug: 'tort-nunta-elegant'
    },
    {
      id: 2,
      name: 'Tort de Aniversare',
      price: 'De la 300 RON',
      priceValue: 300,
      category: 'torturi',
      rating: 5,
      reviews: 18,
      preparationTime: '2-3 zile',
      servings: '20-30 persoane',
      icon: Cake,
      slug: 'tort-aniversare'
    },
    {
      id: 3,
      name: 'Tort de Botez',
      price: 'De la 250 RON',
      priceValue: 250,
      category: 'torturi',
      rating: 5,
      reviews: 15,
      preparationTime: '2-3 zile',
      servings: '15-25 persoane',
      icon: Cake,
      slug: 'tort-botez'
    },
    {
      id: 4,
      name: 'Ecler cu Cremă de Vanilie',
      price: '8 RON/buc',
      priceValue: 8,
      category: 'prajituri',
      rating: 5,
      reviews: 32,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie,
      slug: 'ecler-crema-vanilie'
    },
    {
      id: 5,
      name: 'Profiterol cu Ciocolată',
      price: '10 RON/buc',
      priceValue: 10,
      category: 'prajituri',
      rating: 5,
      reviews: 28,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie,
      slug: 'profiterol-ciocolata'
    },
    {
      id: 6,
      name: 'Tiramisu Clasic',
      price: '12 RON/buc',
      priceValue: 12,
      category: 'prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie,
      slug: 'tiramisu-clasic'
    },
    {
      id: 7,
      name: 'Papanași cu Smântână',
      price: '15 RON/porție',
      priceValue: 15,
      category: 'dulciuri',
      rating: 5,
      reviews: 45,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Heart,
      slug: 'papanasi-smantana'
    },
    {
      id: 8,
      name: 'Clătite cu Dulceață',
      price: '12 RON/porție',
      priceValue: 12,
      category: 'dulciuri',
      rating: 5,
      reviews: 38,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Heart,
      slug: 'clatite-dulceata'
    },
    {
      id: 9,
      name: 'Catering Evenimente',
      price: 'De la 50 RON/persoană',
      priceValue: 50,
      category: 'evenimente',
      rating: 5,
      reviews: 12,
      preparationTime: '1-2 săptămâni',
      servings: '50+ persoane',
      icon: Users,
      slug: 'catering-evenimente'
    }
  ]

  // Funcție de sortare
  const sortProducts = (products: any[]) => {
    return [...products].sort((a, b) => {
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
  }

  // Filtrare și sortare produse
  const filteredProducts = sortProducts(
    products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  )

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Produsele Noastre <span className="text-gradient">Speciale</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
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

            <div className="flex flex-col sm:flex-row gap-4 items-center">
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
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${selectedCategory}`}
                variants={fadeInUp}
                className="card group overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                    {/* Pattern decorative */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary/30 rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-primary/20 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-primary/15 rounded-full"></div>
                    </div>
                    
                    {/* Iconița principală */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <product.icon className="h-16 w-16 text-primary" />
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {categories.find(cat => cat.id === product.category)?.name}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <Link
                      href={`/produse/${product.slug}`}
                      className="flex items-center space-x-1 text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <span>Vezi detalii</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
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
            </motion.div>
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
