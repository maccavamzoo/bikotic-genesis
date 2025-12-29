'use client'

import React, { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Check, X } from 'lucide-react'

interface GiantDefyTcrPropelChartProps {
  className?: string
}

export default function GiantDefyTcrPropelChart({ className = '' }: GiantDefyTcrPropelChartProps) {
  const [selectedBikes, setSelectedBikes] = useState({
    defy: true,
    tcr: true,
    propel: true
  })

  // Detailed specs for tooltip
  const detailedSpecs: Record<string, Record<string, string>> = {
    Weight: {
      defy: 'Complete: Approx. 7.5-8kg | Frame: Approx. 950-1050g (Giant don\'t list actual figures)',
      tcr: 'Complete: Approx. 7-7.3kg | Frame: Approx. 800-900g (Giant don\'t list actual figures)',
      propel: 'Complete: Approx. 7.3-7.6kg | Frame: Approx. 900-1000g (Giant don\'t list actual figures)'
    },
    Aerodynamics: {
      defy: 'Standard endurance tubes',
      tcr: 'Optimized tube shaping',
      propel: 'AeroSystem Shaping + truncated ellipse tubes'
    },
    Comfort: {
      defy: 'D-Fuse seatpost/handlebar + 40mm tire clearance',
      tcr: 'Race geometry, 33mm tire clearance',
      propel: 'Aero race geometry, 32mm tire clearance'
    },
    Stiffness: {
      defy: 'Endurance-focused layup',
      tcr: 'PowerCore BB + race layup',
      propel: 'PowerCore BB + aero race layup'
    },
    Climbing: {
      defy: 'Compact 50/34 gearing, heavier frame',
      tcr: 'Semi-compact 50/36, lightest frame',
      propel: 'Standard 52/36, aero frame'
    },
    Versatility: {
      defy: '40mm max tire, fender mounts, relaxed geo',
      tcr: '33mm max tire, aggressive race geo',
      propel: '32mm max tire, aero-focused race geo'
    },
    Value: {
      defy: '£5,499 - endurance features',
      tcr: '£5,499 - pure race performance',
      propel: '£5,299 - aero performance'
    }
  }

  // Comparison data normalized on 0-10 scale
  const data = [
    {
      attribute: 'Weight',
      defy: 7.0,
      tcr: 9.5,
      propel: 8.5,
      fullMark: 10
    },
    {
      attribute: 'Aerodynamics',
      defy: 6.0,
      tcr: 7.5,
      propel: 9.5,
      fullMark: 10
    },
    {
      attribute: 'Comfort',
      defy: 9.5,
      tcr: 6.0,
      propel: 6.5,
      fullMark: 10
    },
    {
      attribute: 'Stiffness',
      defy: 7.5,
      tcr: 9.0,
      propel: 9.0,
      fullMark: 10
    },
    {
      attribute: 'Climbing',
      defy: 7.0,
      tcr: 9.5,
      propel: 8.5,
      fullMark: 10
    },
    {
      attribute: 'Versatility',
      defy: 9.5,
      tcr: 7.0,
      propel: 6.5,
      fullMark: 10
    },
    {
      attribute: 'Value',
      defy: 8.0,
      tcr: 8.0,
      propel: 8.5,
      fullMark: 10
    }
  ]

  const bikes = [
    {
      id: 'defy',
      name: 'Defy Advanced Pro 0',
      color: '#3B82F6',
      price: '£5,499',
      category: 'Endurance',
      specs: [
        'Weight: Endurance geometry adds comfort',
        'Tire clearance: 40mm',
        'Gearing: 50/34 with 11-34',
        'D-Fuse compliance technology'
      ]
    },
    {
      id: 'tcr',
      name: 'TCR Advanced Pro 0',
      color: '#EF4444',
      price: '£5,499',
      category: 'Lightweight Race',
      specs: [
        'Weight: Lightest of the three',
        'Tire clearance: 33mm',
        'Gearing: 50/36 with 11-34',
        'Most aggressive race geometry'
      ]
    },
    {
      id: 'propel',
      name: 'Propel Advanced Pro 0',
      color: '#10B981',
      price: '£5,299',
      category: 'Aero Race',
      specs: [
        'Weight: Lighter than previous gen',
        'Tire clearance: 32mm',
        'Gearing: 52/36 with 11-30',
        'Optimized for aerodynamics'
      ]
    }
  ]

  const toggleBike = (bikeId: string) => {
    setSelectedBikes(prev => ({
      ...prev,
      [bikeId]: !prev[bikeId]
    }))
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const attribute = payload[0].payload.attribute
      // Sort by value (score) in descending order - best first
      const sortedPayload = [...payload].sort((a: any, b: any) => b.value - a.value)
      
      return (
        <div className="bg-white p-4 border-2 border-gray-200 rounded-lg shadow-lg max-w-md">
          <p className="font-bold text-gray-800 mb-3 text-base">{attribute}</p>
          {sortedPayload.map((entry: any, index: number) => {
            const bikeId = entry.dataKey
            const spec = detailedSpecs[attribute]?.[bikeId]
            return (
              <div key={index} className="mb-2 last:mb-0">
                <p style={{ color: entry.color }} className="font-semibold text-sm">
                  {entry.name}: {entry.value}/10
                </p>
                {spec && (
                  <p className="text-xs text-gray-600 mt-1 pl-2 border-l-2" style={{ borderColor: entry.color }}>
                    {spec}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`w-full bg-white rounded-xl shadow-lg p-8 my-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Comparison</h3>
        <p className="text-gray-600">Click bikes to toggle visibility. Hover over chart points for detailed specs.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {bikes.map(bike => (
          <div
            key={bike.id}
            onClick={() => toggleBike(bike.id)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 relative ${
              selectedBikes[bike.id as keyof typeof selectedBikes]
                ? 'border-gray-800 shadow-lg scale-105'
                : 'border-gray-200 opacity-40 hover:opacity-60'
            }`}
            style={{
              backgroundColor: selectedBikes[bike.id as keyof typeof selectedBikes] ? `${bike.color}10` : '#ffffff'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: bike.color }}
              />
              <span className="text-sm font-semibold text-gray-500">{bike.category}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{bike.name}</h3>
            <p className="text-2xl font-bold mb-3" style={{ color: bike.color }}>{bike.price}</p>
            <ul className="space-y-1 pb-8">
              {bike.specs.map((spec, idx) => (
                <li key={idx} className="text-sm text-gray-600">• {spec}</li>
              ))}
            </ul>
            <div className="absolute bottom-4 right-4">
              {selectedBikes[bike.id as keyof typeof selectedBikes] ? (
                <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
              ) : (
                <X className="w-10 h-10 text-red-500" strokeWidth={3} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <ResponsiveContainer width="100%" height={600}>
          <RadarChart data={data}>
            <PolarGrid stroke="#cbd5e1" />
            <PolarAngleAxis 
              dataKey="attribute" 
              tick={{ fill: '#475569', fontSize: 14, fontWeight: 600 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 10]} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {selectedBikes.defy && (
              <Radar
                name="Defy"
                dataKey="defy"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.25}
                strokeWidth={3}
              />
            )}
            
            {selectedBikes.tcr && (
              <Radar
                name="TCR"
                dataKey="tcr"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.25}
                strokeWidth={3}
              />
            )}
            
            {selectedBikes.propel && (
              <Radar
                name="Propel"
                dataKey="propel"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.25}
                strokeWidth={3}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          All three bikes feature Shimano Ultegra Di2 groupsets, Giant Power Pro power meters, and SLR carbon wheels. 
          The Defy prioritizes comfort and versatility with endurance geometry and 40mm tire clearance. The TCR is the 
          pure climbing machine with the lightest weight and most aggressive position. The Propel trades a bit of weight 
          for maximum aerodynamic efficiency.
        </p>
      </div>
    </div>
  )
}
