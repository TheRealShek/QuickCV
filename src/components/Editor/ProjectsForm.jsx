import React from 'react'
import { FolderGit2, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

const ProjectsForm = ({ projects, setProjects, customHeader }) => {
  const addProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: ''
    }])
  }

  const removeProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id))
  }

  const updateProject = (id, field, value) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ))
  }

  const moveProject = (index, direction) => {
    const newProjects = [...projects]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < projects.length) {
      [newProjects[index], newProjects[newIndex]] = [newProjects[newIndex], newProjects[index]]
      setProjects(newProjects)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {customHeader ? (
        customHeader('Projects', <FolderGit2 className="w-5 h-5 inline mr-2" />)
      ) : (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            <FolderGit2 className="w-5 h-5 inline mr-2" />
            Projects
          </h2>
        </div>
      )}
      
      <button
        onClick={addProject}
        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm mb-4"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>

      <div className="space-y-6">
        {projects.map((proj, index) => (
          <div key={proj.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Project #{index + 1}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveProject(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveProject(index, 'down')}
                  disabled={index === projects.length - 1}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  placeholder="Brief description of the project and your role..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB, AWS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={proj.startDate}
                    onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                    placeholder="Jan 2023"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={proj.endDate}
                    onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                    placeholder="Present"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No projects added yet. Click "Add Project" to get started.
          </p>
        )}
      </div>
    </div>
  )
}

export default ProjectsForm
