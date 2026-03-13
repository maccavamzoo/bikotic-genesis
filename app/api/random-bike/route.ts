import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sql = getDb()

  const countRows = await sql`SELECT COUNT(*) as total FROM bikes`
  const total = Number(countRows[0].total)
  const offset = Math.floor(Math.random() * total)

  const rows = await sql`
    SELECT id, model_year, model_des, price, weight, frame_material,
           bike_type_main, reach, stack, wheelbase, head_angle, chainstay, bb_drop
    FROM bikes
    LIMIT 1
    OFFSET ${offset}
  `

  return NextResponse.json({ ...rows[0], total })
}
