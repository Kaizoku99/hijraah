'use client'

import React, { ComponentPropsWithRef } from 'react'

export const Card = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div {...props}>{children}</div>
}

export const CardHeader = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="p-6 pb-4" {...props}>{children}</div>
}

export const CardContent = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="p-6 pt-0" {...props}>{children}</div>
}

export const CardTitle = ({ children, ...props }: ComponentPropsWithRef<'h3'>) => {
  return <h3 className="text-lg font-medium" {...props}>{children}</h3>
}

export const CardDescription = ({ children, ...props }: ComponentPropsWithRef<'p'>) => {
  return <p className="text-sm text-muted-foreground" {...props}>{children}</p>
}

export default Card
