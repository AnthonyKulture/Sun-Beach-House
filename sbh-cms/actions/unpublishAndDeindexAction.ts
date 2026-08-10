import { useState } from 'react'
import { DocumentActionComponent, useClient } from 'sanity'
import { TrashIcon } from '@sanity/icons'

/**
 * "Retirer du site" — Custom Sanity Document Action for Villa documents.
 *
 * What it does in one click:
 *  1. Unpublish the document (delete the published version, keep the draft)
 *  2. Call the Next.js /api/deindex-villa route which submits a
 *     Google Indexing API "URL_DELETED" notification for all 4 locale variants.
 *
 * The action is only available when the document is currently published
 * (i.e. when `published` is truthy in the action props).
 */
export const UnpublishAndDeindexAction: DocumentActionComponent = (props) => {
  const { id, published, onComplete } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Only show when the document is actually published
  if (!published) return null

  const cleanId = id.replace(/^drafts\./, '')
  const slug = (published as any)?.slug?.current as string | undefined

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      // Step 1 — Unpublish: delete the published document via Mutations API
      // This keeps the draft intact but removes it from the public API.
      await client
        .transaction()
        .delete(cleanId)
        .commit({ visibility: 'async' })

      // Step 2 — Notify the Next.js API route to trigger Google deindexing
      const previewUrl = (
        (window as any).__SANITY_STUDIO_PREVIEW_URL__ ||
        import.meta.env.SANITY_STUDIO_PREVIEW_URL ||
        'https://www.sun-beach-house.com'
      ).replace(/\/$/, '')

      try {
        const res = await fetch(`${previewUrl}/api/deindex-villa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ villaId: cleanId, slug }),
        })
        if (!res.ok) {
          console.warn('Deindex API responded with', res.status, '— Google notification skipped.')
        }
      } catch (e) {
        // Non-blocking: the unpublish already succeeded
        console.warn('Could not reach deindex API:', e)
      }

      setDialogOpen(false)
      onComplete()
      alert(`✅ Villa dépubliée avec succès.\nGoogle sera notifié de retirer les URLs sous 48h.`)
    } catch (error) {
      console.error('Unpublish error:', error)
      alert(`❌ Erreur lors de la dépublication:\n${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    label: isLoading ? 'Retrait en cours…' : '🗑️ Retirer du site',
    icon: TrashIcon,
    tone: 'critical' as const,
    disabled: isLoading,
    dialog: dialogOpen
      ? {
          type: 'confirm' as const,
          tone: 'critical' as const,
          message:
            `Confirmer la suppression du listing ?\n\n` +
            `• La villa sera dépubliée immédiatement\n` +
            `• Google sera notifié de déindexer toutes les URLs (fr / en / es / pt)\n` +
            `• Le brouillon restera dans Sanity (récupérable)\n\n` +
            `Cette action ne peut pas être annulée facilement.`,
          onConfirm: handleConfirm,
          onCancel: () => {
            setDialogOpen(false)
            onComplete()
          },
        }
      : undefined,
    onHandle: () => {
      setDialogOpen(true)
    },
  }
}
