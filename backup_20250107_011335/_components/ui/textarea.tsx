'use client'

import React from 'react'

export const Textarea = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

export default Textarea
