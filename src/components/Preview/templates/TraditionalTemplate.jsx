import React from 'react'

const TraditionalTemplate = ({ resumeData }) => {
  const { contact, summary, experience, education, skills, projects, sectionOrder = ['experience', 'education', 'skills', 'projects'], fontSize = 14 } = resumeData

  const renderSection = (sectionName) => {
    const headingSize = fontSize * 1.14
    const textSize = fontSize * 0.86
    
    switch (sectionName) {
      case 'experience':
        return experience.length > 0 && (
          <div key="experience" className="mb-6">
            <h2 className="font-bold uppercase border-b border-gray-400 mb-3" style={{ fontSize: `${headingSize}px` }}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.position}</h3>
                  <span style={{ fontSize: `${textSize}px` }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="italic mb-1" style={{ fontSize: `${textSize}px` }}>
                  {exp.company}{exp.location && `, ${exp.location}`}
                </div>
                <ul className="list-disc ml-5 space-y-1" style={{ fontSize: `${textSize}px` }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      
      case 'education':
        return education.length > 0 && (
          <div key="education" className="mb-6">
            <h2 className="font-bold uppercase border-b border-gray-400 mb-3" style={{ fontSize: `${headingSize}px` }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <span style={{ fontSize: `${textSize}px` }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div style={{ fontSize: `${textSize}px` }}>
                  {edu.school}{edu.location && `, ${edu.location}`}
                  {edu.gpa && ` • CGPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return projects.length > 0 && (
          <div key="projects" className="mb-6">
            <h2 className="font-bold uppercase border-b border-gray-400 mb-3" style={{ fontSize: `${headingSize}px` }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{proj.name}</h3>
                  <span style={{ fontSize: `${textSize}px` }}>{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.description && <p className="mb-1" style={{ fontSize: `${textSize}px` }}>{proj.description}</p>}
                {proj.technologies && (
                  <p className="italic" style={{ fontSize: `${textSize}px` }}>Technologies: {proj.technologies}</p>
                )}
              </div>
            ))}
          </div>
        )
      
      case 'skills':
        return skills.length > 0 && (
          <div key="skills" className="mb-6">
            <h2 className="font-bold uppercase border-b border-gray-400 mb-2" style={{ fontSize: `${headingSize}px` }}>Skills</h2>
            <p style={{ fontSize: `${textSize}px` }}>
              {skills.map(s => s.name).filter(n => n.trim()).join(' • ')}
            </p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="bg-white p-8 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="font-bold mb-2" style={{ fontSize: `${fontSize * 1.71}px` }}>{contact.name || 'Your Name'}</h1>
        <div className="space-x-3" style={{ fontSize: `${fontSize * 0.86}px` }}>
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>•</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.location && <span>•</span>}
          {contact.location && <span>{contact.location}</span>}
        </div>
        <div className="space-x-3 mt-1" style={{ fontSize: `${fontSize * 0.86}px` }}>
          {contact.linkedin && <span>LinkedIn: {contact.linkedin}</span>}
          {contact.github && contact.linkedin && <span>•</span>}
          {contact.github && <span>GitHub: {contact.github}</span>}
          {contact.portfolio && (contact.linkedin || contact.github) && <span>•</span>}
          {contact.portfolio && <span>Portfolio: {contact.portfolio}</span>}
          {contact.twitter && (contact.linkedin || contact.github || contact.portfolio) && <span>•</span>}
          {contact.twitter && <span>Twitter: {contact.twitter}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="font-bold uppercase border-b border-gray-400 mb-2" style={{ fontSize: `${fontSize * 1.14}px` }}>Professional Summary</h2>
          <p className="leading-relaxed" style={{ fontSize: `${fontSize * 0.86}px` }}>{summary}</p>
        </div>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map(sectionName => renderSection(sectionName))}
    </div>
  )
}

export default TraditionalTemplate
