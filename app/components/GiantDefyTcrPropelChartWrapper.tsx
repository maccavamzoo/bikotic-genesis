'use client'

import dynamic from 'next/dynamic'

const GiantDefyTcrPropelChart = dynamic(
  () => import('./GiantDefyTcrPropelChart'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full bg-white rounded-xl shadow-lg p-8 my-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-center h-[400px] md:h-[600px]">
            <div className="text-gray-400">Loading chart...</div>
          </div>
        </div>
      </div>
    )
  }
)

export default GiantDefyTcrPropelChart
