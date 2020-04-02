import React from 'react'
import { getAllLatest } from 'api/covidApi'

import {
  ListItemText,
  makeStyles,
  MenuList,
  MenuItem,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  confirmed: {
    color: theme.palette.warning.light
  },
  deaths: {
    color: theme.palette.error.light
  },
  recovered: {
    color: theme.palette.success.light
  }
}))

export const CountriesList: React.FC = props => {
  const classes = useStyles()
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
    <MenuList>
      {countriesData && countriesData.map((country: any) => (
        <MenuItem button key={Object.keys(country)[0]}>
          <ListItemText
            primary={Object.keys(country)[0]}
            secondary={
              <div>
                <Typography variant="body2" component="span" className={classes.confirmed}>C {country[Object.keys(country)[0]].confirmed}</Typography>
                <Typography variant="body2" component="span" className={classes.deaths}>D {country[Object.keys(country)[0]].deaths}</Typography>
                <Typography variant="body2" component="span" className={classes.recovered}>R {country[Object.keys(country)[0]].recovered}</Typography>
              </div>
            }
          />
        </MenuItem>
      ))}
    </MenuList>
  )
}
