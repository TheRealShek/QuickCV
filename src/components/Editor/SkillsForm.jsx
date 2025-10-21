import React from 'react'
import { Wrench, Plus, Trash2 } from 'lucide-react'

const SkillsForm = ({ skills, setSkills, customHeader }) => {
  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: '' }])
  }

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id))
  }

  const updateSkill = (id, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, name: value } : skill
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {customHeader ? (
        customHeader('Skills', <Wrench className="w-5 h-5 inline mr-2" />)
      ) : (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            <Wrench className="w-5 h-5 inline mr-2" />
            Skills
          </h2>
        </div>
      )}
      
      <button
        onClick={addSkill}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm mb-4"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>

      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex gap-2">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, e.target.value)}
              placeholder="e.g., JavaScript, React, Node.js, Python..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => removeSkill(skill.id)}
              className="p-2 text-red-500 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Add your technical skills, programming languages, frameworks, tools, and other relevant competencies.
      </p>
    </div>
  )
}

export default SkillsForm
