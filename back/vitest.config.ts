import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
})
