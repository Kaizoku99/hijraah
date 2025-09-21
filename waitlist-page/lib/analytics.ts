'use client'

import { useEffect } from 'react'

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

export function Analytics() {
  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`
      script.async = true
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer?.push(arguments)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', 'GA_MEASUREMENT_ID')
    }
  }, [])

  return null
}

export function trackEvent(event: AnalyticsEvent) {
  // Track with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.name, event.properties)
  }

  // Track with Vercel Analytics (automatically included)
  console.log('Analytics Event:', event)

  // You can also add other analytics providers here:
  // - Mixpanel
  // - Amplitude
  // - PostHog
  // - Plausible
}

// Common tracking functions
export const analytics = {
  pageView: (page: string) => {
    trackEvent({
      name: 'page_view',
      properties: { page }
    })
  },

  waitlistSignup: (email: string) => {
    trackEvent({
      name: 'waitlist_signup',
      properties: { email }
    })
  },

  formSubmit: (formName: string) => {
    trackEvent({
      name: 'form_submit',
      properties: { form_name: formName }
    })
  },

  buttonClick: (buttonName: string, location: string) => {
    trackEvent({
      name: 'button_click',
      properties: { 
        button_name: buttonName,
        location 
      }
    })
  },

  scrollDepth: (depth: number) => {
    trackEvent({
      name: 'scroll_depth',
      properties: { depth }
    })
  },

  timeOnPage: (seconds: number) => {
    trackEvent({
      name: 'time_on_page',
      properties: { seconds }
    })
  }
}