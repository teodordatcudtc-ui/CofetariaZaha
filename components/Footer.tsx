'use client'

import Link from 'next/link'
import { Cake, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Despre Noi', href: '/despre' },
      { name: 'Produse', href: '/produse' },
      { name: 'Galerie', href: '/galerie' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Torturi Personalizate', href: '/produse#torturi' },
      { name: 'Prăjituri Artizanale', href: '/produse#prajituri' },
      { name: 'Dulciuri de Casă', href: '/produse#dulciuri' },
      { name: 'Evenimente Speciale', href: '/produse#evenimente' },
    ],
  }

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/cofetaria-zaha',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/cofetaria-zaha',
      icon: Instagram,
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo și descriere */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Cake className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-200">
                Cofetăria Zaha
              </span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creăm momente dulci și memorabile prin torturi personalizate, 
              prăjituri artizanale și dulciuri de casă preparate cu pasiune 
              și ingrediente de calitate superioară.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Linkuri companie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">Companie</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Servicii */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">Servicii</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Informații de contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Șoseaua Ștefan cel Mare 12<br />
                    București 020141
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:0731195126"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  0731 195 126
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@cofetaria-zaha.ro"
                  className="text-gray-300 hover:text-primary transition-colors duration-200"
                >
                  contact@cofetaria-zaha.ro
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Linia de separare și copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Cofetăria Zaha. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/politica-confidentialitate"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Politica de Confidențialitate
              </Link>
              <Link
                href="/termeni-conditii"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Termeni și Condiții
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
