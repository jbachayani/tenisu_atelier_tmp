import type { Context } from 'hono'
import { players } from '../services.js'
import { z, ZodError } from 'zod'
import { writeFile } from 'fs/promises'
import { playerSchema } from '../schema.js'

export async function getPlayers(c: Context) {
  return c.json(players.toSorted((a, b) => a.data.rank - b.data.rank))
}

export async function getPlayer(c: Context) {
  try {
    const id = z.coerce.number().parse(c.req.param('id'))
    return c.json(players.filter((player) => player.id === id))
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json({ error: JSON.parse(error.message) })
    }
    return c.json({ error: 'Unknown error' })
  }
}

export async function postPlayer(c: Context) {
  try {
    const body = await c.req.json()
    const newPlayerData = playerSchema.parse(body)
    const newId = Math.max(...players.map((p) => p.id)) + 1
    const newPlayer = { id: newId, ...newPlayerData }
    players.push(newPlayer)
    await writeFile(
      './src/db.json',
      JSON.stringify({ players: players }, null, 2)
    )
    return c.json(newPlayer)
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json({ error: JSON.parse(error.message) })
    }
    return c.json({ error: 'Unknown error' })
  }
}
