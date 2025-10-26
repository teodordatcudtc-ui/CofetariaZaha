"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Cake,
  Heart,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  Phone,
  Cookie,
} from "lucide-react"

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Animații pentru secțiuni
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Imagini pentru carusel
  const carouselImages = [
    {
      id: 1,
      title: "Dulciuri Artizanale",
      description: "Creații unice pentru momente speciale",
      image: "/images/hero/hero-1.jpg",
    },
    {
      id: 2,
      title: "Prăjituri Tradiționale",
      description: "Gusturi autentice românești",
      image: "/images/hero/hero-2.jpg",
    },
    {
      id: 3,
      title: "Dulciuri de Casă",
      description: "Preparate cu pasiune și dragoste",
      image: "/images/hero/hero-3.jpg",
    },
  ]

  // Date pentru produse
  const featuredProducts = [
    {
      id: 1,
      name: "Găluști cu prune",
      price: "19 RON",
      category: "dulciuri",
      icon: Heart,
      slug: "galusti-cu-prune",
    },
    {
      id: 2,
      name: "Caserolă mini prăjituri",
      price: "88 RON",
      category: "mini-prajituri",
      icon: Cookie,
      slug: "caserola-mini-prajituri",
    },
    {
      id: 3,
      name: "Mini tarte",
      price: "8 RON",
      category: "mini-prajituri",
      icon: Cookie,
      slug: "mini-tarte",
    },
    {
      id: 4,
      name: "Mini amandine",
      price: "11 RON",
      category: "mini-prajituri",
      icon: Cookie,
      slug: "mini-amandine",
    },
    {
      id: 5,
      name: "Mini eclere cu vanilie și ciocolată",
      price: "9 RON",
      category: "mini-prajituri",
      icon: Cookie,
      slug: "mini-eclere-vanilie-ciocolata",
    },
    {
      id: 6,
      name: "Mini eclere cu ness",
      price: "9 RON",
      category: "mini-prajituri",
      icon: Cookie,
      slug: "mini-eclere-ness",
    },
    {
      id: 7,
      name: "Cornulete cu nucă și gem",
      price: "5 RON",
      category: "dulciuri",
      icon: Heart,
      slug: "cornulete-nuca-gem",
    },
    {
      id: 8,
      name: "Fursecuri fragede cu nucă",
      price: "5 RON",
      category: "dulciuri",
      icon: Heart,
      slug: "fursecuri-fragede-nuca",
    },
  ]

  // Auto-scroll carusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Schimbă imaginea la fiecare 4 secunde

    return () => clearInterval(interval)
  }, [carouselImages.length])

  // Auto-scroll carusel produse cu infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => {
        // Când ajungem la ultimul grup de 4 produse, să ne întoarcem la primul
        const maxIndex = featuredProducts.length - 4
        if (prevIndex >= maxIndex) {
          return 0
        }
        return prevIndex + 1
      })
    }, 5000) // Schimbă produsul la fiecare 5 secunde

    return () => clearInterval(interval)
  }, [featuredProducts.length])

  // Touch handlers pentru carusel mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
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
      setCurrentProductIndex((prev) => 
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      )
    }
    if (isRightSwipe) {
      setCurrentProductIndex((prev) => 
        prev === 0 ? featuredProducts.length - 1 : prev - 1
      )
    }
  }

  // Auto-scroll pentru mobile
  useEffect(() => {
    const interval = setInterval(() => {
      const scrollContainer = document.querySelector('.overflow-x-auto')
      if (scrollContainer) {
        const scrollAmount = 400 // 2 chenare (2 * 192px) + spațiu (16px)
        
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        
        // Reset la început când ajungem la sfârșitul
        setTimeout(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
          }
        }, 1000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Date pentru servicii
  const services = [
    {
      icon: Cake,
      title: "Dulciuri Personalizate",
      description:
        "Creăm dulciuri unice pentru nuntă, botez și aniversare cu design personalizat și ingrediente de calitate",
    },
    {
      icon: Heart,
      title: "Ingrediente de Calitate Superioară",
      description:
        "Folosim doar ingrediente naturale și de cea mai bună calitate pentru a oferi gusturi autentice",
    },
    {
      icon: Users,
      title: "Experiență de 3+ Ani",
      description:
        "Peste 3 ani de experiență în prepararea dulciurilor și satisfacerea clienților",
    },
    {
      icon: Award,
      title: "Recenzii Excelente",
      description:
        "Mii de clienți mulțumiți și recenzii de 5 stele pentru calitatea produselor noastre",
    },
  ]

  // Date pentru statistici
  const stats = [
    { number: "5000+", label: "Torturi Realizate" },
    { number: "3+", label: "Ani de Experiență" },
    { number: "1000+", label: "Clienți Mulțumiți" },
    { number: "50+", label: "Tipuri de Produse" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[45vh] sm:h-[60vh] flex items-center justify-center hero-bg overflow-hidden pt-10 sm:pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

        {/* Elemente decorative îmbunătățite */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce-subtle" />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-primary/20 rounded-full animate-bounce-subtle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-primary/15 rounded-full animate-bounce-subtle"
          style={{ animationDelay: "2s" }}
        />

        {/* Elemente decorative noi */}
        <div
          className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary/20 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/15 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary/25 rounded-full animate-pulse"
          style={{ animationDelay: "2.5s" }}
        />

        {/* Forme geometrice decorative */}
        <div
          className="absolute top-32 right-16 w-24 h-24 border-2 border-primary/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-32 left-16 w-16 h-16 border-2 border-primary/15 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        />

        {/* Gradient overlay îmbunătățit */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5" />

        <div className="container-custom relative z-10 px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 lg:items-start">
            {/* Linie separatoare vizuală */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left lg:pr-12 relative"
            >
              {/* Background subtil pentru secțiunea text */}
              <div className="hidden lg:block absolute inset-0 bg-white/5 rounded-2xl -m-4"></div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                  ✨ Cofetărie Sector 2 București din 2021
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">Dulciuri Artizanale</span>
                <span className="block">
                  <span className="text-gradient bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent animate-pulse">
                    Cofetăria Zaha București
                  </span>
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-4">
                  Unde fiecare tort spune o poveste
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mx-auto lg:mx-0"></div>
              </motion.div>

              {/* Butoanele pe mobile - sub titlu, înainte de descriere */}
              <motion.div
                className="flex flex-row gap-3 justify-center lg:justify-start mb-6 lg:hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/produse"
                  className="btn-primary inline-flex items-center justify-center group relative overflow-hidden text-sm px-4 py-2"
                >
                  <span className="relative z-10">Vezi Produsele</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center group relative overflow-hidden text-sm px-4 py-2"
                >
                  <span className="relative z-10">Contactează-ne</span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Butoanele pe desktop - după descriere */}
              <motion.div
                className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  href="/produse"
                  className="btn-primary inline-flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10">Vezi Produsele Noastre</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center group relative overflow-hidden"
                >
                  <span className="relative z-10">Contactează-ne</span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Elemente decorative suplimentare */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center space-x-8 text-sm text-gray-500 mb-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>3+ ani experiență</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span>5000+ dulciuri realizate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span>Ridicare din magazin</span>
                </div>
              </motion.div>

              {/* Linie separatoare orizontală */}
              <div className="hidden lg:block w-24 h-px bg-gradient-to-r from-primary/30 to-transparent mb-8"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative lg:pl-12 hidden lg:block"
            >
              {/* Background subtil pentru secțiunea carusel */}
              <div className="hidden lg:block absolute inset-0 bg-primary/5 rounded-2xl -m-4"></div>
              <div className="relative">
                <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Carusel cu poze pe tot chenarul */}
                  <div className="relative z-10 w-full h-full">
                    {carouselImages.map((image, index) => {
                      return (
                        <motion.div
                          key={image.id}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: currentImageIndex === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                          <Image
                            src={image.image}
                            alt={image.title}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="100vw"
                          />
                          {/* Overlay pentru text */}
                          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: currentImageIndex === index ? 1 : 0,
                                y: currentImageIndex === index ? 0 : 20,
                              }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            >
                              <h3 className="text-3xl font-bold text-white mb-2">{image.title}</h3>
                              <p className="text-lg text-white/90">{image.description}</p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Indicatori carusel */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                          currentImageIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Produse pentru Mobile - Carusel cu scroll liber */}
      <section className="py-6 md:py-16 bg-gray-50 md:hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Carusel container pentru mobile cu scroll liber */}
            <div className="overflow-x-auto scrollbar-none">
              <div className="flex space-x-4 pb-4 pl-2" style={{ width: 'max-content' }}>
                {featuredProducts.map((product, index) => {
                  const ProductIcon = product.icon
                  return (
                    <motion.div
                      key={product.id}
                      className="flex-shrink-0 w-48"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/produse/${product.slug}`} className="block">
                        <div className="group overflow-hidden h-48 rounded-lg bg-white shadow-lg flex flex-col">
                          <div className="relative overflow-hidden rounded-t-lg h-32">
                            <Image
                              src={`/images/products/${product.slug}.jpg`}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="192px"
                            />
                          </div>
                          <div className="p-2 flex flex-col h-16">
                            <h3 className="text-xs font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-1">
                              {product.name}
                            </h3>
                            <span className="text-xs font-bold text-primary">{product.price}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Produse Featured Section - Hidden on mobile */}
      <section className="py-8 md:py-16 bg-gray-50 hidden md:block">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative flex justify-center">
            {/* Carusel container */}
            <div className="relative overflow-hidden" style={{ width: 'calc(4 * 288px + 3 * 24px)' }}>
              <motion.div
                className="flex space-x-6"
                animate={{
                  x: -currentProductIndex * (288 + 24), // 288px produs + 24px spațiu
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{ width: `${featuredProducts.length * (288 + 24)}px` }}
              >
                {featuredProducts.map((product, index) => {
                  const ProductIcon = product.icon
                  return (
                    <motion.div key={product.id} className="flex-shrink-0 w-72" whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }}>
                      <Link href={`/produse/${product.slug}`} className="block">
                        <div className="group overflow-hidden h-80 rounded-lg bg-white shadow-lg flex flex-col">
                        <div className="relative overflow-hidden rounded-t-lg h-48">
                          <Image
                            src={`/images/products/${product.slug}.jpg`}
                            alt={product.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            sizes="288px"
                          />
                        </div>
                        <div className="p-4 flex flex-col h-32">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-lg font-bold text-primary">{product.price}</span>
                          </div>
                        </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Săgeți de navigare pentru PC */}
            <button
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 z-10"
              onClick={() => {
                setCurrentProductIndex((prev) => {
                  if (prev === 0) {
                    return featuredProducts.length - 4
                  }
                  return prev - 1
                })
              }}
            >
              <ArrowRight className="h-6 w-6 text-primary rotate-180" />
            </button>

            <button
              className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200 z-10"
              onClick={() => {
                setCurrentProductIndex((prev) => {
                  if (prev >= featuredProducts.length - 4) {
                    return 0
                  }
                  return prev + 1
                })
              }}
            >
              <ArrowRight className="h-6 w-6 text-primary" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Torturi Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }} 
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Torturi <span className="text-gradient">Speciale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descoperă selecția noastră de torturi artizanale, preparate cu ingrediente de cea mai bună calitate și decorare personalizată pentru momentele tale speciale.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren} 
            initial="initial" 
            whileInView="animate" 
            viewport={{ once: true }} 
            className="grid grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto"
          >
            {/* Primul rând */}
            <motion.div variants={fadeInUp} className="group">
              <Link href="/produse/duo-chocolate-1kg" className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 group-hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src="/images/products/duo-chocolate-1kg.jpg"
                      alt="Duo Chocolate"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Duo Chocolate</h3>
                    <p className="text-primary font-bold text-sm">378 RON</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <Link href="/produse/tort-mousse-ciocolata-fructe-padure" className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 group-hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src="/images/products/tort-mousse-ciocolata-fructe-padure.jpg"
                      alt="Tort Mousse de ciocolată și fructe de pădure"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Tort Mousse</h3>
                    <p className="text-primary font-bold text-sm">445 RON</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Al doilea rând */}
            <motion.div variants={fadeInUp} className="group">
              <Link href="/produse/tort-medovika" className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 group-hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src="/images/products/tort-medovika.jpg"
                      alt="Tort Medovika"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Tort Medovika</h3>
                    <p className="text-primary font-bold text-sm">445 RON</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <Link href="/produse/tort-pavlova" className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 group-hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src="/images/products/tort-pavlova.jpg"
                      alt="Tort Pavlova"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Tort Pavlova</h3>
                    <p className="text-primary font-bold text-sm">445 RON</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            viewport={{ once: true }} 
            className="text-center"
          >
            <Link 
              href="/produse?category=torturi" 
              className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              <span>Vezi mai multe variante</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Servicii Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              De ce să alegi <span className="text-gradient">Cofetăria Zaha</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferim servicii de cofetărie de excepție cu atenție la detalii, ingrediente de calitate și pasiune pentru ceea ce facem. Cofetăria Zaha București este specializată în dulciuri personalizate pentru toate ocaziile speciale, prăjituri artizanale preparate zilnic și dulciuri de casă tradiționale.
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon
              return (
                <motion.div key={index} variants={fadeInUp} className="card text-center group hover:shadow-2xl">
                  <motion.div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300" whileHover={{ scale: 1.1, rotate: 5 }}>
                    <ServiceIcon className="h-8 w-8 text-primary group-hover:text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistici Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cifrele Care Vorbesc</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">Experiența noastră se reflectă în numerele impresionante ale clienților mulțumiți.</p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <motion.div className="text-4xl md:text-5xl font-bold mb-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                  {stat.number}
                </motion.div>
                <div className="text-primary-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Secțiune Testimoniale */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce Spun <span className="text-gradient">Clienții Noștri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Mii de familii din București ne-au ales pentru momentele lor speciale. Descoperă experiențele lor și de ce Cofetăria Zaha București este alegerea preferată pentru dulciuri de nuntă, botez și aniversare în București.</p>
          </motion.div>

          <motion.div variants={staggerChildren} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Popescu",
                role: "Mama de nuntă",
                content: "Tortul de nuntă a fost absolut perfect! Toți invitații au fost impresionați de gust și aspect. Recomand cu încredere!",
                rating: 5,
              },
              {
                name: "Alexandru Ionescu",
                role: "Client fidel",
                content: "Prăjiturile lor sunt ca cele de casă, dar și mai bune. Comandăm regulat pentru evenimente de familie.",
                rating: 5,
              },
              {
                name: "Elena Dumitrescu",
                role: "Organizator evenimente",
                content: "Serviciul de catering este excepțional. Echipa este profesională și produsele sunt de cea mai bună calitate.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp} className="card text-center group">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Pregătește-te pentru o Experiență <span className="text-white">Dulce</span></h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Contactează-ne astăzi pentru tortul perfect pentru evenimentul tău special sau pentru a comanda prăjiturile preferate ale familiei tale. Cofetăria Zaha București oferă servicii complete de cofetărie cu ridicare din magazin și consultanță personalizată pentru fiecare eveniment special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center">
                <span>Comandă Acum</span>
              </Link>
              <Link href="tel:0731195126" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors duration-200 inline-flex items-center justify-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>0731 195 126</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
