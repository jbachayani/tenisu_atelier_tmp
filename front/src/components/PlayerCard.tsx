import type { Player } from '../types.ts'

interface PlayerCardProps {
  player: Player
  onClick: (player: Player) => void
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  return (
    <div
      onClick={() => onClick(player)}
      className="bg-white rounded-[12px] overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex h-28 md:h-32 w-full max-w-2xl mx-auto group transform hover:-translate-y-1 relative z-10"
    >
      <div className="w-28 md:w-32 lg:w-40 relative bg-gray-100 shrink-0">
        <img
          src={player.picture}
          alt={player.lastname}
          className="w-full h-full object-cover object-top mix-blend-multiply pt-2"
        />
      </div>

      <div className="flex-1 p-4 md:px-6 flex flex-col justify-center">
        <h2 className="font-heading font-bold text-lg md:text-xl text-primary mb-3">
          {player.firstname} {player.lastname}
        </h2>

        <div className="flex items-center gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="stat-label">RANK</span>
            <span className="font-bold text-primary text-base">
              #{player.data.rank}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="stat-label">POINTS</span>
            <span className="font-bold text-primary text-base">
              {player.data.points}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="stat-label">COUNTRY</span>
            <span className="font-bold text-primary text-base">
              {player.country.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
