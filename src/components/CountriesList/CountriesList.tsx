import React from 'react'
import { getAllLatest } from 'api/covidApi'

export const CountriesList: React.FC = props => {
  const [countriesData, setCountriesData] = React.useState<any>(null)

  React.useEffect(
    () => {
      getAllLatest()
        .then(data => {
          setCountriesData(data)
        })
    },
    []
  )

  return (
    <div>
      {countriesData && countriesData.map((country: any) => (
        <div>
          <h2>{Object.keys(country)[0]}</h2>
          <ul>
            <li>{country[Object.keys(country)[0]].confirmed}</li>
            <li>{country[Object.keys(country)[0]].deaths}</li>
            <li>{country[Object.keys(country)[0]].recovered}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
