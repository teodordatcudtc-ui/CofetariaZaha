'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  MessageCircle,
  ShoppingCart,
  Calendar,
  CreditCard,
  MessageSquare
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  // Informații de contact
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresa',
      details: ['Șoseaua Ștefan cel Mare 12', 'București 020141'],
      link: 'https://maps.google.com/?q=Șoseaua+Ștefan+cel+Mare+12,+București'
    },
    {
      icon: Phone,
      title: 'Telefon',
      details: ['0731 195 126'],
      link: 'tel:0731195126'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@cofetaria-zaha.ro'],
      link: 'mailto:contact@cofetaria-zaha.ro'
    },
    {
      icon: Clock,
      title: 'Program',
      details: ['Luni - Vineri: 08:00 - 20:00', 'Sâmbătă: 09:00 - 18:00', 'Duminică: 10:00 - 16:00']
    }
  ]

  // Social media și contact
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/cofetaria-zaha',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/cofetaria-zaha',
      color: 'hover:text-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      url: 'https://wa.me/40731195126',
      color: 'hover:text-green-600'
    }
  ]

  // Servicii de comandă
  const orderServices = [
            {
              icon: ShoppingCart,
              title: 'Comandă Online',
              description: 'Plasează comanda direct din site',
              action: 'Comandă Acum'
            },
            {
              icon: Calendar,
              title: 'Programare Eveniment',
              description: 'Planifică tortul pentru evenimentul tău',
              action: 'Programează'
            },
            {
              icon: CreditCard,
              title: 'Plată Online',
              description: 'Plătește sigur cu cardul',
              action: 'Plătește'
            }
  ]

  // Gestionare formular
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulare trimitere formular (în realitate ați integra cu un serviciu de email)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulare delay
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
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
                      Comandă <span className="text-gradient">Acum</span>
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Plasează comanda pentru tortul perfect sau prăjiturile preferate. 
                      Oferim servicii complete de comandă online, programare pentru evenimente 
                      și livrare la domiciliu în București.
                    </p>
          </motion.div>
        </div>
      </section>

      {/* Informații de Contact */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <info.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <div key={idx}>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-primary transition-colors duration-200"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p className="text-gray-600">{detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Servicii de Comandă */}
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
                      Servicii de <span className="text-gradient">Comandă</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      Alege modalitatea care îți convine pentru a plasa comanda
                    </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {orderServices.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card text-center group cursor-pointer hover:shadow-2xl transition-all duration-300"
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
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button className="btn-primary w-full">
                  {service.action}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formular și Harta */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formular de Contact */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="card">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Trimiteți-ne un Mesaj
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Mesajul a fost trimis!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Vă vom contacta în cel mai scurt timp posibil.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary"
                    >
                      Trimite Alt Mesaj
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Numele complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="Introduceți numele complet"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="exemplu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                          placeholder="07xx xxx xxx"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subiect *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Selectați subiectul</option>
                          <option value="tort-personalizat">Tort Personalizat</option>
                          <option value="comanda-prajituri">Comandă Prăjituri</option>
                          <option value="catering-eveniment">Catering Eveniment</option>
                          <option value="intrebare-general">Întrebare Generală</option>
                          <option value="altceva">Altceva</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajul *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Descrieți în detaliu ce aveți nevoie..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-dots mr-2" />
                          Se trimite...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Trimite Mesajul
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Harta și Informații Adiționale */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Harta */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Locația Noastră
                </h3>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.123456789!2d26.123456789!3d44.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f123456789ab%3A0x1234567890abcdef!2sȘoseaua%20Ștefan%20cel%20Mare%2012%2C%20București%20020141!5e0!3m2!1sro!2sro!4v1234567890123!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locația Cofetăriei Zaha"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Ne găsiți la adresa: Șoseaua Ștefan cel Mare 12, București 020141
                </p>
              </div>

              {/* Social Media */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Urmăriți-ne
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg text-gray-600 ${social.color} transition-all duration-200 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Urmăriți-ne pentru a vedea cele mai noi creații și oferte speciale!
                </p>
              </div>

              {/* Informații Adiționale */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Informații Utile
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Comenzi Personalizate</p>
                      <p className="text-sm text-gray-600">
                        Pentru torturi personalizate, vă rugăm să ne contactați cu cel puțin 3-5 zile înainte.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Timp de Răspuns</p>
                      <p className="text-sm text-gray-600">
                        Răspundem la toate mesajele în maximum 24 de ore în zilele lucrătoare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
