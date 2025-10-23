'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Cake, 
  Heart, 
  Star, 
  Users, 
  Award, 
  Clock,
  ArrowRight,
  CheckCircle,
  Phone
} from 'lucide-react'

const HomePage = () => {
  // Animații pentru secțiuni
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

  // Date pentru produse
  const featuredProducts = [
    {
      id: 1,
      name: 'Tort de Nuntă Clasic',
      description: 'Tort elegant cu fondant și decorațiuni personalizate pentru nuntă, creat cu ingrediente de calitate superioară și atenție la detalii',
      price: 'De la 500 RON',
      category: 'Torturi',
      icon: Cake
    },
    {
      id: 2,
      name: 'Prăjituri Artizanale',
      description: 'Selecție de prăjituri preparate zilnic cu ingrediente proaspete și rețete tradiționale românești',
      price: 'De la 15 RON',
      category: 'Prăjituri',
      icon: Heart
    },
    {
      id: 3,
      name: 'Dulciuri de Casă',
      description: 'Dulciuri tradiționale românești preparate după rețete de familie, cu gust autentic și ingrediente naturale',
      price: 'De la 8 RON',
      category: 'Dulciuri',
      icon: Star
    }
  ]

  // Date pentru servicii
  const services = [
    {
      icon: Cake,
      title: 'Torturi Personalizate',
      description: 'Creăm torturi unice pentru nuntă, botez și aniversare cu design personalizat și ingrediente de calitate'
    },
    {
      icon: Heart,
      title: 'Ingrediente de Calitate Superioară',
      description: 'Folosim doar ingrediente naturale și de cea mai bună calitate pentru a oferi gusturi autentice'
    },
    {
      icon: Users,
      title: 'Experiență de 15+ Ani',
      description: 'Peste 15 ani de experiență în prepararea dulciurilor și satisfacerea clienților'
    },
    {
      icon: Award,
      title: 'Recenzii Excelente',
      description: 'Mii de clienți mulțumiți și recenzii de 5 stele pentru calitatea produselor noastre'
    }
  ]

  // Date pentru statistici
  const stats = [
    { number: '5000+', label: 'Torturi Realizate' },
    { number: '15+', label: 'Ani de Experiență' },
    { number: '1000+', label: 'Clienți Mulțumiți' },
    { number: '50+', label: 'Tipuri de Produse' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        
        {/* Elemente decorative îmbunătățite */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce-subtle" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary/20 rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/15 rounded-full animate-bounce-subtle" style={{ animationDelay: '2s' }} />
        
        {/* Elemente decorative noi */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
        
        {/* Forme geometrice decorative */}
        <div className="absolute top-32 right-16 w-24 h-24 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-16 w-16 h-16 border-2 border-primary/15 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        
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
              transition={{ duration: 0.8, ease: 'easeOut' }}
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
                  ✨ Cofetărie Sector 2 București din 2008
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block">Torturi Personalizate</span>
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
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
                  Unde fiecare tort spune o poveste
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mx-auto lg:mx-0"></div>
              </motion.div>
              
              <motion.p 
                className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Creăm momente dulci și memorabile prin{' '}
                <span className="font-semibold text-primary">torturi personalizate</span>, 
                <span className="font-semibold text-primary"> prăjituri artizanale</span> și 
                <span className="font-semibold text-primary"> dulciuri de casă</span> preparate cu pasiune 
                și ingrediente de calitate superioară. De peste 15 ani, Cofetăria Zaha București 
                este alegerea perfectă pentru torturi de nuntă, botez și aniversare, prăjituri tradiționale 
                românești și dulciuri de casă preparate după rețete de familie.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/produse" className="btn-primary inline-flex items-center justify-center group relative overflow-hidden">
                  <span className="relative z-10">Vezi Produsele Noastre</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/contact" className="btn-secondary inline-flex items-center justify-center group relative overflow-hidden">
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
                          <span>15+ ani experiență</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <span>5000+ torturi realizate</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                          <span>1000+ clienți mulțumiți</span>
                        </div>
              </motion.div>

              {/* Linie separatoare orizontală */}
              <div className="hidden lg:block w-24 h-px bg-gradient-to-r from-primary/30 to-transparent mb-8"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative lg:pl-12 lg:pt-16"
            >
              {/* Background subtil pentru secțiunea telefon */}
              <div className="hidden lg:block absolute inset-0 bg-primary/5 rounded-2xl -m-4"></div>
              <div className="relative">
                <div className="w-full h-[600px] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Pattern decorative */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/30 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-primary/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-primary/15 rounded-full"></div>
                  </div>
                  
                  {/* Iconițe decorative */}
                  <div className="relative z-10 text-center">
                    <motion.div
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
                      <Cake className="h-32 w-32 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Torturi Artizanale</h3>
                    <p className="text-primary/80">Creații unice pentru momente speciale</p>
                  </div>
                  
                  <motion.div
                    className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-full shadow-lg"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <Star className="h-6 w-6" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicii Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              De ce să alegi <span className="text-gradient">Cofetăria Zaha</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferim servicii de cofetărie de excepție cu atenție la detalii, 
              ingrediente de calitate și pasiune pentru ceea ce facem. Cofetăria Zaha București 
              este specializată în torturi personalizate pentru toate ocaziile 
              speciale, prăjituri artizanale preparate zilnic și dulciuri de casă tradiționale.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group hover:shadow-2xl"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Produse Featured Section */}
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
              Produsele Noastre <span className="text-gradient">Speciale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descoperă selecția noastră de torturi, prăjituri și dulciuri 
              preparate cu ingrediente de calitate superioară.               Fiecare produs 
              din Cofetăria Zaha București este creat cu atenție la detalii și respectă 
              tradițiile culinare românești, oferind gusturi autentice și memorabile.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
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
                    
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <Link
                    href="/produse"
                    className="text-primary hover:text-primary/80 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200"
                  >
                    Vezi detalii
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/produse" className="btn-primary">
              Vezi Toate Produsele
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Statistici Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Cifrele Care Vorbesc
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Experiența noastră se reflectă în numerele impresionante 
              ale clienților mulțumiți.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-primary-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Secțiune Testimoniale */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce Spun <span className="text-gradient">Clienții Noștri</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mii de familii din București ne-au ales pentru momentele lor speciale. 
              Descoperă experiențele lor și de ce Cofetăria Zaha București este alegerea 
              preferată pentru torturi de nuntă, botez și aniversare în București.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Maria Popescu',
                role: 'Mama de nuntă',
                content: 'Tortul de nuntă a fost absolut perfect! Toți invitații au fost impresionați de gust și aspect. Recomand cu încredere!',
                rating: 5
              },
              {
                name: 'Alexandru Ionescu',
                role: 'Client fidel',
                content: 'Prăjiturile lor sunt ca cele de casă, dar și mai bune. Comandăm regulat pentru evenimente de familie.',
                rating: 5
              },
              {
                name: 'Elena Dumitrescu',
                role: 'Organizator evenimente',
                content: 'Serviciul de catering este excepțional. Echipa este profesională și produsele sunt de cea mai bună calitate.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              Pregătește-te pentru o Experiență <span className="text-white">Dulce</span>
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Contactează-ne astăzi pentru tortul perfect 
              pentru evenimentul tău special sau pentru a comanda prăjiturile 
              preferate ale familiei tale.               Cofetăria Zaha București oferă 
              servicii complete de cofetărie cu livrare la domiciliu și consultanță 
              personalizată pentru fiecare eveniment special.
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
