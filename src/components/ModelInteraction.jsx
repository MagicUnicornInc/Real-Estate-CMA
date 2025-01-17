import React, { useState } from 'react'
import { performCMAAnalysis, generateCMAReport } from '../services/cmaService'

export default function ModelInteraction({ onAnalysisComplete }) {
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)

  const startAnalysis = async (propertyData) => {
    try {
      setStatus('Starting CMA analysis...')
      
      // Perform the CMA analysis using browser-user
      const analysisData = await performCMAAnalysis(propertyData)
      
      // Generate the CMA report
      const report = await generateCMAReport(analysisData)
      
      onAnalysisComplete(report)
      setStatus('Analysis complete')
    } catch (error) {
      setError(error.message)
      setStatus('Analysis failed')
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">CMA Analysis Status</h2>
      
      {status && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">{status}</p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
