'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const testimonials = [
  {
    name: 'أحمد حسن - Ahmed Hassan',
    role: 'Software Engineer',
    country: 'Egypt → Canada',
    image: '�‍💻',
    text: 'Finally, a platform that understands Arab professionals! My consultant spoke Arabic, understood my background, and helped me get my Canadian PR in record time.',
    rating: 5
  },
  {
    name: 'فاطمة الزهراء - Fatima Al-Zahra',
    role: 'Medical Doctor',
    country: 'Jordan → Australia',
    image: '�‍⚕️',
    text: 'The document validation service was incredible. They helped me get my medical degree recognized and guided me through the entire process in Arabic.',
    rating: 5
  },
  {
    name: 'عمر المنصوري - Omar Al-Mansouri',
    role: 'Business Owner',
    country: 'UAE → Germany',
    image: '�‍💼',
    text: 'The personalized roadmap they created for my investor visa was perfect. They understood my business background and cultural needs perfectly.',
    rating: 5
  },
  {
    name: 'ليلى العبدالله - Layla Abdullah',
    role: 'Data Scientist',
    country: 'Lebanon → UK',
    image: '�‍💼',
    text: 'Best investment I ever made. My Hijraah consultant became like family - always available, always understanding, always professional.',
    rating: 5
  }
]

export function TestimonialsSection() {
  const { t, isRTL } = useLanguage()
  
  return (
    <section className="py-20 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 arabic-heading mixed-text" style={{ paddingBottom: '1.5rem', minHeight: '5rem', overflow: 'visible' }}>
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
            {t('testimonials.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-8 relative group hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-500/30" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="text-xl font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-primary-400 text-sm">
                    {testimonial.country}
                  </p>
                </div>
              </div>

              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 glass-card px-8 py-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <span className="text-white font-semibold">4.9/5</span>
            <span className="text-gray-400">from 5,000+ Arab professionals</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}