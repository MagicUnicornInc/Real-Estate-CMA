import React from 'react'
import { BeakerIcon, ChartBarIcon, ShieldCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function Features() {
  const features = [
    {
      name: 'AI-Powered Analysis',
      description: 'Advanced machine learning model for accurate property valuations',
      icon: CpuChipIcon
    },
    {
      name: 'Privacy First',
      description: 'All computations happen in your browser - your data stays with you',
      icon: ShieldCheckIcon
    },
    {
      name: 'Comprehensive Reports',
      description: 'Detailed analysis with charts and downloadable PDF reports',
      icon: ChartBarIcon
    },
    {
      name: 'Smart Comparables',
      description: 'Intelligent selection of comparable properties based on multiple factors',
      icon: BeakerIcon
    }
  ]

  return (
    <div className="py-12 bg-white/50 rounded-xl shadow-sm mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Capabilities</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powered by Magic Unicorn AI
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
