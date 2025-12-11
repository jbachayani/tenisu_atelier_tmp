import type { Context } from 'hono'
import { z, ZodError } from 'zod'
import { playerSchema } from '../schema.js'
import type { Player } from '../types.js'

export async function getPlayers(c: Context) {
  try {
    const players: Player[] = JSON.parse(await c.env.TENISU_DB.get('players'))
    return c.json(players.toSorted((a, b) => a.data.rank - b.data.rank))
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Unknown error' }, 500)
  }
}

export async function getPlayer(c: Context) {
  try {
    const id = z.coerce.number().parse(c.req.param('id'))
    const players: Player[] = JSON.parse(await c.env.TENISU_DB.get('players'))
    return c.json(players.filter((player) => player.id === id))
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json({ error: JSON.parse(error.message) }, 400)
    }
    return c.json({ error: 'Unknown error' }, 500)
  }
}

export async function postPlayer(c: Context) {
  try {
    const body = await c.req.json()
    const players: Player[] = JSON.parse(await c.env.TENISU_DB.get('players'))
    const newPlayerData = playerSchema.parse(body)
    const newId = Math.max(...players.map((p) => p.id)) + 1
    const newPlayer = { id: newId, ...newPlayerData }
    players.push(newPlayer)
    await c.env.TENISU_DB.put('players', JSON.stringify(players))
    return c.json(newPlayer, 201)
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json({ error: JSON.parse(error.message) }, 400)
    }
    return c.json({ error: 'Unknown error' }, 500)
  }
}
