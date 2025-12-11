import { describe, expect, it, vi } from 'vitest'
import { App } from '../../src/app.js'
import { mockPlayers } from '../mock.js'

const mockEnv = () => ({
  TENISU_DB: {
    get: vi.fn().mockImplementation(() => JSON.stringify(mockPlayers)),
    put: vi.fn(),
  },
  FRONT_URL: 'http://url',
})

describe('getPlayers', () => {
  it('should return all players sorted', async () => {
    const res = await App.createApp().request('/api/players', {}, mockEnv())
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toMatchSnapshot()
  })
})

describe('getPlayer', () => {
  it('should return a player by id', async () => {
    const res = await App.createApp().request('/api/players/17', {}, mockEnv())
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual([mockPlayers[0]])
  })

  it('should return 400 when id is not a number', async () => {
    const res = await App.createApp().request('/api/players/ohNooo', {}, mockEnv())
    expect(res.status).toBe(400)
    await expect(res.json()).resolves.toEqual({
      error: [
        {
          code: 'invalid_type',
          expected: 'number',
          message: 'Invalid input: expected number, received NaN',
          path: [],
          received: 'NaN',
        },
      ],
    })
  })

  it('should return 500 when an internal error', async () => {
    const env = mockEnv()
    env.TENISU_DB.get = vi.fn().mockRejectedValue(new Error('Unknown error'))
    const res = await App.createApp().request('/api/players/17', {}, env)
    expect(res.status).toBe(500)
    await expect(res.json()).resolves.toEqual({ error: 'Unknown error' })
  })
})
