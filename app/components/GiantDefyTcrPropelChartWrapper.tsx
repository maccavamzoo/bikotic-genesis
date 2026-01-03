'use client'

import dynamic from 'next/dynamic'

const GiantDefyTcrPropelChart = dynamic(
  () => import('./GiantDefyTcrPropelChart'),
  { ssr: false }
)

export default GiantDefyTcrPropelChart
