'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Download, Share2, Phone, Cake, Cookie, Heart, Users } from 'lucide-react'

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

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

  // Categorii de imagini
  const categories = [
    { id: 'all', name: 'Toate' },
    { id: 'torturi', name: 'Torturi' },
    { id: 'prajituri', name: 'Prăjituri' },
    { id: 'evenimente', name: 'Evenimente' },
    { id: 'atelier', name: 'Atelier' }
  ]

  // Imagini din galerie
  const galleryImages = [
    {
      id: 1,
      alt: 'Tort de nuntă elegant cu decorațiuni florale',
      category: 'torturi',
      title: 'Tort de Nuntă Elegant',
      description: 'Tort cu 3 etaje, fondant alb și decorațiuni florale personalizate',
      icon: 'Cake'
    },
    {
      id: 2,
      alt: 'Tort de aniversare colorat',
      category: 'torturi',
      title: 'Tort de Aniversare',
      description: 'Tort personalizat cu tematica aleasă de client',
      icon: 'Cake'
    },
    {
      id: 3,
      alt: 'Tort de botez pentru copii',
      category: 'torturi',
      title: 'Tort de Botez',
      description: 'Tort delicat cu decorațiuni pentru copii',
      icon: 'Cake'
    },
    {
      id: 4,
      alt: 'Ecler cu cremă de vanilie',
      category: 'prajituri',
      title: 'Ecler cu Cremă de Vanilie',
      description: 'Ecler clasic cu cremă de vanilie și glazură de ciocolată',
      icon: 'Cookie'
    },
    {
      id: 5,
      alt: 'Profiterol cu ciocolată',
      category: 'prajituri',
      title: 'Profiterol cu Ciocolată',
      description: 'Profiterol cu cremă de ciocolată și glazură de ciocolată',
      icon: 'Cookie'
    },
    {
      id: 6,
      alt: 'Tiramisu clasic',
      category: 'prajituri',
      title: 'Tiramisu Clasic',
      description: 'Tiramisu preparat după rețeta tradițională italiană',
      icon: 'Cookie'
    },
    {
      id: 7,
      alt: 'Echipa la lucru în atelier',
      category: 'atelier',
      title: 'Echipa Noastră',
      description: 'Echipa pasionată care creează dulciurile voastre',
      icon: 'Users'
    },
    {
      id: 8,
      alt: 'Papanași cu smântână',
      category: 'prajituri',
      title: 'Papanași cu Smântână',
      description: 'Papanași tradiționali cu smântână și dulceață de fructe',
      icon: 'Heart'
    },
    {
      id: 9,
      alt: 'Clătite cu dulceață',
      category: 'prajituri',
      title: 'Clătite cu Dulceață',
      description: 'Clătite delicate cu dulceață de casă de prune',
      icon: 'Heart'
    },
    {
      id: 10,
      alt: 'Eveniment de nuntă',
      category: 'evenimente',
      title: 'Eveniment de Nuntă',
      description: 'Catering complet pentru evenimente speciale',
      icon: 'Users'
    },
    {
      id: 11,
      alt: 'Atelierul nostru',
      category: 'atelier',
      title: 'Atelierul Nostru',
      description: 'Spațiul unde se nasc toate dulciurile',
      icon: 'Users'
    },
    {
      id: 12,
      alt: 'Tort de Crăciun',
      category: 'torturi',
      title: 'Tort de Crăciun',
      description: 'Tort tematic pentru sărbătorile de iarnă',
      icon: 'Cake'
    }
  ]

  // Filtrare imagini
  const filteredImages = galleryImages.filter(image => 
    selectedCategory === 'all' || image.category === selectedCategory
  )

  // Navigare în lightbox
  const goToPrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      setSelectedImage(filteredImages[previousIndex].id)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

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
              Galeria Noastră <span className="text-gradient">Dulce</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Descoperă creațiile noastre în imagini. Fiecare produs spune o poveste 
              de pasiune, creativitate și atenție la detalii.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtre Categorii */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie Imagini */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => {
              const IconComponent = image.icon === 'Cake' ? Cake : 
                                  image.icon === 'Cookie' ? Cookie : 
                                  image.icon === 'Heart' ? Heart : Users;
              
              return (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className="w-full h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
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
                        <IconComponent className="h-20 w-20 text-primary" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Buton închidere */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors duration-200"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Navigare */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors duration-200"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors duration-200"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Imaginea */}
              {(() => {
                const image = filteredImages.find(img => img.id === selectedImage)
                if (!image) return null

                const IconComponent = image.icon === 'Cake' ? Cake : 
                                    image.icon === 'Cookie' ? Cookie : 
                                    image.icon === 'Heart' ? Heart : Users;

                return (
                  <div className="relative">
                    <div className="w-full h-[600px] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative rounded-lg shadow-2xl">
                      {/* Pattern decorative */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/30 rounded-full"></div>
                        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-primary/20 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary/15 rounded-full"></div>
                      </div>
                      
                      {/* Iconița principală */}
                      <motion.div
                        className="relative z-10"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <IconComponent className="h-32 w-32 text-primary" />
                      </motion.div>
                    </div>
                    
                    {/* Informații imagine */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                      <h3 className="text-white text-2xl font-semibold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/90 mb-4">
                        {image.description}
                      </p>
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 text-white hover:text-primary transition-colors duration-200">
                          <Download className="h-4 w-4" />
                          <span>Descarcă</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white hover:text-primary transition-colors duration-200">
                          <Share2 className="h-4 w-4" />
                          <span>Partajează</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Vrei să Vezi Mai Mult?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Vizitați-ne la cofetărie pentru a vedea produsele noastre în persoană 
              sau contactați-ne pentru a discuta despre tortul perfect pentru evenimentul vostru.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Contactați-ne
              </a>
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

export default GalleryPage
