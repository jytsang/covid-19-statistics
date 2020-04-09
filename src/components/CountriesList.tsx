import React from 'react'
import { getAllLatest } from 'api/covidApi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
  link: {
    display: 'block',
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  list: {
    paddingTop: 0,
  }
}))

type CountriesListProps = {
  countriesData: any
}

export const CountriesList: React.FC<CountriesListProps> = ({
  countriesData
}) => {
  const classes = useStyles()
  const { t } = useTranslation('countries')

  return (
    <>
      <MenuList className={classes.list}>
        {countriesData && countriesData.map((country: any) => (
          <Link to={`/${Object.keys(country)[0]}`} key={Object.keys(country)[0]} className={classes.link}>
            <MenuItem button>
              <ListItemText
                primary={t(Object.keys(country)[0])}
                secondary={
                  <span className={classes.stats}>
                    <Typography variant="body2" component="span" className={classes.confirmed}>
                      {country[Object.keys(country)[0]].confirmed}
                    </Typography>
                    <Typography variant="body2" component="span" className={classes.deaths}>
                      {country[Object.keys(country)[0]].deaths}
                    </Typography>
                    <Typography variant="body2" component="span" className={classes.recovered}>
                      {country[Object.keys(country)[0]].recovered}
                    </Typography>
                  </span>
                }
              />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </>
  )
}
