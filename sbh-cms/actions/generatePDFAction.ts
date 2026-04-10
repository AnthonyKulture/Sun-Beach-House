import { DocumentActionComponent } from 'sanity'
import { DownloadIcon } from '@sanity/icons'
import { downloadPdfBlob } from './shared'

export const GeneratePDFAction: DocumentActionComponent = (props) => {
    const { id } = props

    return {
        label: 'Générer PDF (sans tarifs)',
        icon: DownloadIcon,
        onHandle: async () => {
            const villaId = id.replace(/^drafts\./, '')
            props.onComplete()

            try {
                const apiUrl = (process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000').replace(/\/$/, '')
                const url = `${apiUrl}/api/generate-pdf?villaId=${villaId}&lang=en&includePricing=false&t=${Date.now()}`
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} — ${response.statusText}`)
                }

                downloadPdfBlob(await response.blob(), `villa-${villaId}-brochure-sans-tarifs.pdf`)
            } catch (error) {
                console.error('Error generating PDF:', error)
                alert(`Erreur lors de la génération du PDF.\n\nDétail: ${error instanceof Error ? error.message : String(error)}`)
            }
        },
    }
}
