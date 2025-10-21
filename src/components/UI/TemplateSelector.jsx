import React from 'react'

const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'traditional', name: 'Traditional', description: 'Classic serif style' },
    { id: 'modern', name: 'Modern', description: 'Bold & contemporary' },
    { id: 'minimal', name: 'Minimal', description: 'Clean & simple' }
  ]

  return (
    <div className="flex gap-2">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            currentTemplate === template.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={template.description}
        >
          {template.name}
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector
