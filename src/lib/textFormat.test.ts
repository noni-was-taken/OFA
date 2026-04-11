import { describe, expect, it } from 'vitest'
import { normalizeLegacySymbols, normalizeMathDelimiters } from './textFormat'

describe('textFormat', () => {
  it('normalizes legacy symbols', () => {
    const input = '\uF0AE \uF0DF \uF0A3 \uF0B3 \uF0B8 \uF0B4 \uF0B9'
    expect(normalizeLegacySymbols(input)).toBe('→ ← ≤ ≥ ÷ × ≠')
  })

  it('normalizes inline and block math delimiters', () => {
    const input = 'Value \\(x+1\\) and block \\[x^2\\]'
    expect(normalizeMathDelimiters(input)).toBe('Value $x+1$ and block $$x^2$$')
  })
})
