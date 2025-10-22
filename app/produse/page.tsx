'use client'

import { useState } from 'react'
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
  Phone
} from 'lucide-react'

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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

  // Produse
  const products = [
    {
      id: 1,
      name: 'Tort de Nuntă Elegant',
      description: 'Tort cu 3 etaje, fondant alb și decorațiuni florale personalizate',
      price: 'De la 800 RON',
      category: 'torturi',
      rating: 5,
      reviews: 24,
      preparationTime: '3-5 zile',
      servings: '50-80 persoane',
      icon: Cake
    },
    {
      id: 2,
      name: 'Tort de Aniversare',
      description: 'Tort personalizat cu tematica aleasă de client',
      price: 'De la 300 RON',
      category: 'torturi',
      rating: 5,
      reviews: 18,
      preparationTime: '2-3 zile',
      servings: '20-30 persoane',
      icon: Cake
    },
    {
      id: 3,
      name: 'Tort de Botez',
      description: 'Tort delicat cu decorațiuni pentru copii',
      price: 'De la 250 RON',
      category: 'torturi',
      rating: 5,
      reviews: 15,
      preparationTime: '2-3 zile',
      servings: '15-25 persoane',
      icon: Cake
    },
    {
      id: 4,
      name: 'Ecler cu Cremă de Vanilie',
      description: 'Ecler clasic cu cremă de vanilie și glazură de ciocolată',
      price: '8 RON/buc',
      category: 'prajituri',
      rating: 5,
      reviews: 32,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie
    },
    {
      id: 5,
      name: 'Profiterol cu Ciocolată',
      description: 'Profiterol cu cremă de ciocolată și glazură de ciocolată',
      price: '10 RON/buc',
      category: 'prajituri',
      rating: 5,
      reviews: 28,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie
    },
    {
      id: 6,
      name: 'Tiramisu Clasic',
      description: 'Tiramisu preparat după rețeta tradițională italiană',
      price: '12 RON/buc',
      category: 'prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Cookie
    },
    {
      id: 7,
      name: 'Papanași cu Smântână',
      description: 'Papanași tradiționali cu smântână și dulceață de fructe',
      price: '15 RON/porție',
      category: 'dulciuri',
      rating: 5,
      reviews: 45,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Heart
    },
    {
      id: 8,
      name: 'Clătite cu Dulceață',
      description: 'Clătite delicate cu dulceață de casă de prune',
      price: '12 RON/porție',
      category: 'dulciuri',
      rating: 5,
      reviews: 38,
      preparationTime: 'Zilnic',
      servings: '1 persoană',
      icon: Heart
    },
    {
      id: 9,
      name: 'Catering Evenimente',
      description: 'Servicii complete de catering pentru evenimente speciale',
      price: 'De la 50 RON/persoană',
      category: 'evenimente',
      rating: 5,
      reviews: 12,
      preparationTime: '1-2 săptămâni',
      servings: '50+ persoane',
      icon: Users
    }
  ]

  // Filtrare produse
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Produsele Noastre <span className="text-gradient">Speciale</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
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

            {/* Categorii */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
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
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{product.preparationTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{product.servings}</span>
                      </div>
                    </div>
                    <span className="text-primary font-medium">
                      {product.reviews} recenzii
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-1 text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <span>Comandă</span>
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
