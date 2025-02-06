'use client'

import React, { ComponentPropsWithRef } from 'react'

export const Input = ({ ...props }: ComponentPropsWithRef<'input'>) => {
  return <input {...props} />
}

export default Input
