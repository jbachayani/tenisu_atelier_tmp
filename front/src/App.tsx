import { useEffect, useState } from 'react'
import { PlayerCard } from './components/PlayerCard'
import type { Player } from './types.ts'
import { fetchPlayers } from './services/players.ts'
import { PlayerDetails } from './components/PlayerDetail.tsx'

export default function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    async function loadPlayers() {
      setLoading(true)
      fetchPlayers()
        .then((r) => setPlayers(r))
        .catch((error) => console.error('Failed to fetch players', error))
        .finally(() => setLoading(false))
    }
    loadPlayers()
  }, [])

  const filteredPlayers = players.filter((p) => {
    const fullName = `${p.firstname} ${p.lastname}`.toLowerCase()
    return fullName.includes(search.toLowerCase())
  })

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-x-hidden font-sans">
      <div className="relative z-10 w-full max-w-2xl mx-auto lg:mx-0 lg:ml-20">
        <div className="mb-10 mt-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un joueur"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-md text-white placeholder-white/70 rounded-[15px] py-4 px-6 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-heading font-semibold tracking-wide shadow-lg"
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-white"></span>
              <p className="mt-4 text-white font-mulish font-semibold animate-pulse">
                Chargement des joueurs...
              </p>
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={setSelectedPlayer}
              />
            ))
          )}

          {!loading && filteredPlayers.length === 0 && (
            <div className="text-white text-center font-bold mt-10 text-xl font-heading">
              Aucun joueur trouvé
            </div>
          )}
        </div>
      </div>

      {selectedPlayer && (
        <PlayerDetails
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  )
}
