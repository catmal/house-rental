import { date } from 'quasar'

export default function formattedDate () {
  return {
    formattedDate (value) {
      return date.formatDate(value, 'YYYY-MM-DD')
    },
    formattedDateEurope (value) {
      return date.formatDate(value, 'DD-MM-YYYY')
    },
    formattedDay (value) {
      return date.formatDate(value, 'DD')
    },
    formattedYear (value) {
      return date.formatDate(value, 'YYYY')
    },
    formattedHours (value) {
      return date.formatDate(value, 'HH')
    },
    formattedMinutes (value) {
      return date.formatDate(value, 'mm')
    },
    formattedWeekDay (value) {
      return date.formatDate(value, 'dddd')
    },
    formattedMonth (value) {
      return date.formatDate(value, 'MMM YYYY')
    },
    formattedTime (value) {
      return date.formatDate(value, 'HH:mm')
    },

    formattedPrice (value) {
      return new Intl.NumberFormat('en-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    }

  }
}
