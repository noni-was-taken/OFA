import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingSpinner from '../../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with accessible label', () => {
    render(<LoadingSpinner label="Building exam" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Building exam')
    expect(screen.getByText('Building exam')).toBeInTheDocument()
  })
})
