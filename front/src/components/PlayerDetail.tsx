import type { Player } from '../types.ts'
import type { ReactNode } from 'react'

interface PlayerDetailsProps {
  player: Player
  onClose: () => void
}

const StatItem = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex flex-col">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </div>
)

export function PlayerDetails({ player, onClose }: PlayerDetailsProps) {
  const weightKg = Math.round(player.data.weight / 1000)
  const countryNameMap: Record<string, string> = {
    SRB: 'Serbie',
    USA: 'USA',
    SUI: 'Suisse',
    ESP: 'Espagne',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 modal-overlay transition-opacity"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 cursor-pointer text-white hover:text-white/80 transition-colors"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 30L30 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 10L30 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="relative bg-white w-full max-w-[1000px] aspect-[16/9] max-h-[90vh] shadow-2xl flex flex-col md:flex-row overflow-hidden md:overflow-visible animate-[fadeIn_0.3s_ease-out] rounded-[2px]">
        <div className="w-full md:w-[40%] relative h-64 md:h-auto bg-white md:bg-transparent flex items-end justify-center z-20 pointer-events-none md:static order-2 md:order-1">
          <img
            src={player.picture}
            alt={player.lastname}
            className="w-4/12 h-full object-contain object-bottom md:object-top md:absolute md:left-[-100px] md:-bottom-[40px] md:h-auto md:max-w-none filter drop-shadow-xl"
            style={{ filter: 'drop-shadow(10px 0px 20px rgba(0,0,0,0.25))' }}
          />
        </div>

        <div className="w-full h-full p-8 md:p-12 md:pl-0 flex flex-col relative z-10 order-1 md:order-2 ml-auto">
          <div className="absolute top-8 right-8 md:top-12 md:right-12 flex flex-col items-center">
            <img
              src={player.country.picture}
              alt={player.country.code}
              className="w-[80px] md:w-[80px] h-auto shadow-sm mb-2"
            />
            <span className="font-heading font-light text-2xl md:text-3xl tracking-[0.2em] text-gray-300">
              {player.country.code}
            </span>
          </div>

          <div className="mt-4 md:mt-8 mb-8 md:mb-12 relative z-0 md:-ml-12 lg:-ml-20">
            <h1 className="font-heading font-bold text-5xl md:text-[64px] lg:text-[80px] leading-[0.85] uppercase">
              <span className="text-outline-primary mb-1">
                {player.firstname}
              </span>
              <span className="block text-primary">{player.lastname}</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 bg-white/50 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              <StatItem label="Rank" value={`#${player.data.rank}`} />
              <StatItem label="Points" value={player.data.points} />
              <StatItem
                label="Country"
                value={countryNameMap[player.country.code]}
              />
              <StatItem label="Birthday" value={'10/10/1990'} />
              <StatItem label="Age" value={player.data.age} />
              <div className="hidden md:block" />
              <StatItem label="Weight" value={`${weightKg} kg`} />
              <StatItem label="Height" value={`${player.data.height} cm`} />
            </div>

            <div className="lg:w-1/3 pt-1 border-t lg:border-t-0 border-gray-100 lg:border-l lg:pl-8 mt-4 lg:mt-0">
              <h3 className="stat-label mb-4">Career Titles</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold font-heading text-primary">
                      2021 - 5
                    </span>
                  </div>
                  <ul className="text-[10px] text-gray-400 font-sans leading-tight">
                    <li>ATP Masters 1000 Paris (Indoor/Hard)</li>
                    <li>Wimbledon (Outdoor/Grass)</li>
                    <li>Roland Garros (Outdoor/Clay)</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold font-heading text-primary">
                      2020 - 4
                    </span>
                  </div>
                  <ul className="text-[10px] text-gray-400 font-sans leading-tight">
                    <li>ATP Masters 1000 Rome (Outdoor/Clay)</li>
                    <li>ATP Masters 1000 Cincinnati (Outdoor/Hard)</li>
                    <li>Dubai (Outdoor/Hard)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
