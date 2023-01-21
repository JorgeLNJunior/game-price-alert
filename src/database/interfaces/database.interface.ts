import { ColumnType } from 'kysely'

export interface Game {
  id: ColumnType<string, string, never>
  title: string
  steam_url: string
  nuuvem_url: string | null
  green_man_gaming_url: string | null
  created_at: ColumnType<Date, never, never>
  updated_at: ColumnType<Date, never, never>
}

export interface Database {
  game: Game
}
