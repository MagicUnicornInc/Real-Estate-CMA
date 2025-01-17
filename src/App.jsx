import React, { useState } from 'react'
import PropertyForm from './components/PropertyForm'
import Analysis from './components/Analysis'
import ModelLoader from './components/ModelLoader'
import Features from './components/Features'
import ModelInteraction from './components/ModelInteraction'

export default function App() {
  const [propertyData, setPropertyData] = useState(null)
  const [modelLoaded, setModelLoaded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-medium mb-2">
              Magic Unicorn presents
            </p>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-gradient-x">
              Real Estate CMA
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              by Magic Unicorn Unconventional Technology & Stuff Inc.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ModelLoader onLoaded={() => setModelLoaded(true)} />
        
        {modelLoaded ? (
          <>
            <ModelInteraction />
            <PropertyForm onSubmit={setPropertyData} />
            {propertyData && <Analysis data={propertyData} />}
          </>
        ) : (
          <Features />
        )}
      </main>
    </div>
  )
}
