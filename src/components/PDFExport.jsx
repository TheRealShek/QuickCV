import React, { useState } from 'react'
import { Download } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const PDFExport = ({ resumeData, template }) => {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      const element = document.getElementById('resume-preview')
      
      if (!element) {
        alert('Resume preview not found')
        setIsExporting(false)
        return
      }

      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true)
      
      // Get the actual resume content (the inner div with width 8.5in)
      const resumeContent = clonedElement.querySelector('div[style*="8.5in"]')
      
      if (!resumeContent) {
        alert('Resume content not found')
        setIsExporting(false)
        return
      }

      const opt = {
        margin: 0,
        filename: `resume-${resumeData.contact.name || 'draft'}-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait'
        }
      }

      await html2pdf().set(opt).from(resumeContent).save()
      
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <Download className="w-4 h-4" />
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </button>
  )
}

export default PDFExport
