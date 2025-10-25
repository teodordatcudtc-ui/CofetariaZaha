'use client'

import { motion } from 'framer-motion'
import { 
  Cookie, 
  Shield, 
  Eye, 
  Target, 
  Settings, 
  Clock, 
  Database,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

const CookiePolicyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Cookie className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Politica de Cookie-uri
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Informații detaliate despre folosirea cookie-urilor pe site-ul Cofetăria Zaha
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            {/* Ce sunt cookie-urile */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                Ce sunt Cookie-urile?
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul tău 
                  când vizitezi un site web. Acestea permit site-ului să-ți amintească 
                  preferințele și să îți ofere o experiență personalizată.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cookie-urile nu conțin virusi și nu pot dăuna dispozitivului tău. 
                  Ele sunt folosite pentru a îmbunătăți funcționalitatea site-ului 
                  și pentru a înțelege cum interacționezi cu conținutul nostru.
                </p>
              </div>
            </motion.div>

            {/* Tipuri de cookie-uri */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary" />
                Tipuri de Cookie-uri pe Site-ul Nostru
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Cookie-uri Esențiale */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-green-900">Cookie-uri Esențiale</h3>
                  </div>
                  <p className="text-green-800 mb-4">
                    Aceste cookie-uri sunt necesare pentru funcționarea de bază a site-ului.
                  </p>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Autentificare și securitate</li>
                    <li>• Coș de cumpărături</li>
                    <li>• Preferințe de limbă</li>
                    <li>• Sesiuni de utilizator</li>
                  </ul>
                  <div className="mt-4 text-xs text-green-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Durată: Sesiune sau 1 an
                  </div>
                </div>

                {/* Cookie-uri de Analiză */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-blue-900">Cookie-uri de Analiză</h3>
                  </div>
                  <p className="text-blue-800 mb-4">
                    Ne ajută să înțelegem cum folosești site-ul pentru îmbunătățiri.
                  </p>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• Statistici de trafic</li>
                    <li>• Pagini populare</li>
                    <li>• Timpul petrecut pe site</li>
                    <li>• Surse de trafic</li>
                  </ul>
                  <div className="mt-4 text-xs text-blue-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Durată: 2 ani
                  </div>
                </div>

                {/* Cookie-uri de Marketing */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-semibold text-purple-900">Cookie-uri de Marketing</h3>
                  </div>
                  <p className="text-purple-800 mb-4">
                    Pentru personalizarea conținutului și reclamelor relevante.
                  </p>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• Reclame personalizate</li>
                    <li>• Conținut relevant</li>
                    <li>• Retargeting</li>
                    <li>• Măsurarea eficienței</li>
                  </ul>
                  <div className="mt-4 text-xs text-purple-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Durată: 1 an
                  </div>
                </div>

                {/* Cookie-uri de Funcționalitate */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-semibold text-orange-900">Cookie-uri de Funcționalitate</h3>
                  </div>
                  <p className="text-orange-800 mb-4">
                    Îmbunătățesc funcționalitatea și personalizarea site-ului.
                  </p>
                  <ul className="text-sm text-orange-700 space-y-2">
                    <li>• Preferințe de afișare</li>
                    <li>• Setări de accesibilitate</li>
                    <li>• Localizare</li>
                    <li>• Funcții avansate</li>
                  </ul>
                  <div className="mt-4 text-xs text-orange-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Durată: 6 luni
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gestionarea cookie-urilor */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Cum Gestionezi Cookie-urile?
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Opțiuni de Control</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Banner de Cookie-uri</p>
                      <p className="text-gray-600">
                        La prima vizită, vei vedea un banner care îți permite să alegi 
                        ce tipuri de cookie-uri să accepti.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Setări Browser</p>
                      <p className="text-gray-600">
                        Poți configura browserul să refuze cookie-urile, 
                        dar acest lucru poate afecta funcționalitatea site-ului.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Ștergerea Cookie-urilor</p>
                      <p className="text-gray-600">
                        Poți șterge cookie-urile existente din setările browserului 
                        în orice moment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cookie-uri folosite */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                Cookie-uri Folosite pe Site-ul Nostru
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nume Cookie</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tip</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Scop</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Durată</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">cookie-consent</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Esențial</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Memorează preferințele de cookie-uri</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 an</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">cart-items</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Esențial</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Coș de cumpărături</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Sesiune</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">user-preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Funcționalitate</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Preferințe de afișare</td>
                      <td className="px-4 py-3 text-sm text-gray-600">6 luni</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">analytics-enabled</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Analiză</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Statistici de utilizare</td>
                      <td className="px-4 py-3 text-sm text-gray-600">2 ani</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">marketing-enabled</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Marketing</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Reclame personalizate</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 an</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="h-8 w-8 text-primary" />
                Întrebări despre Cookie-uri?
              </h2>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Dacă ai întrebări despre folosirea cookie-urilor pe site-ul nostru, 
                  nu ezita să ne contactezi:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Email:</strong> contact@cofetariazaha.ro
                  </p>
                  <p className="text-gray-700">
                    <strong>Telefon:</strong> 0731 195 126
                  </p>
                  <p className="text-gray-700">
                    <strong>Adresă:</strong> Sector 2, București
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Informații Legale
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Această politică de cookie-uri este în conformitate cu:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Regulamentul General privind Protecția Datelor (GDPR)</li>
                  <li>• Legea nr. 190/2018 privind măsurile de implementare a Regulamentului GDPR</li>
                  <li>• Directiva 2009/136/CE privind cookie-urile</li>
                </ul>
                <p className="text-gray-600 mt-4 text-sm">
                  Ne rezervăm dreptul de a actualiza această politică în orice moment. 
                  Modificările vor fi publicate pe această pagină.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CookiePolicyPage
