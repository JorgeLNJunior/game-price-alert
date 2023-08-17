export interface Game {
  id: string
  title: string
  steam_url: string
  nuuvem_url: string | null
  green_man_gaming_url: string | null
  created_at: Date
  updated_at: Date | null
}

export interface GamePrice {
  id: string
  game_id: string
  steam_price: number
  nuuvem_price: number | null
  green_man_gaming_price: number | null
  created_at: Date
  updated_at: Date | null
}

export interface LowestPrice {
  steam: { price: number | null, date: string | null }
  nuuvem: { price: number | null, date: string | null }
  green_man_gaming: { price: number | null, date: string | null }
}

export interface QueryData<T> {
  results: T
  pages: number
}
