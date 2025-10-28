import React, { useState } from 'react'
import { Download } from 'lucide-react'

const PDFExport = ({ resumeData, template }) => {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      const resumeElement = document.querySelector('#resume-preview > div > div')
      
      if (!resumeElement) {
        alert('Resume preview not found')
        setIsExporting(false)
        return
      }

      const printWindow = window.open('', '_blank', 'width=800,height=600')
      
      if (!printWindow) {
        alert('Please allow popups to export PDF')
        setIsExporting(false)
        return
      }

      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n')
          } catch (e) {
            const linkTag = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
              .find(link => link.sheet === styleSheet)
            return linkTag ? `@import url("${linkTag.href}");` : ''
          }
        })
        .join('\n')

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Resume - ${resumeData.contact?.name || 'Draft'}</title>
            <style>
              ${styles}
              
              @page {
                size: letter;
                margin: 0;
              }
              
              body {
                margin: 0;
                padding: 0;
                width: 8.5in;
                min-height: 11in;
                background: white;
              }
              
              @media print {
                body {
                  width: 8.5in;
                  margin: 0;
                  padding: 0;
                }
                
                .mb-6, .mb-4, .mb-3 {
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            ${resumeElement.outerHTML}
          </body>
        </html>
      `)
      
      printWindow.document.close()
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      printWindow.focus()
      printWindow.print()
      
      setTimeout(() => {
        printWindow.close()
      }, 1000)
      
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert(`Failed to export PDF: ${error.message}`)
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
