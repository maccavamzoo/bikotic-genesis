import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const sql = getDb()
  const rows = await sql`
    SELECT id, model_year, model_des, price, weight, frame_material,
           bike_type_main, reach, stack, wheelbase, head_angle, chainstay, bb_drop
    FROM bikes
    WHERE publish = 1 AND price > 0
    ORDER BY RANDOM()
    LIMIT 1
  `
  return NextResponse.json(rows[0])
}
