'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, ShoppingCart, Heart } from 'lucide-react'

export interface NotificationProps {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

const Notification = ({ id, type, title, message, duration = 4000, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'error':
        return <X className="h-6 w-6 text-red-500" />
      case 'info':
        return <ShoppingCart className="h-6 w-6 text-primary" />
      default:
        return <Heart className="h-6 w-6 text-primary" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-primary/5 border-primary/20'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative max-w-sm w-full ${getBackgroundColor()} border rounded-xl shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-600">
            {message}
          </p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className="h-full bg-primary"
        />
      </div>
    </motion.div>
  )
}

export default Notification
