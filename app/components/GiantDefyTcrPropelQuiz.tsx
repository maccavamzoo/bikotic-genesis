'use client'

import React, { useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: {
    text: string
    scores: { defy: number; tcr: number; propel: number }
  }[]
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of riding do you do most?",
    options: [
      { text: "Long sportives and gran fondos (100+ miles)", scores: { defy: 3, tcr: 1, propel: 0 } },
      { text: "Racing - crits, road races, time trials", scores: { defy: 0, tcr: 2, propel: 3 } },
      { text: "Fast club rides and chain gangs", scores: { defy: 1, tcr: 2, propel: 2 } },
      { text: "Bit of everything - training, events, racing", scores: { defy: 1, tcr: 3, propel: 1 } }
    ]
  },
  {
    id: 2,
    question: "What's more important to you?",
    options: [
      { text: "All-day comfort - I want to feel fresh after 6 hours", scores: { defy: 3, tcr: 0, propel: 0 } },
      { text: "Pure speed - comfort is for old men", scores: { defy: 0, tcr: 1, propel: 3 } },
      { text: "Climbing performance - lighter is better", scores: { defy: 0, tcr: 3, propel: 1 } },
      { text: "Balanced performance across all terrain", scores: { defy: 1, tcr: 3, propel: 1 } }
    ]
  },
  {
    id: 3,
    question: "What's your typical ride distance?",
    options: [
      { text: "50-80 miles regularly, 100+ on weekends", scores: { defy: 3, tcr: 1, propel: 0 } },
      { text: "30-60 miles, fast and hard", scores: { defy: 0, tcr: 2, propel: 3 } },
      { text: "60-100 miles at a decent pace", scores: { defy: 2, tcr: 2, propel: 1 } },
      { text: "Varies - sometimes short and fast, sometimes long", scores: { defy: 1, tcr: 3, propel: 1 } }
    ]
  },
  {
    id: 4,
    question: "What terrain do you ride most?",
    options: [
      { text: "Proper hills - Yorkshire Dales, Lakes, Alps", scores: { defy: 1, tcr: 3, propel: 0 } },
      { text: "Flat or rolling - racing circuits, time trials", scores: { defy: 0, tcr: 1, propel: 3 } },
      { text: "Bit of both - varied terrain", scores: { defy: 1, tcr: 3, propel: 1 } },
      { text: "Long rolling roads - endurance events", scores: { defy: 3, tcr: 1, propel: 1 } }
    ]
  },
  {
    id: 5,
    question: "What matters most when you're dropping £5k+ on a bike?",
    options: [
      { text: "Versatility - one bike for everything", scores: { defy: 3, tcr: 2, propel: 0 } },
      { text: "Race-winning performance - focused tool", scores: { defy: 0, tcr: 2, propel: 3 } },
      { text: "Best all-rounder - handles everything well", scores: { defy: 1, tcr: 3, propel: 1 } },
      { text: "Maximum speed on flat roads", scores: { defy: 0, tcr: 1, propel: 3 } }
    ]
  }
]

export default function GiantDefyTcrPropelQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ defy: 0, tcr: 0, propel: 0 })
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const handleAnswer = (optionIndex: number) => {
    const option = questions[currentQuestion].options[optionIndex]
    
    setScores(prev => ({
      defy: prev.defy + option.scores.defy,
      tcr: prev.tcr + option.scores.tcr,
      propel: prev.propel + option.scores.propel
    }))
    
    setSelectedAnswers([...selectedAnswers, optionIndex])

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScores({ defy: 0, tcr: 0, propel: 0 })
    setShowResults(false)
    setSelectedAnswers([])
  }

  const getRecommendation = () => {
    const maxScore = Math.max(scores.defy, scores.tcr, scores.propel)
    
    if (scores.defy === maxScore) {
      return {
        bike: 'Defy Advanced Pro 0',
        price: '£5,499',
        color: '#3B82F6',
        image: '/images/giant-defy-advanced-pro-0-2026.jpg',
        reason: 'You want a bike that can handle long miles in comfort. The Defy\'s D-Fuse technology, relaxed geometry, and 40mm tire clearance make it the endurance specialist. It\'s built for sportives, gran fondos, and all-day rides where you want to feel fresh at the end.',
        keyFeatures: [
          '40mm tire clearance for comfort and versatility',
          'D-Fuse seatpost and handlebar absorb road vibrations',
          'Compact 50/34 gearing for steep climbs',
          'Most upright position of the three',
          'Fender mounts for winter training'
        ]
      }
    } else if (scores.tcr === maxScore) {
      return {
        bike: 'TCR Advanced Pro 0',
        price: '£5,499',
        color: '#EF4444',
        image: '/images/giant-tcr-advanced-pro-0-2026.jpg',
        reason: 'You want the best all-rounder. The TCR is Giant\'s WorldTour race bike that handles everything from mountain stages to flat sprints. It\'s the lightest, has optimized aero, and aggressive geometry. If you could only have one bike, this is it.',
        keyFeatures: [
          'Lightest frame of the three (approx. 800-900g)',
          'Best climbing performance',
          'Balanced aero and weight',
          'Semi-compact 50/36 gearing',
          'Most versatile race geometry'
        ]
      }
    } else {
      return {
        bike: 'Propel Advanced Pro 0',
        price: '£5,299',
        color: '#10B981',
        image: '/images/giant-propel-advanced-pro-0-2026.jpg',
        reason: 'You want pure speed on flat and rolling roads. The Propel is Giant\'s dedicated aero race bike with AeroSystem Shaping and truncated ellipse tubes. It\'s built for closing gaps, chasing back, and unleashing sprint finishes. Best value at £5,299 too.',
        keyFeatures: [
          'Maximum aerodynamic efficiency',
          '50mm deep-section wheels',
          'Standard 52/36 chainrings for flat speed',
          'Lowest price of the three at £5,299',
          'Optimized for time trials and flat races'
        ]
      }
    }
  }

  if (showResults) {
    const recommendation = getRecommendation()
    
    return (
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 my-8">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Perfect Bike</h3>
          <p className="text-gray-600">Based on your answers, here's what we recommend:</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-3xl font-bold" style={{ color: recommendation.color }}>
                {recommendation.bike}
              </h4>
              <p className="text-2xl font-bold text-gray-600 mt-2">{recommendation.price}</p>
            </div>
          </div>

          <div className="mb-6">
            <img 
              src={recommendation.image} 
              alt={recommendation.bike}
              className="rounded-lg w-full max-w-2xl mx-auto"
            />
          </div>

          <div className="mb-6">
            <h5 className="text-xl font-bold text-gray-800 mb-3">Why This Bike?</h5>
            <p className="text-gray-700 leading-relaxed">{recommendation.reason}</p>
          </div>

          <div className="mb-6">
            <h5 className="text-xl font-bold text-gray-800 mb-3">Key Features</h5>
            <ul className="space-y-2">
              {recommendation.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-bikotic-blue mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{scores.defy}</div>
              <div className="text-sm text-gray-600 mt-1">Defy Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{scores.tcr}</div>
              <div className="text-sm text-gray-600 mt-1">TCR Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{scores.propel}</div>
              <div className="text-sm text-gray-600 mt-1">Propel Score</div>
            </div>
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="w-full flex items-center justify-center gap-2 bg-bikotic-blue text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Take Quiz Again
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 my-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-bold text-gray-800">Which Giant Bike Is Right For You?</h3>
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-bikotic-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <h4 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h4>
        
        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-bikotic-blue hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Answer honestly based on your actual riding style and goals
      </div>
    </div>
  )
}
