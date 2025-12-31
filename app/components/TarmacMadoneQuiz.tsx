'use client'

import React, { useState } from 'react'
import { ChevronRight, RotateCcw } from 'lucide-react'

interface QuizQuestion {
  id: number
  question: string
  options: {
    text: string
    scores: { tarmac: number; madone: number }
  }[]
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your main priority in a race bike?",
    options: [
      { text: "Absolute minimum weight - every gram counts", scores: { tarmac: 3, madone: 1 } },
      { text: "Balanced performance across all terrain", scores: { tarmac: 1, madone: 3 } },
      { text: "Maximum aerodynamic efficiency", scores: { tarmac: 2, madone: 2 } },
      { text: "Comfort over long race distances", scores: { tarmac: 1, madone: 3 } }
    ]
  },
  {
    id: 2,
    question: "What type of racing do you do most?",
    options: [
      { text: "Hilly road races and mountain stages", scores: { tarmac: 3, madone: 1 } },
      { text: "Mix of everything - crits, road races, time trials", scores: { tarmac: 1, madone: 3 } },
      { text: "Flat and rolling criteriums", scores: { tarmac: 2, madone: 2 } },
      { text: "Long endurance races and sportives", scores: { tarmac: 1, madone: 3 } }
    ]
  },
  {
    id: 3,
    question: "How important is a power meter to you?",
    options: [
      { text: "Essential - I need one and want it included", scores: { tarmac: 3, madone: 0 } },
      { text: "Nice to have but I already own one", scores: { tarmac: 1, madone: 3 } },
      { text: "Don't care - I'll add one later if needed", scores: { tarmac: 1, madone: 2 } },
      { text: "I prefer to choose my own power meter", scores: { tarmac: 0, madone: 3 } }
    ]
  },
  {
    id: 4,
    question: "What matters more to you?",
    options: [
      { text: "Having the lightest possible frame", scores: { tarmac: 3, madone: 1 } },
      { text: "Proven comfort technology like IsoFlow", scores: { tarmac: 0, madone: 3 } },
      { text: "Wind tunnel-tested aerodynamics", scores: { tarmac: 3, madone: 1 } },
      { text: "One bike that does everything well", scores: { tarmac: 1, madone: 3 } }
    ]
  },
  {
    id: 5,
    question: "Which approach appeals to you more?",
    options: [
      { text: "Specialized's engineering white papers and data", scores: { tarmac: 3, madone: 1 } },
      { text: "Trek's 'merge the best bikes' philosophy", scores: { tarmac: 1, madone: 3 } },
      { text: "Whichever is actually faster on race day", scores: { tarmac: 2, madone: 2 } },
      { text: "The one that feels better to ride", scores: { tarmac: 1, madone: 2 } }
    ]
  }
]

export default function TarmacMadoneQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ tarmac: 0, madone: 0 })
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const handleAnswer = (optionIndex: number) => {
    const option = questions[currentQuestion].options[optionIndex]
    
    setScores(prev => ({
      tarmac: prev.tarmac + option.scores.tarmac,
      madone: prev.madone + option.scores.madone
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
    setScores({ tarmac: 0, madone: 0 })
    setShowResults(false)
    setSelectedAnswers([])
  }

  const getRecommendation = () => {
    const maxScore = Math.max(scores.tarmac, scores.madone)
    
    if (scores.tarmac === maxScore) {
      return {
        bike: 'Specialized Tarmac SL8 Pro',
        price: '£7,249',
        color: '#EF4444',
        image: '/images/specialized-tarmac-sl8-pro-2025.jpg',
        reason: 'You want the lightest possible aero race bike with data to back it up. The Tarmac SL8\'s 685g frame is genuinely impressive, and Specialized\'s wind tunnel claims show it\'s more aero than the old Venge. You get the 4iiii power meter included (£500-600 value), Roval Rapide wheels with asymmetric depths (51mm front, 48.5mm rear), and 33% better stiffness-to-weight than the SL7. If climbing performance matters and you trust Specialized\'s engineering approach, this is your bike.',
        keyFeatures: [
          '685g frame - lightest production race frame',
          'More aero than Venge, 16.6s faster over 40km vs SL7',
          'Includes 4iiii Precision 3+ power meter',
          'Roval Rapide CL III wheels (51mm/48.5mm)',
          '33% better stiffness-to-weight vs SL7',
          '6% more compliant in the saddle',
          'Complete bike: 7.25kg (size 56)'
        ]
      }
    } else {
      return {
        bike: 'Trek Madone SLR 7 Gen 8',
        price: '£7,250',
        color: '#3B82F6',
        image: '/images/trek-madone-slr-7-gen8-2025.jpg',
        reason: 'You want Trek\'s proven all-round race bike with IsoFlow comfort technology. The Madone Gen 8 merged the best of the old Madone aero and Emonda lightweight bikes into one. The 900 Series OCLV carbon is 20% stronger than the old 800 Series, and that IsoFlow seat tube cutout provides real compliance without sacrificing stiffness. It\'s Trek\'s lightest Madone Disc frameset ever and as light as the old Emonda. No power meter included, but if you want Trek\'s refined approach and believe in their engineering, this is it.',
        keyFeatures: [
          '900 Series OCLV Carbon - 20% stronger',
          'IsoFlow technology - 80% more compliant',
          'Revolutionary Full System Foil aero shaping',
          'Bontrager Aeolus Pro 51 wheels (51mm all round)',
          'Lightest Madone Disc frameset ever',
          'Complete bike: 7.52kg (ML size)',
          'Beats old Madone Gen 7 AND Emonda on any gradient'
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

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{scores.tarmac}</div>
              <div className="text-sm text-gray-600 mt-1">Tarmac Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{scores.madone}</div>
              <div className="text-sm text-gray-600 mt-1">Madone Score</div>
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
          <h3 className="text-2xl font-bold text-gray-800">Which Bike Is Right For You?</h3>
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
        Answer honestly based on your actual riding priorities
      </div>
    </div>
  )
}
