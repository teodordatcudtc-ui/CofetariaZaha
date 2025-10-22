# Cofetăria Zaha - Site Web

Site web modern și responsiv pentru Cofetăria Zaha, o cofetărie din București specializată în torturi personalizate, prăjituri artizanale și dulciuri de casă.

## 🚀 Caracteristici

- **Design Modern**: Interfață elegantă cu culorile #05ddf4 și design aerisit
- **Responsive**: Optimizat pentru desktop, tabletă și mobile
- **Animații Subtile**: Micro-interacțiuni și animații smooth cu Framer Motion
- **SEO Optimizat**: Meta tags, sitemap.xml, robots.txt și structură semantică
- **Performanță**: Construit cu Next.js 14 și optimizat pentru viteză
- **Accesibilitate**: Design inclusiv și navigare ușoară

## 📱 Pagini

- **Acasă**: Hero section, produse featured, statistici și CTA
- **Despre Noi**: Istoricul cofetăriei, echipa și valorile
- **Produse**: Galerie de produse cu filtrare și căutare
- **Galerie**: Imagini mari cu lightbox și categorii
- **Contact**: Formular funcțional, hartă și informații de contact

## 🛠️ Tehnologii

- **Next.js 14** - Framework React cu App Router
- **TypeScript** - Tipizare statică
- **Tailwind CSS** - Stilizare utilitară
- **Framer Motion** - Animații și tranziții
- **Lucide React** - Iconițe moderne

## 📦 Instalare

1. **Clonează repository-ul**:
   ```bash
   git clone <repository-url>
   cd cofetaria-zaha
   ```

2. **Instalează dependențele**:
   ```bash
   npm install
   ```

3. **Rulează în modul dezvoltare**:
   ```bash
   npm run dev
   ```

4. **Deschide browserul** la `http://localhost:3000`

## 🚀 Deploy

### Pentru producție:

1. **Construiește aplicația**:
   ```bash
   npm run build
   ```

2. **Rulează în modul producție**:
   ```bash
   npm start
   ```

### Deploy pe Vercel (Recomandat):

1. **Instalează Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Urmărește instrucțiunile** pentru configurare

### Deploy pe alte platforme:

- **Netlify**: Conectează repository-ul GitHub
- **Railway**: Deploy direct din GitHub
- **DigitalOcean App Platform**: Deploy cu Docker

## 📁 Structura Proiectului

```
cofetaria-zaha/
├── app/                    # App Router Next.js
│   ├── globals.css        # Stiluri globale
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Pagina Acasă
│   ├── despre/            # Pagina Despre Noi
│   ├── produse/           # Pagina Produse
│   ├── galerie/           # Pagina Galerie
│   └── contact/           # Pagina Contact
├── components/            # Componente reutilizabile
│   ├── Header.tsx         # Header cu navigație
│   └── Footer.tsx         # Footer cu informații
├── public/                # Fișiere statice
│   ├── sitemap.xml        # Sitemap SEO
│   ├── robots.txt         # Robots.txt
│   └── site.webmanifest   # PWA manifest
├── package.json           # Dependențe și scripturi
├── tailwind.config.js     # Configurare Tailwind
├── next.config.js         # Configurare Next.js
└── tsconfig.json          # Configurare TypeScript
```

## 🎨 Personalizare

### Culori:
- **Primary**: #05ddf4 (în `tailwind.config.js`)
- **Secondary**: #05ddf4

### Fonturi:
- **Primary**: Montserrat
- **Headings**: Lato

### Animații:
- Configurate în `tailwind.config.js`
- Implementate cu Framer Motion

## 📞 Informații de Contact

- **Telefon**: 0731 195 126
- **Adresă**: Șoseaua Ștefan cel Mare 12, București 020141
- **Email**: contact@cofetaria-zaha.ro

## 🔧 Comenzi Disponibile

```bash
# Dezvoltare
npm run dev          # Rulează serverul de dezvoltare

# Producție
npm run build        # Construiește aplicația
npm run start        # Rulează în modul producție

# Linting
npm run lint         # Verifică codul cu ESLint
```

## 📈 SEO și Performanță

- ✅ Meta tags optimizate
- ✅ Sitemap.xml generat
- ✅ Robots.txt configurat
- ✅ Structură semantică HTML5
- ✅ Imagini optimizate cu Next.js Image
- ✅ Lazy loading implementat
- ✅ Core Web Vitals optimizate

## 🌐 Browser Support

- Chrome (ultimele 2 versiuni)
- Firefox (ultimele 2 versiuni)
- Safari (ultimele 2 versiuni)
- Edge (ultimele 2 versiuni)

## 📄 Licență

Acest proiect este proprietatea Cofetăriei Zaha. Toate drepturile rezervate.

---

**Creat cu ❤️ pentru Cofetăria Zaha**
