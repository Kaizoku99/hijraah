'use client'

import React, { ComponentPropsWithRef } from 'react'

interface SelectProps extends ComponentPropsWithRef<'select'> {
  value?: string
  onValueChange?: (value: string) => void
}

interface SelectValueProps extends ComponentPropsWithRef<'span'> {
  placeholder?: string
}

export const Select = ({ children, ...props }: SelectProps) => {
  return <select {...props}>{children}</select>
}

export const SelectTrigger = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="flex items-center justify-between" {...props}>{children}</div>
}

export const SelectContent = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="mt-1 border rounded-md shadow-lg" {...props}>{children}</div>
}

export const SelectItem = ({ children, ...props }: ComponentPropsWithRef<'option'>) => {
  return <option {...props}>{children}</option>
}

export const SelectValue = ({ children, placeholder, ...props }: SelectValueProps) => {
  return <span {...props}>{children || placeholder}</span>
}

export default Select
