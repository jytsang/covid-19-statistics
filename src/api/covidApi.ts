import axios from 'axios'

const apiUrl = 'https://covidapi.info/api/v1'

export const getAllLatest = async() => {
  const response = await axios.get(
    `${apiUrl}/global/latest`
  )

  return response.data.result
}

export const getGlobalHistoric = async() => {
  const response = await axios.get(
    `${apiUrl}/global/count`
  )
  
  return response.data.result
}

export const getCountryHistoric = async(countryId: string) => {
  const response = await axios.get(
    `${apiUrl}/country/${countryId}`
  )
  
  return response.data.result
}
