'use client'

import React, { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Check, X } from 'lucide-react'

interface TarmacMadoneChartProps {
  className?: string
}

export default function TarmacMadoneChart({ className = '' }: TarmacMadoneChartProps) {
  const [selectedBikes, setSelectedBikes] = useState({
    tarmac: true,
    madone: true
  })

  // Detailed specs for tooltip
  const detailedSpecs: Record<string, Record<string, string>> = {
    Weight: {
      tarmac: '685g frame, 7.25kg complete (size 56)',
      madone: '1,146g frame+fork, 7.52kg complete (ML)'
    },
    Aerodynamics: {
      tarmac: 'More aero than Venge, Speed Sniffer nose cone',
      madone: 'Full System Foil, IsoFlow aero cutout'
    },
    Comfort: {
      tarmac: '6% more compliant than SL7, 32mm clearance',
      madone: 'IsoFlow 80% more compliant, 32mm clearance'
    },
    Stiffness: {
      tarmac: '33% better stiffness-to-weight vs SL7',
      madone: '900 Series OCLV - 20% stronger than 800'
    },
    Climbing: {
      tarmac: 'Lightest frame at 685g',
      madone: 'Lightest Madone ever, merged with Emonda'
    },
    Value: {
      tarmac: '£7,249 + includes 4iiii power meter',
      madone: '£7,250, no power meter included'
    },
    Versatility: {
      tarmac: 'Pure race bike, 32mm max tire',
      madone: 'One bike for everything, 32mm max'
    }
  }

  // Comparison data normalized on 0-10 scale
  const data = [
    {
      attribute: 'Weight',
      tarmac: 9.5,
      madone: 9.0,
      fullMark: 10
    },
    {
      attribute: 'Aerodynamics',
      tarmac: 9.5,
      madone: 9.0,
      fullMark: 10
    },
    {
      attribute: 'Comfort',
      tarmac: 8.0,
      madone: 8.5,
      fullMark: 10
    },
    {
      attribute: 'Stiffness',
      tarmac: 9.5,
      madone: 9.0,
      fullMark: 10
    },
    {
      attribute: 'Climbing',
      tarmac: 9.5,
      madone: 8.5,
      fullMark: 10
    },
    {
      attribute: 'Versatility',
      tarmac: 8.0,
      madone: 9.0,
      fullMark: 10
    },
    {
      attribute: 'Value',
      tarmac: 9.0,
      madone: 7.5,
      fullMark: 10
    }
  ]

  const bikes = [
    {
      id: 'tarmac',
      name: 'Tarmac SL8 Pro',
      color: '#EF4444',
      price: '£7,249',
      category: 'Lightweight Aero',
      specs: [
        '685g frame, 7.25kg complete',
        'Includes 4iiii power meter',
        'Roval Rapide wheels 51/48.5mm',
        '16.6s faster over 40km vs SL7'
      ]
    },
    {
      id: 'madone',
      name: 'Madone SLR 7 Gen 8',
      color: '#3B82F6',
      price: '£7,250',
      category: 'All-Round Race',
      specs: [
        '900 Series OCLV, 7.52kg complete',
        'IsoFlow comfort technology',
        'Bontrager Aeolus Pro 51mm wheels',
        'Lightest Madone Disc ever'
      ]
    }
  ]

  const toggleBike = (bikeId: string) => {
    setSelectedBikes(prev => ({
      ...prev,
      [bikeId]: !prev[bikeId as keyof typeof prev]
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
            
            {selectedBikes.tarmac && (
              <Radar
                name="Tarmac"
                dataKey="tarmac"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.25}
                strokeWidth={3}
              />
            )}
            
            {selectedBikes.madone && (
              <Radar
                name="Madone"
                dataKey="madone"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.25}
                strokeWidth={3}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          Both bikes feature Shimano Ultegra Di2 groupsets and integrated aero cockpits. The Tarmac includes 
          a 4iiii power meter and Roval Rapide CL III wheels (asymmetric 51/48.5mm). The Madone features 
          IsoFlow comfort technology and Bontrager Aeolus Pro 51 wheels (51mm front and rear). Both have 
          32mm tire clearance and T47 threaded bottom brackets.
        </p>
      </div>
    </div>
  )
}
