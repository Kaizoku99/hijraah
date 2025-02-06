'use client'

import React from 'react'

interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range'
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | undefined) => void
  className?: string
}

export const Calendar = ({ mode = 'single', selected, onSelect, className }: CalendarProps) => {
  return (
    <div className={className}>
      {/* Calendar implementation */}
    </div>
  )
}

export default Calendar
