import React, { useState, useEffect } from "react"
import { calculatePartialCTR } from "../utils/utils"

const CTRDisplay: React.FC = () => {
  const [ctrDisplay, setCtrDisplay] = useState<{
    [variation: string]: number
  } | null>(null)

  const fetchCTR = () => {
    const result: { [variation: string]: number } = {}
    const timeWindow = 60 * 60 * 1000

    for (const variation of ["A", "B"]) {
      result[variation] = calculatePartialCTR(variation, timeWindow)
    }

    setCtrDisplay(result)
  }

  useEffect(() => {
    fetchCTR()
  }, [])

  return (
    <div className="container mx-auto p-4 border border-gray-200 rounded-md shadow-sm">
      <h2 className="text-center text-xl font-bold mb-4">
        Session CTR (last hour)
      </h2>
      {ctrDisplay ? (
        <ul className="list-disc list-inside">
          {Object.entries(ctrDisplay).map(([variation, ctr]) => (
            <li key={variation} className="mb-2">
              Variation {variation}: {ctr.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Calculating CTR...</p>
      )}
      <div className="flex flex-row justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
          onClick={fetchCTR}
        >
          Refresh
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
          onClick={() => localStorage.removeItem("ABTestMetrics")}
        >
          Reset Data
        </button>
      </div>
    </div>
  )
}

export default CTRDisplay
