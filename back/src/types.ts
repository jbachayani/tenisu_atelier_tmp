export interface Country {
  picture: string
  code: string
}

export interface PlayerData {
  rank: number
  points: number
  weight: number
  height: number
  age: number
  last: number[]
}

export interface Player {
  id: number
  firstname: string
  lastname: string
  shortname: string
  sex: string
  country: Country
  picture: string
  data: PlayerData
}
