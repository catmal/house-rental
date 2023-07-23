import { Notify } from 'quasar'

export function useNotification () {
  function showNotification (payload) {
    Notify.create({
      message: payload.message ? payload.message : '',
      color: payload.type && payload.type === 'success' ? 'positive' : 'negative',
      timeout: 500
    })
  }
  return {
    showNotification
  }
}
