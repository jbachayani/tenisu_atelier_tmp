import type { Context } from 'hono'
import type { Player } from '../types.js'

function getCountryWithBestWinRatio(players: Player[]): string {
  const countryStats: Record<string, { wins: number; total: number }> = {}

  for (const player of players) {
    if (!countryStats[player.country.code]) {
      countryStats[player.country.code] = { wins: 0, total: 0 }
    }
    const wins = player.data.last.filter((result) => result === 1).length
    countryStats[player.country.code].wins += wins
    countryStats[player.country.code].total += player.data.last.length
  }

  let bestCountry = ''
  let maxRatio = -1

  for (const countryCode in countryStats) {
    const stats = countryStats[countryCode]
    const ratio = stats.total > 0 ? stats.wins / stats.total : 0
    if (ratio > maxRatio) {
      maxRatio = ratio
      bestCountry = countryCode
    }
  }

  return bestCountry
}

function getAverageBMI(players: Player[]): number {
  const totalBmi = players.reduce((sum, player) => {
    const heightInMeters = player.data.height / 100
    const weightInKg = player.data.weight / 1000
    const bmi = weightInKg / (heightInMeters * heightInMeters)
    return sum + bmi
  }, 0)

  return totalBmi / players.length
}

function getMedianHeight(players: Player[]): number {
  const heights = players
    .map((player) => player.data.height)
    .sort((a, b) => a - b)
  const mid = Math.floor(heights.length / 2)

  if (heights.length % 2 === 0) {
    return (heights[mid - 1] + heights[mid]) / 2
  } else {
    return heights[mid]
  }
}

export async function getStats(c: Context) {
  try {
    const players: Player[] = JSON.parse(await c.env.TENISU_DB.get('players'))

    const countryWithBestWinRatio = getCountryWithBestWinRatio(players)
    const averageBmi = getAverageBMI(players)
    const medianHeight = getMedianHeight(players)

    return c.json({ countryWithBestWinRatio, averageBmi, medianHeight })
  } catch (error) {
    return c.json({ error: 'Unknown error' })
  }
}
