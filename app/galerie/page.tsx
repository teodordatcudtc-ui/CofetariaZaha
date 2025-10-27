'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Phone } from 'lucide-react'

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Categorii de imagini
  const categories = [
    { id: 'all', name: 'Toate' },
    { id: 'torturi', name: 'Torturi' },
    { id: 'prajituri', name: 'Prăjituri' },
    { id: 'evenimente', name: 'Evenimente' }
  ]

  // Imagini din galerie
  const galleryImages = [
    {
      id: 1,
      image: '/images/products/tort-revelion-1.jpg',
      alt: 'Tort Revelion',
      category: 'torturi',
      title: 'Tort Revelion',
      description: 'Tort special de Revelion cu decor personalizat'
    },
    {
      id: 2,
      image: '/images/products/tort-revelion-2.jpg',
      alt: 'Tort Revelion - Angajamente',
      category: 'torturi',
      title: 'Tort Revelion - Angajamente',
      description: 'Tort special de Revelion pentru a sărbători împreună'
    },
    {
      id: 3,
      image: '/images/products/tort-maria.jpg',
      alt: 'Tort Maria',
      category: 'torturi',
      title: 'Tort Maria',
      description: 'Tort clasic cu biscuiți și cremă'
    },
    {
      id: 4,
      image: '/images/products/tort-tiramisu.jpg',
      alt: 'Tort Tiramisu',
      category: 'torturi',
      title: 'Tort Tiramisu',
      description: 'Tort cu savoardi, cafea și mascarpone'
    },
    {
      id: 5,
      image: '/images/products/tort-red-velvet.jpg',
      alt: 'Tort Red Velvet',
      category: 'torturi',
      title: 'Tort Red Velvet',
      description: 'Tort clasic american cu cacao și cremă de căpșuni'
    },
    {
      id: 6,
      image: '/images/products/tort-brownie-cu-fistic.jpg',
      alt: 'Tort Brownie cu Fistic',
      category: 'torturi',
      title: 'Tort Brownie cu Fistic',
      description: 'Tort cu ciocolată și fistic'
    },
    {
      id: 7,
      image: '/images/products/mini-eclere-vanilie-ciocolata.jpg',
      alt: 'Mini Eclere Vanilie și Ciocolată',
      category: 'prajituri',
      title: 'Mini Eclere',
      description: 'Eclere delicate cu cremă de vanilie și glazură de ciocolată'
    },
    {
      id: 8,
      image: '/images/products/mini-tarte.jpg',
      alt: 'Mini Tarte',
      category: 'prajituri',
      title: 'Mini Tarte',
      description: 'Tarte delicat cu cremă aromatizată'
    },
    {
      id: 9,
      image: '/images/products/amandina.jpg',
      alt: 'Amandină',
      category: 'prajituri',
      title: 'Amandină',
      description: 'Pralină cu înghețată de friscă'
    },
    {
      id: 10,
      image: '/images/products/tiramisu-green-sugar.jpg',
      alt: 'Tiramisu Green Sugar',
      category: 'prajituri',
      title: 'Tiramisu Green Sugar',
      description: 'Tiramisu cu arome speciale'
    },
    {
      id: 11,
      image: '/images/products/cookies.jpg',
      alt: 'Cookies',
      category: 'prajituri',
      title: 'Cookies',
      description: 'Prăjituri cu ciocolată și nuci'
    },
    {
      id: 12,
      image: '/images/products/savarina.jpg',
      alt: 'Savarina',
      category: 'prajituri',
      title: 'Savarina',
      description: 'Savarina tradițională cu sirop și sirop de rom'
    },
    {
      id: 13,
      image: '/images/products/cannoli.jpg',
      alt: 'Cannoli',
      category: 'prajituri',
      title: 'Cannoli',
      description: 'Cannoli italian cu cremă de ricotta'
    },
    {
      id: 14,
      image: '/images/products/mini-eclere-ness.jpg',
      alt: 'Mini Eclere Nesse',
      category: 'prajituri',
      title: 'Mini Eclere Nesse',
      description: 'Eclere special cu cremă Nesse și glazură'
    },
    {
      id: 15,
      image: '/images/products/caserola-mini-prajituri.jpg',
      alt: 'Caserolă Mini Prăjituri',
      category: 'evenimente',
      title: 'Caserolă Mini Prăjituri',
      description: 'Caserolă cu mini prăjituri pentru evenimente'
    },
    {
      id: 16,
      image: '/images/products/tort-diplomat.jpg',
      alt: 'Tort Diplomat',
      category: 'torturi',
      title: 'Tort Diplomat',
      description: 'Tort cu biscuiți și ciocolată'
    },
    {
      id: 17,
      image: '/images/products/tort-pavlova.jpg',
      alt: 'Tort Pavlova',
      category: 'torturi',
      title: 'Tort Pavlova',
      description: 'Mereng cu fructe de pădure'
    },
    {
      id: 18,
      image: '/images/products/tort-snickers.jpg',
      alt: 'Tort Snickers',
      category: 'torturi',
      title: 'Tort Snickers',
      description: 'Tort cu ciocolată, arahide și caramel'
    },
    {
      id: 19,
      image: '/images/products/mini-choux.jpg',
      alt: 'Mini Choux',
      category: 'prajituri',
      title: 'Mini Choux',
      description: 'Choux delicate cu cremă'
    },
    {
      id: 20,
      image: '/images/products/mini-amandine.jpg',
      alt: 'Mini Amandine',
      category: 'prajituri',
      title: 'Mini Amandine',
      description: 'Mini prăjituri cu ciocolată și nucă'
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
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-8 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Galeria Noastră <span className="text-gradient">Dulce</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Descoperă creațiile noastre în imagini. Fiecare produs spune o poveste 
              de pasiune, creativitate și atenție la detalii.
            </p>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-white">
                    <div className="w-full h-64 relative overflow-hidden">
                      <Image
                        src={image.image}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
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
                </div>
              );
            })}
          </div>
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
              className="relative w-full max-w-6xl max-h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Buton închidere */}
              <button
                onClick={closeLightbox}
                className="absolute -top-16 right-4 text-white hover:text-primary transition-colors duration-200 z-50"
              >
                <X className="h-10 w-10" />
              </button>

              {/* Navigare */}
              <button
                onClick={goToPrevious}
                className="absolute -left-14 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors duration-200 z-50"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>

              <button
                onClick={goToNext}
                className="absolute -right-14 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors duration-200 z-50"
              >
                <ChevronRight className="h-10 w-10" />
              </button>

              {/* Imaginea */}
              {(() => {
                // Găsește imaginea din toate imaginile, nu doar din cele filtrate
                const image = galleryImages.find(img => img.id === selectedImage)
                if (!image) return null

                return (
                  <div className="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-6xl bg-black">
                    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px]">
                      <div className="relative w-full h-full">
                        <Image
                          src={image.image}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          sizes="100vw"
                          priority
                        />
                      </div>
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                      
                      {/* Informații imagine - peste imagine */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                        <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">
                          {image.title}
                        </h3>
                        <p className="text-white/90 text-lg drop-shadow-md">
                          {image.description}
                        </p>
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
          <div className="text-center max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default GalleryPage
