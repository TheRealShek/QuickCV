import React from 'react'

const ModernTemplate = ({ resumeData }) => {
  const { contact, summary, experience, education, skills, projects, sectionOrder = ['experience', 'education', 'skills', 'projects'], fontSize = 14 } = resumeData

  const renderSection = (sectionName) => {
    const headingSize = fontSize * 1.43
    const textSize = fontSize * 0.86
    const barHeight = fontSize * 0.43
    
    switch (sectionName) {
      case 'experience':
        return experience.length > 0 && (
          <div key="experience" className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center" style={{ fontSize: `${headingSize}px` }}>
              <span className="w-1 bg-blue-600 mr-3" style={{ height: `${barHeight}px` }}></span>
              EXPERIENCE
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-4 border-l-2 border-gray-300">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {exp.position}
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline" style={{ fontSize: `${textSize}px`, fontWeight: 'normal' }}>
                          🔗
                        </a>
                      )}
                    </h3>
                    <div className="text-gray-600" style={{ fontSize: `${textSize}px` }}>
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </div>
                  </div>
                  <span className="text-gray-500 whitespace-nowrap ml-4" style={{ fontSize: `${textSize}px` }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-gray-700 mt-2" style={{ fontSize: `${textSize}px` }}>
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
            <h2 className="font-bold text-gray-800 mb-3 flex items-center" style={{ fontSize: `${headingSize}px` }}>
              <span className="w-1 bg-blue-600 mr-3" style={{ height: `${barHeight}px` }}></span>
              EDUCATION
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-4 border-l-2 border-gray-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <div className="text-gray-600" style={{ fontSize: `${textSize}px` }}>
                      {edu.school}{edu.location && `, ${edu.location}`}
                      {edu.gpa && ` • CGPA: ${edu.gpa}`}
                    </div>
                    {edu.coursework && (
                      <div style={{ fontSize: `${textSize}px` }} className="mt-1 italic text-gray-600">
                        Relevant Coursework: {edu.coursework}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-500 whitespace-nowrap ml-4" style={{ fontSize: `${textSize}px` }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return projects.length > 0 && (
          <div key="projects" className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center" style={{ fontSize: `${headingSize}px` }}>
              <span className="w-1 bg-blue-600 mr-3" style={{ height: `${barHeight}px` }}></span>
              PROJECTS
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-4 border-l-2 border-gray-300">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline" style={{ fontSize: `${textSize}px`, fontWeight: 'normal' }}>
                        🔗
                      </a>
                    )}
                  </h3>
                  <span className="text-gray-500 whitespace-nowrap ml-4" style={{ fontSize: `${textSize}px` }}>
                    {proj.startDate} - {proj.endDate}
                  </span>
                </div>
                {proj.description && <p className="text-gray-700 mb-1" style={{ fontSize: `${textSize}px` }}>{proj.description}</p>}
                {proj.technologies && (
                  <p className="text-gray-600 mb-1" style={{ fontSize: `${textSize}px` }}>
                    <span className="font-semibold">Tech:</span> {proj.technologies}
                  </p>
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
            <h2 className="font-bold text-gray-800 mb-3 flex items-center" style={{ fontSize: `${headingSize}px` }}>
              <span className="w-1 bg-blue-600 mr-3" style={{ height: `${barHeight}px` }}></span>
              SKILLS
            </h2>
            <ul className="pl-4 text-gray-700 list-none" style={{ fontSize: `${textSize}px` }}>
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
    <div className="bg-white text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-8">
        <h1 className="font-bold mb-3" style={{ fontSize: `${fontSize * 2.86}px` }}>{contact.name || 'Your Name'}</h1>
        <div className="grid grid-cols-2 gap-2" style={{ fontSize: `${fontSize * 0.86}px` }}>
          <div>
            {contact.email && <div>✉ {contact.email}</div>}
            {contact.phone && <div>☎ {contact.phone}</div>}
            {contact.location && <div>📍 {contact.location}</div>}
          </div>
          <div>
            {contact.linkedin && <div>🔗 LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{contact.linkedin}</a></div>}
            {contact.github && <div>💻 GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{contact.github}</a></div>}
            {contact.portfolio && <div>🌐 Portfolio: <a href={contact.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{contact.portfolio}</a></div>}
            {contact.twitter && <div>🐦 Twitter: <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{contact.twitter}</a></div>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center" style={{ fontSize: `${fontSize * 1.43}px` }}>
              <span className="w-1 bg-blue-600 mr-3" style={{ height: `${fontSize * 0.43}px` }}></span>
              ABOUT ME
            </h2>
            <p className="leading-relaxed text-gray-700" style={{ fontSize: `${fontSize * 0.86}px` }}>{summary}</p>
          </div>
        )}

        {/* Dynamic Sections */}
        {sectionOrder.map(sectionName => renderSection(sectionName))}
      </div>
    </div>
  )
}

export default ModernTemplate
