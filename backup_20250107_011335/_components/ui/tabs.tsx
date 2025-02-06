'use client'

import React, { ComponentPropsWithRef } from 'react'

interface TabsProps extends ComponentPropsWithRef<'div'> {
  defaultValue?: string
}

interface TabContentProps extends ComponentPropsWithRef<'div'> {
  value: string
}

export const Tabs = ({ children, defaultValue, ...props }: TabsProps) => {
  return <div {...props}>{children}</div>
}

export const TabsList = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="flex space-x-1" {...props}>{children}</div>
}

export const TabsTrigger = ({ children, ...props }: ComponentPropsWithRef<'button'>) => {
  return <button className="px-3 py-1.5" {...props}>{children}</button>
}

export const TabsContent = ({ children, value, ...props }: TabContentProps) => {
  return <div className="mt-2" {...props}>{children}</div>
}

export default Tabs
