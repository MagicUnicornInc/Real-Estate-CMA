import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { jsPDF } from 'jspdf'

export default function Analysis({ data }) {
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    // Simulate analysis calculation
    const calculateAnalysis = () => {
      return {
        pricePerSqFt: 250,
        recommendedPrice: 500000,
        comparables: [
          { price: 480000, sqft: 2000 },
          { price: 520000, sqft: 2100 },
          { price: 495000, sqft: 1950 }
        ]
      }
    }

    setAnalysis(calculateAnalysis())
  }, [data])

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text('CMA Report', 20, 20)
    doc.text(`Property: ${data.address}`, 20, 30)
    doc.text(`Recommended Price: $${analysis.recommendedPrice}`, 20, 40)
    doc.save('cma-report.pdf')
  }

  if (!analysis) return null

  const chartData = {
    labels: analysis.comparables.map((_, i) => `Comp ${i + 1}`),
    datasets: [{
      label: 'Price per Sq Ft',
      data: analysis.comparables.map(comp => comp.price / comp.sqft),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  return (
    <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium">Key Metrics</h3>
          <dl className="mt-2 grid grid-cols-1 gap-4">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price per Sq Ft</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                ${analysis.pricePerSqFt}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Recommended Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                ${analysis.recommendedPrice.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Price Comparison</h3>
          <Line data={chartData} />
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Download PDF Report
      </button>
    </div>
  )
}
