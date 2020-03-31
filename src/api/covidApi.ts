import axios from 'axios'

const apiUrl = 'https://covidapi.info/api/v1'

export const getGlobalHistoric = async() => {
  const response = await axios.get(
    `${apiUrl}/global/count`
  )
  
  return response.data.result
}

export const getCountryHistoric = (countryId: string) => {
  axios.get(
    `${apiUrl}/country/${countryId}`
  )
  .then(response => {
    console.log(response)
  })
}
