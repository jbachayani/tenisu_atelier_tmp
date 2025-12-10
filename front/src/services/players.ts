import { type Player } from '../types'

export async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch('/api/players')
  if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`)
  return response.json()
}
