import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'i6dkdu7j',
    dataset: 'production'
  },
  deployment: {
    appId: 'p8nz95i9dbra1f51ce53lttf',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
