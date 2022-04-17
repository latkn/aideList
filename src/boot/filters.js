import { boot } from 'quasar/wrappers'

export default boot(async ( { app } ) => {
  app.config.globalProperties.$filters = {
    currency(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {style: 'currency', currency}).format(value)
  }
}})

// export default function currencyFilter(value, currency = 'RUB') {
//   return new Intl.NumberFormat('ru-RU', {style: 'currency', currency}).format(value)

// }
