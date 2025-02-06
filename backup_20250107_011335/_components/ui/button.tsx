'use client'

import React, { ComponentPropsWithRef } from 'react'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'link'
}

export const Button = ({ children, asChild, variant = 'default', className, ...props }: ButtonProps) => {
  const Comp = asChild ? 'span' : 'button'
  return <Comp className={`${variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : ''} ${className || ''}`} {...props}>{children}</Comp>
}

export default Button
