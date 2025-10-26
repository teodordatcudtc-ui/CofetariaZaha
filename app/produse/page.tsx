'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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
  Phone,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Leaf
} from 'lucide-react'

const ProductsPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Initialize category and search from URL params
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) {
      setSelectedCategory(category)
    } else {
      setSelectedCategory('all')
    }
    
    if (search) {
      setSearchTerm(search)
    } else {
      setSearchTerm('')
    }
  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      if (showSortDropdown && !target.closest('.sort-dropdown')) {
        setShowSortDropdown(false)
      }
      
      if (showFilterDropdown && !target.closest('.filter-dropdown')) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSortDropdown, showFilterDropdown])


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
    { id: 'prajituri', name: 'Prăjituri', icon: Cookie },
    { id: 'fara-zahar-green-sugar', name: 'Fără zahăr / Green Sugar', icon: Leaf },
    { id: 'mini-prajituri', name: 'Mini prăjituri', icon: Cookie },
    { id: 'dulciuri', name: 'Dulciuri de Casă', icon: Heart },
    { id: 'torturi', name: 'Torturi', icon: Cake },
    { id: 'evenimente', name: 'Evenimente', icon: Users }
  ]

  // Opțiuni de sortare
  const sortOptions = [
    { id: 'name-asc', label: 'Nume A-Z', icon: ArrowUp },
    { id: 'name-desc', label: 'Nume Z-A', icon: ArrowDown },
    { id: 'price-asc', label: 'Preț Crescător', icon: ArrowUp },
    { id: 'price-desc', label: 'Preț Descrescător', icon: ArrowDown },
    { id: 'rating-asc', label: 'Rating Crescător', icon: ArrowUp },
    { id: 'rating-desc', label: 'Rating Descrescător', icon: ArrowDown },
    { id: 'reviews-asc', label: 'Recenzii Crescător', icon: ArrowUp },
    { id: 'reviews-desc', label: 'Recenzii Descrescător', icon: ArrowDown }
  ]

  // Produse
  const products = [
    // Brownie Fistic
    {
      id: 1,
      name: 'Brownie Fistic',
      price: '33 RON',
      priceValue: 33,
      category: 'prajituri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'brownie-fistic',
      ingredients: ['Făină integrală', 'Ouă', 'Zahăr', 'Unt', 'Ciocolată', 'Merișoare', 'Pastă pură de fistic', 'Gelatină']
    },
    
    // Saleuri
    {
      id: 2,
      name: 'Saleuri',
      price: '206 RON/kg',
      priceValue: 206,
      category: 'dulciuri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'saleuri',
      ingredients: ['Făină', 'Unt', 'Telemea', 'Semințe', 'Chimen', 'Susan', 'Mac', 'Susan negru', 'In', 'Ou']
    },
    
    // Poale'n Brau
    {
      id: 3,
      name: 'Poale\'n Brau',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '140g',
      icon: Heart,
      slug: 'poale-n-brau',
      ingredients: ['Făină', 'Zahăr', 'Ouă', 'Brânză', 'Lapte', 'Stafide', 'Drojdie', 'Rom', 'Sare', 'Coajă de lămâie', 'Portocală']
    },
    
    // Rulouri
    {
      id: 4,
      name: 'Rulouri',
      price: '25 RON',
      priceValue: 25,
      category: 'dulciuri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '85g',
      icon: Heart,
      slug: 'rulouri',
      ingredients: ['Făină', 'Unt', 'Gălbenuș', 'Sare', 'Zahăr', 'Lapte', 'Vanilie păstaie', 'Amidon', 'Fistic', 'Arahide', 'Alune']
    },
    
    // Strudel
    {
      id: 5,
      name: 'Strudel',
      price: '24 RON',
      priceValue: 24,
      category: 'dulciuri',
      rating: 5,
      reviews: 14,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Heart,
      slug: 'strudel',
      ingredients: ['Făină', 'Unt', 'Sare', 'Mere', 'Arahide', 'Ou', 'Scorțișoară']
    },
    
    // Boema
    {
      id: 6,
      name: 'Boema',
      price: '31 RON',
      priceValue: 31,
      category: 'prajituri',
      rating: 5,
      reviews: 17,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'boema',
      ingredients: ['Frișcă naturală', 'Făină', 'Ciocolată', 'Ouă', 'Ulei', 'Unt', 'Rom', 'Cacao', 'Praf de copt']
    },
    
    // Cornulețe
    {
      id: 7,
      name: 'Cornulețe',
      price: '196 RON/kg',
      priceValue: 196,
      category: 'dulciuri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'cornulete-nuca-gem',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Gălbenuș', 'Gem de fructe de pădure (magiun)', 'Nucă']
    },
    
    // Fursecuri
    {
      id: 8,
      name: 'Fursecuri',
      price: '196 RON/kg',
      priceValue: 196,
      category: 'dulciuri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'fursec-cu-gem',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Ouă', 'Gem de fructe de pădure (magiun)']
    },
    
    // Tiramisu Green Sugar
    {
      id: 9,
      name: 'Tiramisu Green Sugar',
      price: '35 RON',
      priceValue: 35,
      category: 'fara-zahar-green-sugar',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Cookie,
      slug: 'tiramisu-green-sugar',
      ingredients: ['Făină', 'Green Sugar', 'Ouă', 'Mascarpone', 'Frișcă naturală', 'Gelatină', 'Cacao', 'Cafea']
    },
    
    // Amandina Green Sugar
    {
      id: 10,
      name: 'Amandina Green Sugar',
      price: '39 RON',
      priceValue: 39,
      category: 'fara-zahar-green-sugar',
      rating: 5,
      reviews: 21,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'amandina-green-sugar',
      ingredients: ['Făină', 'Cacao', 'Ouă', 'Green Sugar', 'Praf de copt', 'Ulei', 'Unt', 'Rom']
    },
    
    // Amandină
    {
      id: 11,
      name: 'Amandină',
      price: '28 RON',
      priceValue: 28,
      category: 'prajituri',
      rating: 5,
      reviews: 21,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'amandina',
      ingredients: ['Unt', 'Fondant', 'Făină', 'Zahăr', 'Ouă', 'Cacao', 'Rom']
    },
    
    // Tarte Mari
    {
      id: 13,
      name: 'Tarte',
      price: '18 RON',
      priceValue: 18,
      category: 'prajituri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '90g',
      icon: Cookie,
      slug: 'tarte-mari',
      ingredients: ['Lapte', 'Făină', 'Unt', 'Gălbenuș', 'Zahăr', 'Fructe mixte', 'Vanilie păstaie', 'Gelatină', 'Amidon de porumb']
    },
    
    // Carrot Cake
    {
      id: 14,
      name: 'Carrot Cake',
      price: '189 RON/kg',
      priceValue: 189,
      category: 'torturi',
      rating: 5,
      reviews: 23,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cake,
      slug: 'carrot-cake',
      ingredients: ['Făină', 'Ouă', 'Ulei', 'Zahăr', 'Morcov', 'Nuci', 'Scorțișoară', 'Praf de copt', 'Bicarbonat']
    },
    
    // Trandafir
    {
      id: 15,
      name: 'Trandafir',
      price: '28 RON',
      priceValue: 28,
      category: 'prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '120g',
      icon: Cookie,
      slug: 'trandafir',
      ingredients: ['Făină', 'Miere', 'Zahăr', 'Unt', 'Drojdie', 'Ouă', 'Ciocolată albă', 'Frișcă', 'Gelatină', 'Kalamansi', 'Rom']
    },
    
    // Mousse 3 Ciocolate
    {
      id: 16,
      name: 'Mousse 3 Ciocolate',
      price: '35 RON',
      priceValue: 35,
      category: 'prajituri',
      rating: 5,
      reviews: 23,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'mousse-3-ciocolate',
      ingredients: ['Frișcă naturală', 'Ciocolată albă, neagră și cu lapte', 'Făină', 'Ouă', 'Zahăr', 'Cacao', 'Gelatină']
    },
    
    // Cozonac
    {
      id: 17,
      name: 'Cozonac - 950g',
      price: '153 RON/kg',
      priceValue: 153,
      category: 'dulciuri',
      rating: 5,
      reviews: 40,
      preparationTime: '2-3 zile',
      servings: '950g',
      icon: Heart,
      slug: 'cozonac-traditional-nuca-cacao',
      ingredients: ['Făină', 'Ouă', 'Zahăr', 'Lapte', 'Nucă', 'Unt', 'Drojdie', 'Coajă de lămâie și portocală', 'Mac', 'Stafide', 'Rahat', 'Rom']
    },
    
    // Chec
    {
      id: 18,
      name: 'Chec cu nucă și scortisoară',
      price: '120 RON',
      priceValue: 120,
      category: 'dulciuri',
      rating: 5,
      reviews: 25,
      preparationTime: 'Zilnic',
      servings: '700g',
      icon: Heart,
      slug: 'chec',
      ingredients: ['Nucă', 'Făină de grâu', 'Zahăr', 'Ouă', 'Ulei', 'Scorțișoară']
    },
    
    // Pricomigdale
    {
      id: 19,
      name: 'Pricomigdale',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'dulciuri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'pricomigdale',
      ingredients: ['Nucă', 'Migdale', 'Zahăr', 'Ouă', 'Ciocolată', 'Vanilie păstaie', 'Unt', 'Cafea', 'Rom', 'Amidon de porumb']
    },
    
    // Cheesecake
    {
      id: 20,
      name: 'Cheesecake',
      price: '37 RON',
      priceValue: 37,
      category: 'prajituri',
      rating: 5,
      reviews: 28,
      preparationTime: 'Zilnic',
      servings: '180g',
      icon: Cookie,
      slug: 'cheesecake',
      ingredients: ['Biscuiți', 'Mascarpone', 'Frișcă naturală', 'Philadelphia', 'Coajă de lime', 'Gelatină', 'Fructe']
    },
    
    // Ecler
    {
      id: 21,
      name: 'Ecler',
      price: '35 RON',
      priceValue: 35,
      category: 'prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '120g',
      icon: Cookie,
      slug: 'ecler',
      ingredients: ['Făină', 'Unt', 'Ulei', 'Ouă', 'Vanilie păstaie', 'Ciocolată', 'Rom', 'Amidon']
    },
    
    // Profiterol
    {
      id: 22,
      name: 'Profiterol',
      price: '39 RON',
      priceValue: 39,
      category: 'prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Cookie,
      slug: 'profiterol',
      ingredients: ['Făină', 'Ulei', 'Unt', 'Ouă', 'Pastă de fistic', 'Ciocolată', 'Frișcă naturală', 'Gelatină']
    },
    
    // Tort Mousse de Ciocolată și Fructe de Pădure
    {
      id: 23,
      name: 'Tort Mousse de Ciocolată și Fructe de Pădure',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 26,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-mousse-ciocolata-fructe-padure',
      ingredients: ['Făină', 'Cacao', 'Ouă', 'Zahăr', 'Frișcă naturală', 'Ciocolată', 'Gelatină']
    },
    
    // Negresă de Post
    {
      id: 24,
      name: 'Negresă de Post',
      price: '13 RON',
      priceValue: 13,
      category: 'dulciuri',
      rating: 5,
      reviews: 12,
      preparationTime: 'Zilnic',
      servings: '70g',
      icon: Heart,
      slug: 'negresa-de-post',
      ingredients: ['Făină', 'Nucă de cocos', 'Zahăr', 'Ulei', 'Cacao', 'Bicarbonat']
    },
    
    // Tort Brownie cu Fistic
    {
      id: 25,
      name: 'Tort Brownie cu Fistic',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'torturi',
      rating: 5,
      reviews: 24,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-brownie-cu-fistic',
      description: 'Brownie cremos de ciocolată și cremos de fistic'
    },
    
    // Ciocolată de Casă
    {
      id: 26,
      name: 'Ciocolată de Casă',
      price: '14 RON',
      priceValue: 14,
      category: 'dulciuri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '65g',
      icon: Heart,
      slug: 'ciocolata-de-casa',
      ingredients: ['Lapte praf', 'Zahăr', 'Unt', 'Cacao', 'Rom']
    },
    
    // Bezele
    {
      id: 27,
      name: 'Bezele',
      price: '159 RON/kg',
      priceValue: 159,
      category: 'dulciuri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'bezele',
      ingredients: ['Albuș', 'Zahăr', 'Amidon']
    },
    
    // Colivă
    {
      id: 28,
      name: 'Colivă',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Heart,
      slug: 'coliva',
      ingredients: ['Arpacaș', 'Nucă', 'Zahăr', 'Coajă de citrice', 'Rom', 'Biscuiți'],
      variants: [
        { weight: '200g', price: 19, priceValue: 19 },
        { weight: '1kg', price: 92, priceValue: 92 }
      ]
    },
    
    // Pavlova
    {
      id: 29,
      name: 'Pavlova',
      price: '28 RON',
      priceValue: 28,
      category: 'prajituri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '100g',
      icon: Cookie,
      slug: 'pavlova',
      ingredients: ['Albuș', 'Zahăr', 'Amidon', 'Frișcă naturală', 'Fructul pasiunii', 'Fructe mixte']
    },
    
    // Pișcoturi
    {
      id: 30,
      name: 'Pișcoturi',
      price: '196 RON/kg',
      priceValue: 196,
      category: 'dulciuri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'piscoturi',
      ingredients: ['Făină', 'Ouă', 'Zahăr']
    },
    
    // Medovika
    {
      id: 31,
      name: 'Medovika',
      price: '35 RON',
      priceValue: 35,
      category: 'prajituri',
      rating: 5,
      reviews: 25,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'medovika-prajitura',
      ingredients: ['Făină', 'Mascarpone', 'Cremă de brânză', 'Zahăr', 'Fructe de pădure', 'Rodie', 'Mere', 'Miere', 'Frișcă naturală', 'Unt', 'Ouă', 'Gelatină', 'Bicarbonat']
    },
    
    // Dobos
    {
      id: 32,
      name: 'Dobos',
      price: '35 RON',
      priceValue: 35,
      category: 'prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '150g',
      icon: Cookie,
      slug: 'dobos',
      ingredients: ['Unt', 'Ciocolată belgiană', 'Ouă', 'Zahăr', 'Făină', 'Ulei']
    },
    
    // Trufe
    {
      id: 33,
      name: 'Trufe',
      price: '277 RON/kg',
      priceValue: 277,
      category: 'dulciuri',
      rating: 5,
      reviews: 21,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'trufe',
      ingredients: ['Ciocolată', 'Frișcă', 'Tonka']
    },
    
    // Savarină
    {
      id: 34,
      name: 'Savarină',
      price: '28 RON',
      priceValue: 28,
      category: 'prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '280g',
      icon: Cookie,
      slug: 'savarina',
      ingredients: ['Făină', 'Ouă', 'Frișcă', 'Zahăr', 'Drojdie', 'Coajă de lămâie', 'Rom (alcool)', 'Gem de fructe de pădure']
    },
    
    // Fourstafidă
    {
      id: 35,
      name: 'Fourstafidă',
      price: '196 RON/kg',
      priceValue: 196,
      category: 'dulciuri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'fourstafida',
      ingredients: ['Unt', 'Făină', 'Ouă', 'Zahăr', 'Stafide', 'Rom', 'Esență', 'Vanilie păstaie']
    },
    
    // Tort Maria
    {
      id: 36,
      name: 'Tort Maria',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 35,
      preparationTime: '3-5 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-maria',
      ingredients: ['Cremă de vanilie', 'Frișcă', 'Fructe de pădure']
    },
    
    // Cannoli
    {
      id: 37,
      name: 'Cannoli',
      price: '28 RON',
      priceValue: 28,
      category: 'prajituri',
      rating: 5,
      reviews: 17,
      preparationTime: 'Zilnic',
      servings: '120g',
      icon: Cookie,
      slug: 'cannoli',
      ingredients: ['Făină', 'Untură', 'Cremă de brânză', 'Unt', 'Frișcă', 'Ciocolată']
    },
    
    // Danish
    {
      id: 38,
      name: 'Danish',
      price: '36 RON',
      priceValue: 36,
      category: 'prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '120g',
      icon: Cookie,
      slug: 'danish',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Lapte', 'Drojdie', 'Vanilie păstaie', 'Scorțișoară', 'Fructe mixte']
    },
    
    // Tort Red Velvet
    {
      id: 39,
      name: 'Tort Red Velvet',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 27,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-red-velvet',
      ingredients: ['Blat cu chefir', 'Cremă de brânză', 'Fructe de pădure']
    },
    
    // Tort Snickers
    {
      id: 40,
      name: 'Tort Snickers',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'torturi',
      rating: 5,
      reviews: 24,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-snickers',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată', 'Caramel sărat cu arahide', 'Cremă de caramel']
    },
    
    // Tort Tiramisu
    {
      id: 41,
      name: 'Tort Tiramisu',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'torturi',
      rating: 5,
      reviews: 26,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-tiramisu',
      ingredients: ['Pișcot', 'Mousse mascarpone', 'Cafea', 'Cacao', 'Gelatină']
    },
    
    // Tort Duo Chocolat
    {
      id: 42,
      name: 'Tort Duo Chocolat',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 30,
      preparationTime: '2-3 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'duo-chocolate-1kg',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată albă și neagră', 'Fructe de pădure']
    },
    
    // Tort Pavlova
    {
      id: 43,
      name: 'Tort Pavlova',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 29,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-pavlova',
      ingredients: ['Bezea', 'Piure fructul pasiunii', 'Mango', 'Frișcă', 'Fructe mixte']
    },
    
    // Tort Trios Chocolat
    {
      id: 44,
      name: 'Tort Trios Chocolat',
      price: '205 RON/kg',
      priceValue: 205,
      category: 'torturi',
      rating: 5,
      reviews: 25,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-trois-chocolat',
      ingredients: ['Blat umed de cacao', 'Mousse de ciocolată albă, cu lapte și neagră']
    },
    
    // Tort Boema
    {
      id: 45,
      name: 'Tort Boema',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'torturi',
      rating: 5,
      reviews: 22,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'tort-boema',
      ingredients: ['Blat însiropat cu rom (alcool)', 'Cremă de ciocolată neagră', 'Vișine', 'Mousse de frișcă']
    },
    
    // Alba ca Zăpada
    {
      id: 46,
      name: 'Alba ca Zăpada',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'torturi',
      rating: 5,
      reviews: 20,
      preparationTime: '3-4 zile',
      servings: '1kg',
      icon: Cake,
      slug: 'alba-ca-zapada',
      ingredients: ['Unt', 'Făină', 'Ouă', 'Zahăr', 'Griș', 'Amidon de porumb', 'Bicarbonat', 'Coajă de lămâie']
    },
    
    // Cookies
    {
      id: 47,
      name: 'Cookies',
      price: '17 RON',
      priceValue: 17,
      category: 'dulciuri',
      rating: 5,
      reviews: 24,
      preparationTime: 'Zilnic',
      servings: '60g',
      icon: Heart,
      slug: 'cookies',
      ingredients: ['Făină', 'Unt', 'Migdale', 'Ouă', 'Ciocolată', 'Praf de copt']
    },
    
    // Brownie
    {
      id: 48,
      name: 'Brownie',
      price: '15 RON',
      priceValue: 15,
      category: 'dulciuri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '70g',
      icon: Heart,
      slug: 'brownie',
      ingredients: ['Ciocolată', 'Ouă', 'Zahăr', 'Făină integrală', 'Unt', 'Merișoare', 'Nucă']
    },
    
    // Limbi de Pisică
    {
      id: 49,
      name: 'Limbi de Pisică',
      price: '196 RON/kg',
      priceValue: 196,
      category: 'dulciuri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Heart,
      slug: 'limbi-de-pisica',
      ingredients: ['Unt', 'Zahăr', 'Albuș', 'Făină']
    },
    
    // Plăcintă cu Mere
    {
      id: 50,
      name: 'Plăcintă cu Mere',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '110g',
      icon: Heart,
      slug: 'placinta-cu-mere',
      ingredients: ['Făină', 'Ulei de cocos', 'Griș', 'Zahăr', 'Mere']
    },
    
    // Plăcintă de Dovleac
    {
      id: 51,
      name: 'Plăcintă de Dovleac',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 14,
      preparationTime: 'Zilnic',
      servings: '110g',
      icon: Heart,
      slug: 'placinta-de-dovleac',
      ingredients: ['Făină', 'Ulei de cocos', 'Griș', 'Zahăr', 'Dovleac', 'Scorțișoară']
    },
    
    // Cataif
    {
      id: 52,
      name: 'Cataif',
      price: '25 RON',
      priceValue: 25,
      category: 'prajituri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '200g',
      icon: Cookie,
      slug: 'cataif',
      ingredients: ['Cataif', 'Unt', 'Sirop de zahăr', 'Coajă de portocală', 'Frișcă naturală']
    },
    
    // Cartof
    {
      id: 53,
      name: 'Cartof',
      price: '18 RON',
      priceValue: 18,
      category: 'prajituri',
      rating: 5,
      reviews: 13,
      preparationTime: 'Zilnic',
      servings: '110g',
      icon: Cookie,
      slug: 'cartof',
      ingredients: ['Blat umed de cacao', 'Blat umed alb', 'Unt', 'Ciocolată', 'Rom', 'Fructe de pădure']
    },
    
    // Platou Mixt / Mini Prăjituri
    {
      id: 54,
      name: 'Platou Mixt / Mini Prăjituri',
      price: '228 RON',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 25,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'platou-mix-mini-prajituri',
      description: 'Selecție variată de mini prăjituri'
    },

    // Produse lipsă din carusel
    // Găluști cu prune
    {
      id: 55,
      name: 'Găluști cu prune',
      price: '19 RON',
      priceValue: 19,
      category: 'dulciuri',
      rating: 5,
      reviews: 12,
      preparationTime: 'Zilnic',
      servings: '250g',
      icon: Heart,
      slug: 'galusti-cu-prune',
      ingredients: ['Cartofi', 'Ou', 'Pesmet', 'Unt', 'Prune fără sâmbure', 'Scorțișoară']
    },

    // Caserolă mini prăjituri
    {
      id: 56,
      name: 'Caserolă mini prăjituri',
      price: '88 RON',
      priceValue: 88,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'caserola-mini-prajituri',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Vanilie', 'Ciocolată']
    },

    // Mini tarte
    {
      id: 57,
      name: 'Mini tarte',
      price: '228 RON/kg',
      priceValue: 8,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1 kg',
      icon: Cookie,
      slug: 'mini-tarte',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cremă', 'Fructe']
    },

    // Mini amandine
    {
      id: 58,
      name: 'Mini amandine',
      price: '11 RON',
      priceValue: 11,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1 bucată',
      icon: Cookie,
      slug: 'mini-amandine',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Cacao', 'Cremă']
    },

    // Mini eclere cu vanilie și ciocolată
    {
      id: 59,
      name: 'Mini eclere cu vanilie și ciocolată',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-eclere-vanilie-ciocolata',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Vanilie', 'Ciocolată', 'Cremă']
    },

    // Mini eclere cu ness
    {
      id: 60,
      name: 'Mini eclere cu ness',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 19,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-eclere-ness',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Ness', 'Cremă']
    },

    // Fursecuri fragede cu nucă
    {
      id: 61,
      name: 'Fursecuri fragede cu nucă',
      price: '5 RON',
      priceValue: 5,
      category: 'dulciuri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '1 bucată',
      icon: Heart,
      slug: 'fursecuri-fragede-nuca',
      ingredients: ['Făină', 'Unt', 'Zahăr', 'Nucă', 'Vanilie']
    },

    // Platou fără lactoză
    {
      id: 62,
      name: 'Platou fără lactoză',
      price: '228 RON',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 12,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'platou-fara-lactoza',
      ingredients: ['Brownie cu merișoare', 'Pandispan cu prune sau vișine', 'Pavlova cu cremă de kalamansi', 'Fructul pasiunii', 'Mango']
    },

    // Mini trio chocolate
    {
      id: 63,
      name: 'Mini trio chocolate',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-trio-chocolate',
      ingredients: ['Ciocolată albă', 'Ciocolată cu lapte', 'Ciocolată neagră', 'Cremă', 'Făină', 'Unt']
    },

    // Căciulițe cu ciocolată și portocală
    {
      id: 64,
      name: 'Căciulițe cu ciocolată și portocală',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 15,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'caciulite-ciocolata-portocala',
      ingredients: ['Ciocolată', 'Coajă de portocală', 'Făină', 'Unt', 'Ouă', 'Zahăr']
    },

    // Mini Choux a la creme
    {
      id: 65,
      name: 'Mini Choux a la creme',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-choux-creme',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Vanilie', 'Frișcă naturală', 'Zahăr']
    },

    // Mini krant
    {
      id: 66,
      name: 'Mini krant',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 14,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-krant',
      ingredients: ['Cremă de vanilie', 'Unt', 'Nucă caramelizată', 'Făină', 'Zahăr', 'Ouă']
    },

    // Mini cannoli
    {
      id: 67,
      name: 'Mini cannoli',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 16,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-cannoli',
      ingredients: ['Cremă de brânză', 'Unt', 'Ciocolată neagră', 'Făină', 'Zahăr', 'Ouă']
    },

    // Mini Red velvet
    {
      id: 68,
      name: 'Mini Red velvet',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-red-velvet',
      ingredients: ['Făină', 'Cacao', 'Cremă de brânză', 'Colorant roșu', 'Unt', 'Zahăr']
    },

    // Cozonac cu nucă, cacao, stafide și rahat
    {
      id: 69,
      name: 'Cozonac cu nucă, cacao, stafide și rahat - 1kg',
      price: '153 RON',
      priceValue: 153,
      category: 'dulciuri',
      rating: 5,
      reviews: 25,
      preparationTime: '2-3 zile',
      servings: '1kg',
      icon: Heart,
      slug: 'cozonac-nuca-cacao-stafide-rahat',
      ingredients: ['Făină', 'Ouă', 'Zahăr', 'Lapte', 'Nucă', 'Cacao', 'Stafide', 'Rahat', 'Unt', 'Drojdie']
    },

    // Mini tarte cu lămâie, kalamansi și meringa
    {
      id: 70,
      name: 'Mini tarte cu lămâie, kalamansi și meringa',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'mini-prajituri',
      rating: 5,
      reviews: 18,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-tarte-lamaie-kalamansi-meringa',
      ingredients: ['Făină', 'Unt', 'Ouă', 'Zahăr', 'Lămâie', 'Kalamansi', 'Meringa', 'Cremă']
    },

    // Mini exotic
    {
      id: 71,
      name: 'Mini exotic',
      price: '228 RON/kg',
      priceValue: 228,
      category: 'fara-zahar-green-sugar',
      rating: 5,
      reviews: 20,
      preparationTime: 'Zilnic',
      servings: '1kg',
      icon: Cookie,
      slug: 'mini-exotic',
      ingredients: ['Blat de vanilie', 'Cremă de vanilie', 'Cremos din fructul pasiunii', 'Green Sugar', 'Făină', 'Unt', 'Ouă']
    },

    // Chec cu morcov
    {
      id: 72,
      name: 'Chec cu morcov',
      price: '120 RON',
      priceValue: 120,
      category: 'dulciuri',
      rating: 5,
      reviews: 22,
      preparationTime: 'Zilnic',
      servings: '700g',
      icon: Heart,
      slug: 'chec-morcov',
      ingredients: ['Morcov', 'Nucă', 'Ouă', 'Ulei', 'Scorțișoară', 'Făină', 'Zahăr']
    },

    // Chec simplu
    {
      id: 73,
      name: 'Chec simplu',
      price: '120 RON',
      priceValue: 120,
      category: 'dulciuri',
      rating: 5,
      reviews: 30,
      preparationTime: 'Zilnic',
      servings: '700g',
      icon: Heart,
      slug: 'chec-simplu',
      ingredients: ['Unt', 'Zahăr', 'Ouă', 'Lapte', 'Amidon de cartofi', 'Coajă de lămâie', 'Praf de copt']
    }
  ]

  // Funcție de sortare cu grupare pe categorii
  const sortProductsByCategory = (products: any[]) => {
    // Grupează produsele pe categorii
    const groupedProducts = products.reduce((groups: any, product: any) => {
      const category = product.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(product)
      return groups
    }, {})

    // Sortează produsele în cadrul fiecărui grup
    Object.keys(groupedProducts).forEach(category => {
      groupedProducts[category] = [...groupedProducts[category]].sort((a, b) => {
        let aValue, bValue
        
        // Parse sort option (e.g., 'name-asc' -> 'name' and 'asc')
        const [sortField, sortDirection] = sortBy.split('-')
        
        switch (sortField) {
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'price':
            aValue = a.priceValue
            bValue = b.priceValue
            break
          case 'rating':
            aValue = a.rating
            bValue = b.rating
            break
          case 'reviews':
            aValue = a.reviews
            bValue = b.reviews
            break
          default:
            return 0
        }
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
      })
    })

    return groupedProducts
  }

  // Filtrare și sortare produse cu grupare pe categorii
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedProducts = sortProductsByCategory(filteredProducts)

  return (
    <div className="min-h-screen pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative py-2 sm:py-4 bg-gradient-to-br from-primary/5 via-white to-primary/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Produsele Noastre <span className="text-gradient">Speciale</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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

            <div className="flex flex-row gap-4 items-center">
              {/* Filtrare */}
              <div className="relative filter-dropdown">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtrează</span>
                  <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                    {selectedCategory === 'all' ? 'Toate' : categories.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                </button>

                {showFilterDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            const url = category.id === 'all' ? '/produse' : `/produse?category=${category.id}`
                            router.push(url)
                            setShowFilterDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 ${
                            selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sortare */}
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sortare</span>
                  <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                    {sortOptions.find(opt => opt.id === sortBy)?.label.split(' ')[0]}
                  </span>
                </button>

                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id)
                            setShowSortDropdown(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200 ${
                            sortBy === option.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                          }`}
                        >
                          <option.icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista Produse */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {Object.keys(groupedProducts).length > 0 ? (
            categories
              .filter(category => groupedProducts[category.id] && groupedProducts[category.id].length > 0)
              .map((categoryInfo) => {
                const categoryProducts = groupedProducts[categoryInfo.id]
                
                return (
                  <div key={categoryInfo.id} className="mb-12">
                    {/* Subtitlu categorie */}
                    <div className="flex items-center justify-center mb-6">
                      <categoryInfo.icon className="h-6 w-6 text-primary mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">{categoryInfo.name}</h2>
                    </div>
                    
                    {/* Produsele din categoria respectivă */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                      {(categoryProducts as any[]).map((product: any, index: number) => (
                        <Link key={`${product.id}-${categoryInfo.id}`} href={`/produse/${product.slug}`}>
                          <div className="group overflow-hidden cursor-pointer rounded-lg bg-white shadow-lg h-full flex flex-col relative">
                            {/* Pop-out pentru produsele Green Sugar */}
                            {product.category === 'fara-zahar-green-sugar' && (
                              <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                                Fără zahăr
                              </div>
                            )}
                            <div className="relative overflow-hidden rounded-t-lg h-48 sm:h-64 md:h-80">
                              <Image
                                src={`/images/products/${product.slug}.jpg`}
                                alt={product.name}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200 flex-grow">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between mt-auto">
                                <span className="text-base font-bold text-primary">
                                  {product.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })
          ) : (
            <div className="text-center py-12">
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
            </div>
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
