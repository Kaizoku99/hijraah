'use client'

import React, { ComponentPropsWithRef } from 'react'

interface ScrollAreaProps extends ComponentPropsWithRef<'div'> {
  className?: string
}

export const ScrollArea = ({ children, className, ...props }: ScrollAreaProps) => {
  return (
    <div className={`overflow-auto ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export default ScrollArea 