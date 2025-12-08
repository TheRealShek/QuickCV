import React from 'react'

const MinimalTemplate = ({ resumeData }) => {
  const { contact, summary, experience, education, skills, projects, sectionOrder = ['experience', 'education', 'skills', 'projects'], fontSize = 14 } = resumeData

  const renderSection = (sectionName) => {
    const headingSize = fontSize * 0.86
    const textSize = fontSize * 0.86
    const microSize = fontSize * 0.71
    
    switch (sectionName) {
      case 'experience':
        return experience.length > 0 && (
          <div key="experience" className="mb-6">
            <h2 className="font-semibold uppercase tracking-wider mb-3 text-gray-800" style={{ fontSize: `${headingSize}px` }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {exp.position}
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline" style={{ fontSize: `${microSize}px`, fontWeight: 'normal' }}>
                          🔗
                        </a>
                      )}
                    </span>
                    <span className="text-gray-600"> • {exp.company}</span>
                    {exp.location && <span className="text-gray-500" style={{ fontSize: `${textSize}px` }}> • {exp.location}</span>}
                  </div>
                  <span className="text-gray-500" style={{ fontSize: `${microSize}px` }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="space-y-1 text-gray-700" style={{ fontSize: `${textSize}px` }}>
                  {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                    <li key={idx} className="ml-0">– {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      
      case 'education':
        return education.length > 0 && (
          <div key="education" className="mb-6">
            <h2 className="font-semibold uppercase tracking-wider mb-3 text-gray-800" style={{ fontSize: `${headingSize}px` }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-gray-900">{edu.degree}</span>
                    {edu.field && <span className="text-gray-600"> in {edu.field}</span>}
                    <span className="text-gray-600"> • {edu.school}</span>
                    {edu.location && <span className="text-gray-500" style={{ fontSize: `${textSize}px` }}> • {edu.location}</span>}
                    {edu.gpa && <span className="text-gray-500" style={{ fontSize: `${textSize}px` }}> • CGPA: {edu.gpa}</span>}
                  </div>
                  <span className="text-gray-500" style={{ fontSize: `${microSize}px` }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.coursework && (
                  <div style={{ fontSize: `${textSize}px` }} className="text-gray-600 italic mt-1">
                    Relevant Coursework: {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return projects.length > 0 && (
          <div key="projects" className="mb-6">
            <h2 className="font-semibold uppercase tracking-wider mb-3 text-gray-800" style={{ fontSize: `${headingSize}px` }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-gray-900">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline" style={{ fontSize: `${microSize}px`, fontWeight: 'normal' }}>
                        🔗
                      </a>
                    )}
                  </span>
                  <span className="text-gray-500" style={{ fontSize: `${microSize}px` }}>{proj.startDate} - {proj.endDate}</span>
                </div>
                {proj.description && <p className="text-gray-700 mb-1" style={{ fontSize: `${textSize}px` }}>{proj.description}</p>}
                {proj.technologies && (
                  <p className="text-gray-600 mb-1" style={{ fontSize: `${microSize}px` }}>{proj.technologies}</p>
                )}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 text-gray-700">
                    {proj.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: `${textSize}px` }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )
      
      case 'skills':
        return skills.length > 0 && (
          <div key="skills" className="mb-6">
            <h2 className="font-semibold uppercase tracking-wider mb-2 text-gray-800" style={{ fontSize: `${headingSize}px` }}>Skills</h2>
            <ul className="text-gray-700 list-none" style={{ fontSize: `${textSize}px` }}>
              {skills.filter(s => s.name.trim()).map((skill, idx) => (
                <li key={idx} className="mb-1">• {skill.name}</li>
              ))}
            </ul>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="bg-white p-8 text-gray-900" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-light mb-2" style={{ fontSize: `${fontSize * 2.86}px` }}>{contact.name || 'Your Name'}</h1>
        <div className="text-gray-600 space-x-2" style={{ fontSize: `${fontSize * 0.71}px` }}>
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && contact.email && <span>|</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {contact.location && (contact.email || contact.phone) && <span>|</span>}
          {contact.location && <span>{contact.location}</span>}
        </div>
        {(contact.linkedin || contact.github || contact.portfolio || contact.twitter) && (
          <div className="text-gray-600 space-x-2 mt-1" style={{ fontSize: `${fontSize * 0.71}px` }}>
            {contact.linkedin && <span>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contact.linkedin}</a></span>}
            {contact.github && contact.linkedin && <span>|</span>}
            {contact.github && <span>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contact.github}</a></span>}
            {contact.portfolio && (contact.linkedin || contact.github) && <span>|</span>}
            {contact.portfolio && <span>Portfolio: <a href={contact.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contact.portfolio}</a></span>}
            {contact.twitter && (contact.linkedin || contact.github || contact.portfolio) && <span>|</span>}
            {contact.twitter && <span>Twitter: <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contact.twitter}</a></span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="font-semibold uppercase tracking-wider mb-2 text-gray-800" style={{ fontSize: `${fontSize * 0.86}px` }}>Summary</h2>
          <p className="leading-relaxed text-gray-700" style={{ fontSize: `${fontSize * 0.86}px` }}>{summary}</p>
        </div>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map(sectionName => renderSection(sectionName))}
    </div>
  )
}

export default MinimalTemplate
