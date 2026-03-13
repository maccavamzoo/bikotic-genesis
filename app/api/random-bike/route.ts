import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('[random-bike] Request received')

  if (!process.env.DATABASE_URL) {
    console.error('[random-bike] DATABASE_URL is not set')
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 })
  }

  console.log('[random-bike] DATABASE_URL is present')

  try {
    const sql = getDb()
    console.log('[random-bike] DB connection created, running query...')

    const countRows = await sql`SELECT COUNT(*) as total FROM bikes WHERE publish = 1 AND price > 0`
    console.log(`[random-bike] Bikes matching filter: ${countRows[0].total}`)

    const rows = await sql`
      SELECT id, model_year, model_des, price, weight, frame_material,
             bike_type_main, reach, stack, wheelbase, head_angle, chainstay, bb_drop
      FROM bikes
      WHERE publish = 1 AND price > 0
      ORDER BY RANDOM()
      LIMIT 1
    `

    console.log(`[random-bike] Query returned ${rows.length} rows`)

    if (!rows[0]) {
      console.error('[random-bike] No rows returned from query')
      return NextResponse.json({ error: 'No bikes found' }, { status: 404 })
    }

    console.log(`[random-bike] Returning bike id: ${rows[0].id}`)
    return NextResponse.json({ ...rows[0], _debug_pool_size: Number(countRows[0].total) })

  } catch (e) {
    console.error('[random-bike] DB error:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
