import { createClient } from '@sanity/client'
require('dotenv').config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-03-01',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
})

const cleanupPDFOptions = async () => {
    try {
        console.log('Fetching villas with pdfOptions...')
        // Find all villas that have the pdfOptions field
        const query = `*[_type == "villa" && defined(pdfOptions)]`
        const villas = await client.fetch(query)

        if (villas.length === 0) {
            console.log('No villas found with pdfOptions field. Nothing to clean up.')
            return
        }

        console.log(`Found ${villas.length} villas to clean up.`)

        // Create a transaction to unset the field
        const transaction = client.transaction()

        villas.forEach((villa: any) => {
            console.log(`Unsetting pdfOptions for villa: ${villa.name} (${villa._id})`)
            transaction.patch(villa._id, (p: any) => p.unset(['pdfOptions']))
        })

        // Commit the transaction
        console.log('Committing transaction...')
        const result = await transaction.commit()
        console.log('Cleanup completed successfully!', result)

    } catch (error) {
        console.error('Error during cleanup:', error)
    }
}

cleanupPDFOptions()
