import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTheme } from '../hooks/useTheme'

describe('useTheme', () => {
  const createStorageMock = () => {
    const store = new Map<string, string>()
    return {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value)
      },
      removeItem: (key: string) => {
        store.delete(key)
      },
      clear: () => {
        store.clear()
      },
    }
  }

  let storage: ReturnType<typeof createStorageMock>

  beforeEach(() => {
    storage = createStorageMock()
    Object.defineProperty(globalThis, 'localStorage', {
      value: storage,
      configurable: true,
    })
    storage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('reads initial value from localStorage', () => {
    storage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.isDark).toBe(true)
  })

  it('toggles theme and updates html class', () => {
    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(storage.getItem('theme')).toBe('dark')
  })
})
