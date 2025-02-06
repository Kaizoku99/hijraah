'use client'

import React, { ComponentPropsWithRef } from 'react'

interface AccordionProps extends ComponentPropsWithRef<'div'> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
}

interface AccordionItemProps extends ComponentPropsWithRef<'div'> {
  value: string
}

export const Accordion = ({ children, type, collapsible, ...props }: AccordionProps) => {
  return <div {...props}>{children}</div>
}

export const AccordionItem = ({ children, value, ...props }: AccordionItemProps) => {
  return <div className="border-b" {...props}>{children}</div>
}

export const AccordionTrigger = ({ children, ...props }: ComponentPropsWithRef<'button'>) => {
  return <button className="flex w-full justify-between py-4" {...props}>{children}</button>
}

export const AccordionContent = ({ children, ...props }: ComponentPropsWithRef<'div'>) => {
  return <div className="pb-4 pt-0" {...props}>{children}</div>
}

export default Accordion
