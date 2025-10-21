import React from 'react'
import { Briefcase, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

const ExperienceForm = ({ experience, setExperience, customHeader }) => {
  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    }])
  }

  const removeExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id))
  }

  const updateExperience = (id, field, value) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const addBullet = (id) => {
    setExperience(experience.map(exp =>
      exp.id === id ? { ...exp, bullets: [...exp.bullets, ''] } : exp
    ))
  }

  const removeBullet = (id, index) => {
    setExperience(experience.map(exp =>
      exp.id === id ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) } : exp
    ))
  }

  const updateBullet = (id, index, value) => {
    setExperience(experience.map(exp =>
      exp.id === id ? { 
        ...exp, 
        bullets: exp.bullets.map((bullet, i) => i === index ? value : bullet)
      } : exp
    ))
  }

  const moveExperience = (index, direction) => {
    const newExperience = [...experience]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < experience.length) {
      [newExperience[index], newExperience[newIndex]] = [newExperience[newIndex], newExperience[index]]
      setExperience(newExperience)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {customHeader ? (
        customHeader('Work Experience', <Briefcase className="w-5 h-5 inline mr-2" />)
      ) : (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            <Briefcase className="w-5 h-5 inline mr-2" />
            Work Experience
          </h2>
        </div>
      )}
      
      <button
        onClick={addExperience}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm mb-4"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Experience #{index + 1}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveExperience(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveExperience(index, 'down')}
                  disabled={index === experience.length - 1}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Job Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Jan 2020"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="Present"
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => {
                    updateExperience(exp.id, 'current', e.target.checked)
                    if (e.target.checked) {
                      updateExperience(exp.id, 'endDate', 'Present')
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities & Achievements</label>
                <div className="space-y-2">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex gap-2">
                      <span className="text-gray-400 mt-2">•</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                        placeholder="Describe your achievement or responsibility..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {exp.bullets.length > 1 && (
                        <button
                          onClick={() => removeBullet(exp.id, bulletIndex)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addBullet(exp.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add bullet point
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        )}
      </div>
    </div>
  )
}

export default ExperienceForm
