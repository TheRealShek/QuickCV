import React from 'react'
import TraditionalTemplate from './templates/TraditionalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'

const ResumePreview = ({ resumeData, template }) => {
  const { fontSize = 14, boldText = false } = resumeData

  const getTemplate = () => {
    switch (template) {
      case 'traditional':
        return <TraditionalTemplate resumeData={resumeData} />
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />
      default:
        return <TraditionalTemplate resumeData={resumeData} />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Preview</h3>
      </div>
      <div 
        id="resume-preview" 
        className="overflow-auto"
        style={{ 
          height: 'calc(100vh - 200px)',
          minHeight: '800px'
        }}
      >
        <div 
          className="bg-white"
          style={{
            width: '8.5in',
            minHeight: '11in',
            margin: '0 auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            fontSize: `${fontSize}px`,
            fontWeight: boldText ? 'bold' : 'normal'
          }}
        >
          {getTemplate()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview
