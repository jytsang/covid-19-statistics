import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getCountryHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

import { Latest } from 'components/Latest'
import { HistoricLineGraph } from 'components/HistoricLineGraph'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}))

export const CountryPage: React.FC = props => {
  const { countryCode } = useParams<{countryCode: string}>()
  const [countryData, setCountryData] = React.useState<ReturnType<typeof convertDateWise>>(
    [{date: '', confirmed: null, deaths: null, recovered: null}]
  )
  const classes = useStyles()
  const { t } = useTranslation('countries')

  React.useEffect(
    () => {
      getCountryHistoric(countryCode)
        .then(data => {
          setCountryData(convertDateWise(data))
        })
    },
    [countryCode]
  )

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.title}>{t(countryCode)}</Typography>
      {countryData &&
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Latest data={countryData} />
          </Grid>
          <Grid item md={9}>
            <HistoricLineGraph data={countryData} />
          </Grid>
        </Grid>
      }
    </div>
  )
}
