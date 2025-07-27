import { render, screen } from '@testing-library/react'
import React from 'react'

import { footer } from '.'

describe('footer Component', () => {
  it('renders correctly', () => {
    render(<footer>Test Content</footer>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
