'use client'

import React from 'react'

export const Label = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

export default Label
