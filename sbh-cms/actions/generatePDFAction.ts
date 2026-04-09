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
                const apiUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://sun-beach-house.com'
                const response = await fetch(
                    `${apiUrl}/api/generate-pdf?villaId=${villaId}&lang=en&includePricing=false&t=${Date.now()}`
                )

                if (!response.ok) {
                    throw new Error('Failed to generate PDF')
                }

                downloadPdfBlob(await response.blob(), `villa-${villaId}-brochure-sans-tarifs.pdf`)
            } catch (error) {
                console.error('Error generating PDF:', error)
                alert("Erreur lors de la génération du PDF. Vérifiez que le site est en cours d'exécution.")
            }
        },
    }
}
