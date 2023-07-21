export interface Game {
  id: string
  title: string
  steam_url: string
  nuuvem_url: string | null
  created_at: Date
  updated_at: Date | null
}

export interface GamePrice {
  id: string
  game_id: string
  steam_price: number
  nuuvem_price: number | null
  created_at: Date
  updated_at: Date | null
}

export interface LowestPrice {
  steam?: GamePrice
  nuuvem?: GamePrice
}

export interface QueryData<T> {
  results: T
  pages: number
}
