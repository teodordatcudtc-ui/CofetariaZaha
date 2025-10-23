'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Heart, 
  Award, 
  Users, 
  Clock,
  Star,
  CheckCircle,
  Cake,
  Coffee,
  Phone
} from 'lucide-react'

const AboutPage = () => {
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

  // Valori și principii
  const values = [
    {
      icon: Heart,
      title: 'Pasiune',
      description: 'Fiecare produs este creat cu pasiune și dragoste pentru arta culinară'
    },
    {
      icon: Award,
      title: 'Calitate',
      description: 'Folosim doar ingrediente de cea mai bună calitate și tehnici tradiționale'
    },
    {
      icon: Users,
      title: 'Comunitate',
      description: 'Suntem parte din comunitatea locală și susținem producătorii români'
    },
    {
      icon: Clock,
      title: 'Tradiție',
      description: 'Păstrăm rețetele tradiționale și le adaptăm stilului modern'
    }
  ]

  // Istoricul cofetăriei
  const timeline = [
    {
      year: '2008',
      title: 'Începuturile',
      description: 'Cofetăria Zaha a fost înființată cu visul de a aduce dulciuri autentice în București'
    },
    {
      year: '2012',
      title: 'Prima Extindere',
      description: 'Am extins meniul cu torturi personalizate și am introdus servicii de catering'
    },
    {
      year: '2016',
      title: 'Recunoaștere Locală',
      description: 'Am câștigat primul premiu pentru cel mai bun tort de nuntă din București'
    },
    {
      year: '2020',
      title: 'Adaptare Digitală',
      description: 'Am implementat comenzi online și livrare la domiciliu pentru a servi clienții în siguranță'
    },
    {
      year: '2023',
      title: 'Prezent',
      description: 'Continuăm să creăm momente dulci pentru peste 1000 de familii din București'
    }
  ]

  // Echipă
  const team = [
    {
      name: 'Zaha Popescu',
      role: 'Fondator & Master Patissier',
      description: 'Cu peste 20 de ani de experiență în cofetărie, Zaha aduce creativitatea și pasiunea în fiecare produs',
      icon: Award
    },
    {
      name: 'Maria Ionescu',
      role: 'Specialist Torturi Personalizate',
      description: 'Expertă în crearea de torturi unice pentru evenimente speciale, cu atenție la fiecare detaliu',
      icon: Heart
    },
    {
      name: 'Alexandru Dumitrescu',
      role: 'Specialist Prăjituri Artizanale',
      description: 'Maestru în prepararea prăjiturilor tradiționale cu ingrediente de calitate superioară',
      icon: Cake
    }
  ]

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
              Despre <span className="text-gradient">Cofetăria Zaha</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              De peste 15 ani, Cofetăria Zaha este sinonimul calității și pasiunii 
              în lumea dulciurilor din București. Creăm momente memorabile prin 
              torturi personalizate, prăjituri artizanale și dulciuri de casă 
              preparate cu ingrediente de cea mai bună calitate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Misiunea și Viziunea */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Misiunea Noastră
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ne propunem să aducem bucuria și dulceața în viața fiecărui client 
                prin produse de cofetărie de excepție. Fiecare tort, prăjitură sau 
                dulce este creat cu atenție la detalii și respect pentru tradiția 
                culinară românească.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Credem că dulciurile nu sunt doar alimente, ci momente de fericire 
                care rămân în amintirea noastră pentru totdeauna.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
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
                    <Users className="h-32 w-32 text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Echipa Noastră</h3>
                  <p className="text-primary/80">Pasiune și experiență în fiecare produs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valori */}
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
              Valorile Noastre
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acestea sunt principiile care ne ghidează în fiecare zi și 
              în fiecare produs pe care îl creăm.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <value.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Istoricul */}
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
              Istoricul Nostru
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O călătorie de peste 15 ani în lumea dulciurilor, 
              plină de momente frumoase și realizări importante.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card h-full group-hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-primary block">
                          {event.year}
                        </span>
                        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-200">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>Milestone {index + 1}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Echipa */}
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
              Echipa Noastră
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cunoașteți echipa pasionată care creează dulciurile 
              care vă fac ziua mai frumoasă.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                    {/* Pattern decorative */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-2 left-2 w-8 h-8 border border-primary/30 rounded-full"></div>
                      <div className="absolute bottom-2 right-2 w-6 h-6 border border-primary/20 rounded-full"></div>
                    </div>
                    
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <member.icon className="h-12 w-12 text-primary" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
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
              Vrei să Ne Cunoașteți Mai Bine?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Vizitați-ne la cofetărie sau contactați-ne pentru a discuta 
              despre tortul perfect pentru evenimentul vostru special.
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

export default AboutPage
