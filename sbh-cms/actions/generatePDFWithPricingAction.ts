import { DocumentActionComponent } from 'sanity'
import { DownloadIcon } from '@sanity/icons'

export const GeneratePDFWithPricingAction: DocumentActionComponent = (props) => {
    const { id, type } = props

    // Link to id directly
    // const { id } = props

    return {
        label: 'Générer PDF (avec tarifs)',
        icon: DownloadIcon,
        onHandle: async () => {
            // Get the published document ID (remove 'drafts.' prefix if present)
            const villaId = id.replace(/^drafts\./, '')

            // Get current language (default to French)
            const language = 'fr'

            // Open loading toast
            props.onComplete()

            try {
                // Call the Next.js API to generate PDF WITH pricing
                const apiUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
                const response = await fetch(
                    `${apiUrl}/api/generate-pdf?villaId=${villaId}&lang=${language}&includePricing=true&t=${Date.now()}`
                )

                if (!response.ok) {
                    throw new Error('Failed to generate PDF')
                }

                // Get the PDF blob
                const blob = await response.blob()

                // Create a download link and trigger download
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `villa-${villaId}-brochure-avec-tarifs.pdf`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)

                // Show success message
                console.log('PDF avec tarifs généré avec succès')
            } catch (error) {
                console.error('Error generating PDF:', error)
                alert('Erreur lors de la génération du PDF. Vérifiez que le site est en cours d\'exécution.')
            }
        },
    }
}
