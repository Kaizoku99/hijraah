'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { analytics } from '../lib/analytics'
import { useLanguage } from '../contexts/LanguageContext'

interface WaitlistFormProps {
  onSubmit?: (email: string) => void
}

export function WaitlistForm({ onSubmit }: WaitlistFormProps) {
  const { t, isRTL } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError(t('form.error'))
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('form.error'))
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Track successful signup
      analytics.waitlistSignup(email)
      analytics.formSubmit('waitlist_form')

      onSubmit?.(email)
      setIsSubmitted(true)
      
      // Also store in localStorage as backup
      const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]')
      if (!existingEmails.includes(email)) {
        existingEmails.push(email)
        localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="text-6xl">🎉</div>
        <h3 className="text-2xl font-bold text-white arabic-heading">{t('form.success')}</h3>
        <p className="text-gray-300 arabic-text" dir={isRTL ? 'rtl' : 'ltr'}>
          {t('form.success')}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('form.email_placeholder')}
            className={`w-full px-6 py-4 text-lg rounded-full border border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
            disabled={isSubmitting}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 px-2">{error}</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{t('form.submitting')}</span>
            </div>
          ) : (
            t('form.submit_button')
          )}
        </motion.button>
      </div>
      
      <p className="text-gray-400 text-sm mt-4 text-center arabic-text" dir={isRTL ? 'rtl' : 'ltr'}>
        {t('form.privacy_notice')}
      </p>
    </form>
  )
}