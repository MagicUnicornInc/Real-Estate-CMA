import React, { useState } from 'react'
import * as ort from 'onnxruntime-web'

export default function ModelLoader({ onLoaded }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadModel = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Initialize ONNX Runtime Web
      const session = await ort.InferenceSession.create('/model/model.onnx', {
        executionProviders: ['wasm']
      })
      
      window.ortSession = session
      onLoaded()
    } catch (error) {
      console.error('Error loading model:', error)
      setError('Failed to load model. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mb-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">CMA Model Initialization</h2>
        {!loading && !error && (
          <>
            <p className="text-gray-600 mb-4">
              Click below to load the CMA analysis model. This may take a minute on first load, 
              but will be faster on subsequent visits due to caching.
            </p>
            <button
              onClick={loadModel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load Analysis Model
            </button>
          </>
        )}
        
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading model... This may take a minute...</p>
          </div>
        )}
        
        {error && (
          <div className="text-red-500 mb-4">
            {error}
            <button
              onClick={loadModel}
              className="block mx-auto mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry Loading
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
