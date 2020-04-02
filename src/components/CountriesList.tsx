import React from 'react'
import { getAllLatest } from 'api/covidApi'

import { List, ListItem } from '@material-ui/core'

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
    <List>
      {countriesData && countriesData.map((country: any) => (
        <ListItem button key={Object.keys(country)[0]}>
          <h2>{Object.keys(country)[0]}</h2>
          <ul>
            <li>C {country[Object.keys(country)[0]].confirmed}</li>
            <li>D {country[Object.keys(country)[0]].deaths}</li>
            <li>R {country[Object.keys(country)[0]].recovered}</li>
          </ul>
        </ListItem>
      ))}
    </List>
  )
}
