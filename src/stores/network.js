import { defineStore } from 'pinia'
import { Network } from '@capacitor/network'

export const useNetworkStore = defineStore('network', {
  state: () => ({
    isConnected: true,
    connectionType: 'wifi'
  }),
  actions: {
    async initialize() {
      // Get initial status
      const status = await Network.getStatus()
      this.isConnected = status.connected
      this.connectionType = status.connectionType

      // Listen for changes
      Network.addListener('networkStatusChange', (status) => {
        this.isConnected = status.connected
        this.connectionType = status.connectionType
      })
    }
  }
})
