'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import Notification from '@/components/Notification'
import { motion, AnimatePresence } from 'framer-motion'

export interface NotificationData {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationData, 'id'>) => void
  showSuccess: (title: string, message: string, duration?: number) => void
  showError: (title: string, message: string, duration?: number) => void
  showInfo: (title: string, message: string, duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  const showNotification = (notification: Omit<NotificationData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])
  }

  const showSuccess = (title: string, message: string, duration = 4000) => {
    showNotification({ type: 'success', title, message, duration })
  }

  const showError = (title: string, message: string, duration = 5000) => {
    showNotification({ type: 'error', title, message, duration })
  }

  const showInfo = (title: string, message: string, duration = 4000) => {
    showNotification({ type: 'info', title, message, duration })
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showInfo
      }}
    >
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}
