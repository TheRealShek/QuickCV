import React from 'react'
import { FileText } from 'lucide-react'

const SummaryForm = ({ summary, setSummary }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        <FileText className="w-5 h-5 inline mr-2" />
        Professional Summary
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="A brief overview of your professional background, key skills, and career objectives..."
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          2-3 sentences highlighting your expertise and value proposition
        </p>
      </div>
    </div>
  )
}

export default SummaryForm
