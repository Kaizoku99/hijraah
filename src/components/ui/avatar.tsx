'use client'

import React from 'react'

export const Avatar = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

export default Avatar
