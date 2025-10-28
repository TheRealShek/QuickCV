import React, { useRef } from 'react'
import { Download, Upload } from 'lucide-react'

const SaveLoadResume = ({ resumeData, onLoadResume }) => {
  const fileInputRef = useRef(null)

  const handleSaveResume = () => {
    // Create clean JSON structure
    const jsonData = {
      metadata: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        appName: 'QuickCV'
      },
      settings: {
        template: resumeData.template || 'traditional',
        fontSize: resumeData.fontSize || 14,
        boldText: resumeData.boldText || false
      },
      contact: {
        name: resumeData.contact.name || '',
        email: resumeData.contact.email || '',
        phone: resumeData.contact.phone || '',
        location: resumeData.contact.location || '',
        linkedin: resumeData.contact.linkedin || '',
        github: resumeData.contact.github || '',
        portfolio: resumeData.contact.portfolio || '',
        twitter: resumeData.contact.twitter || ''
      },
      summary: resumeData.summary || '',
      experience: resumeData.experience.map(exp => ({
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate,
        current: exp.current || false,
        link: exp.link || '',
        bullets: exp.bullets.filter(b => b.trim())
      })),
      education: resumeData.education.map(edu => {
        const eduData = {
          school: edu.school,
          degree: edu.degree,
          field: edu.field,
          location: edu.location,
          startDate: edu.startDate,
          endDate: edu.endDate,
          gpa: edu.gpa || '',
          coursework: edu.coursework || ''
        };
        // Preserve any additional fields that might exist
        if (edu.link) eduData.link = edu.link;
        if (edu.description) eduData.description = edu.description;
        if (edu.achievements) eduData.achievements = edu.achievements;
        return eduData;
      }),
      skills: resumeData.skills.map(skill => skill.name).filter(s => s.trim()),
      projects: resumeData.projects.map(proj => ({
        name: proj.name,
        description: proj.description,
        technologies: proj.technologies,
        link: proj.link || '',
        startDate: proj.startDate,
        endDate: proj.endDate,
        bullets: proj.bullets ? proj.bullets.filter(b => b.trim()) : []
      })),
      sectionOrder: resumeData.sectionOrder || ['experience', 'education', 'skills', 'projects']
    }

    // Create blob and download
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Generate filename with name and date
    const fileName = resumeData.contact.name 
      ? `resume-${resumeData.contact.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`
      : `resume-data-${Date.now()}.json`
    
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleLoadResume = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result)
        
        // Validate basic structure
        if (!jsonData.contact || !jsonData.settings) {
          alert('Invalid resume file format')
          return
        }

        // Transform data back to application format
        const loadedData = {
          template: jsonData.settings.template || 'traditional',
          fontSize: jsonData.settings.fontSize || 14,
          boldText: jsonData.settings.boldText || false,
          contact: {
            name: jsonData.contact.name || '',
            email: jsonData.contact.email || '',
            phone: jsonData.contact.phone || '',
            location: jsonData.contact.location || '',
            linkedin: jsonData.contact.linkedin || '',
            github: jsonData.contact.github || '',
            portfolio: jsonData.contact.portfolio || '',
            twitter: jsonData.contact.twitter || ''
          },
          summary: jsonData.summary || '',
          experience: (jsonData.experience || []).map((exp, idx) => ({
            id: Date.now() + idx,
            company: exp.company || '',
            position: exp.position || '',
            location: exp.location || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            current: exp.current || false,
            link: exp.link || '',
            bullets: exp.bullets || ['']
          })),
          education: (jsonData.education || []).map((edu, idx) => {
            const eduData = {
              id: Date.now() + idx + 1000,
              school: edu.school || '',
              degree: edu.degree || '',
              field: edu.field || '',
              location: edu.location || '',
              startDate: edu.startDate || '',
              endDate: edu.endDate || '',
              gpa: edu.gpa || edu.cgpa || '',
              coursework: edu.coursework || ''
            };
            // Preserve any additional fields from JSON
            if (edu.link) eduData.link = edu.link;
            if (edu.description) eduData.description = edu.description;
            if (edu.achievements) eduData.achievements = edu.achievements;
            return eduData;
          }),
          skills: (jsonData.skills || []).map((skillName, idx) => ({
            id: Date.now() + idx + 2000,
            name: skillName
          })),
          projects: (jsonData.projects || []).map((proj, idx) => ({
            id: Date.now() + idx + 3000,
            name: proj.name || '',
            description: proj.description || '',
            technologies: proj.technologies || '',
            link: proj.link || '',
            startDate: proj.startDate || '',
            endDate: proj.endDate || '',
            bullets: proj.bullets || ['']
          })),
          sectionOrder: jsonData.sectionOrder || ['experience', 'education', 'skills', 'projects']
        }

        onLoadResume(loadedData)
        
        // Reset file input
        event.target.value = ''
      } catch (error) {
        console.error('Error loading resume:', error)
        alert('Error loading resume file. Please check the file format.')
      }
    }

    reader.readAsText(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSaveResume}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        title="Save resume as JSON"
      >
        <Download className="w-4 h-4" />
        Save Resume
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleLoadResume}
        className="hidden"
      />
      
      <button
        onClick={triggerFileInput}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
        title="Load resume from JSON"
      >
        <Upload className="w-4 h-4" />
        Load Resume
      </button>
    </div>
  )
}

export default SaveLoadResume
