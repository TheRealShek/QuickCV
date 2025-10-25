import { useState } from 'react'
import ContactForm from './components/Editor/ContactForm'
import SummaryForm from './components/Editor/SummaryForm'
import ExperienceForm from './components/Editor/ExperienceForm'
import EducationForm from './components/Editor/EducationForm'
import SkillsForm from './components/Editor/SkillsForm'
import ProjectsForm from './components/Editor/ProjectsForm'
import ResumePreview from './components/Preview/ResumePreview'
import TemplateSelector from './components/UI/TemplateSelector'
import PDFExport from './components/PDFExport'
import SaveLoadResume from './components/SaveLoadResume'
import { FileText, ChevronUp, ChevronDown } from 'lucide-react'

function App() {
  const [template, setTemplate] = useState('traditional')
  const [fontSize, setFontSize] = useState(14)
  const [boldText, setBoldText] = useState(false)
  
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    twitter: ''
  })

  const [summary, setSummary] = useState('')

  const [experience, setExperience] = useState([])

  const [education, setEducation] = useState([])

  const [skills, setSkills] = useState([])

  const [projects, setProjects] = useState([])

  // Section order state
  const [sectionOrder, setSectionOrder] = useState([
    'experience',
    'education',
    'skills',
    'projects'
  ])

  const moveSectionUp = (sectionName) => {
    const index = sectionOrder.indexOf(sectionName)
    if (index > 0) {
      const newOrder = [...sectionOrder]
      ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      setSectionOrder(newOrder)
    }
  }

  const moveSectionDown = (sectionName) => {
    const index = sectionOrder.indexOf(sectionName)
    if (index < sectionOrder.length - 1) {
      const newOrder = [...sectionOrder]
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      setSectionOrder(newOrder)
    }
  }

  const getSectionComponent = (sectionName) => {
    const sectionIndex = sectionOrder.indexOf(sectionName)
    const canMoveUp = sectionIndex > 0
    const canMoveDown = sectionIndex < sectionOrder.length - 1

    const sectionHeader = (title, icon) => (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {icon}
          {title}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => moveSectionUp(sectionName)}
            disabled={!canMoveUp}
            className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
            title="Move section up"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveSectionDown(sectionName)}
            disabled={!canMoveDown}
            className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 rounded"
            title="Move section down"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    )

    switch (sectionName) {
      case 'experience':
        return (
          <ExperienceForm 
            key="experience"
            experience={experience} 
            setExperience={setExperience}
            customHeader={sectionHeader}
          />
        )
      case 'education':
        return (
          <EducationForm 
            key="education"
            education={education} 
            setEducation={setEducation}
            customHeader={sectionHeader}
          />
        )
      case 'skills':
        return (
          <SkillsForm 
            key="skills"
            skills={skills} 
            setSkills={setSkills}
            customHeader={sectionHeader}
          />
        )
      case 'projects':
        return (
          <ProjectsForm 
            key="projects"
            projects={projects} 
            setProjects={setProjects}
            customHeader={sectionHeader}
          />
        )
      default:
        return null
    }
  }

  const resumeData = {
    contact,
    summary,
    experience,
    education,
    skills,
    projects,
    sectionOrder,
    fontSize,
    boldText,
    template
  }

  const handleLoadResume = (loadedData) => {
    // Update all state with loaded data
    setTemplate(loadedData.template)
    setFontSize(loadedData.fontSize)
    setBoldText(loadedData.boldText || false)
    setContact(loadedData.contact)
    setSummary(loadedData.summary)
    setExperience(loadedData.experience)
    setEducation(loadedData.education)
    setSkills(loadedData.skills)
    setProjects(loadedData.projects)
    setSectionOrder(loadedData.sectionOrder)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resumake</h1>
            </div>
            <div className="flex items-center gap-4">
              <TemplateSelector 
                currentTemplate={template} 
                onTemplateChange={setTemplate} 
              />
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                <label htmlFor="fontSize" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Font size:
                </label>
                <input
                  id="fontSize"
                  type="number"
                  min="8"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-600">px</span>
              </div>
              <button
                onClick={() => setBoldText(!boldText)}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                  boldText 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={boldText ? "Disable bold text" : "Enable bold text"}
              >
                B
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <SaveLoadResume 
                resumeData={resumeData} 
                onLoadResume={handleLoadResume}
              />
              <PDFExport resumeData={resumeData} template={template} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Editor */}
          <div className="space-y-6">
            <ContactForm contact={contact} setContact={setContact} />
            <SummaryForm summary={summary} setSummary={setSummary} />
            {sectionOrder.map(sectionName => getSectionComponent(sectionName))}
          </div>

          {/* Right Side - Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <ResumePreview 
              resumeData={resumeData} 
              template={template} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
