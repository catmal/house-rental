import { defineStore } from 'pinia'
import { Loading, QSpinnerGears } from 'quasar'
import { useNotification } from 'src/composables/notification.js'
const { showNotification } = useNotification()
import { api } from 'src/boot/axios'

export const usePropertyStore = defineStore({
  id: 'property',
  state: () => {
    return {
      currentProperty: {},
      properties: {
        properties: []
      },
      pagination: {
        sortBy: 'name',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 20 // specifying this determines pagination is server-side
      }
    }
  },
  actions: {
    async loadProperties (payload) {
      console.log(payload)
      Loading.show({ message: 'Loading', spinner: QSpinnerGears })
      try {
        const res = await api.get('/properties' +
          '?sort_by=' + (payload.pagination.sortBy ? payload.pagination.sortBy : this.pagination.sortBy) +
          '&page=' + (payload.pagination.page ? payload.pagination.page : '') +
          '&per_page=' + (payload.pagination.rowsPerPage ? payload.pagination.rowsPerPage : '') +
          '&sort_by=' + (payload.pagination.sortBy ? payload.pagination.sortBy : '') +
          '&descending=' + (payload.pagination.descending ? payload.pagination.descending : '') +
          '&search=' + (payload.filter ? payload.filter : '') +
          '&min_bedrooms=' + (payload.bedrooms ? payload.bedrooms.min : '') +
          '&max_bedrooms=' + (payload.bedrooms ? payload.bedrooms.max : '') +
          '&min_bathrooms=' + (payload.bathrooms ? payload.bathrooms.min : '') +
          '&max_bathrooms=' + (payload.bathrooms ? payload.bathrooms.max : '') +
          '&min_land_size=' + (payload.landSize ? payload.landSize.min : '') +
          '&max_land_size=' + (payload.landSize ? payload.landSize.max : '') +
          '&min_building_size=' + (payload.buildingSize ? payload.buildingSize.min : '') +
          '&max_building_size=' + (payload.buildingSize ? payload.buildingSize.max : '') +
          '&min_price=' + (payload.price ? payload.price.min : '') +
          '&max_price=' + (payload.price ? payload.price.max : '')

        )

        this.pagination = payload.pagination
        this.properties = res.data
        this.pagination.rowsNumber = this.properties.meta.rows

        Loading.hide()
      } catch (error) {
        Loading.hide()
        showNotification({ message: error.message, type: 'error' })
      }
    }
  }

})
