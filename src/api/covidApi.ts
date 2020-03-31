import axios from 'axios'

export const getCountryHistoric = (countryId: string) => {
  axios.get(
    `https://covidapi.info/api/v1/country/${countryId}`
  )
  .then(response => {
    console.log(response)
  })
}
