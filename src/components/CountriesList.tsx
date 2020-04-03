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
  },
  stats: {
    display: 'flex',
    '& > span': {
      width: '33.33%'
    }
  },
  menuItem: {
    borderStyle: 'solid',
    borderColor: theme.palette.grey[500],
    borderTopWidth: 1
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
        <MenuItem button key={Object.keys(country)[0]} className={classes.menuItem}>
          <ListItemText
            primary={Object.keys(country)[0]}
            secondary={
              <div className={classes.stats}>
                <Typography variant="body2" component="span" className={classes.confirmed}>
                  co. {country[Object.keys(country)[0]].confirmed}
                </Typography>
                <Typography variant="body2" component="span" className={classes.deaths}>
                  de. {country[Object.keys(country)[0]].deaths}
                </Typography>
                <Typography variant="body2" component="span" className={classes.recovered}>
                  re. {country[Object.keys(country)[0]].recovered}
                </Typography>
              </div>
            }
          />
        </MenuItem>
      ))}
    </MenuList>
  )
}
