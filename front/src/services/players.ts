import { type Player } from '../types'

export async function fetchPlayers(): Promise<Player[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/players`)
  if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`)
  return response.json()
}
