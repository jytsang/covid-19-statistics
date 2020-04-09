import React from 'react'
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

import { Latest } from 'components/Latest'
import { HistoricLineGraph } from 'components/HistoricLineGraph'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  }
}))

export const GlobalPage: React.FC = props => {
  const [globalData, setGlobalData] = React.useState<ReturnType<typeof convertDateWise>>(
    [{date: '', confirmed: null, deaths: null, recovered: null}]
  )
  const classes = useStyles()
  const { t } = useTranslation('common')

  React.useEffect(
    () => {
      getGlobalHistoric()
        .then(data => {
          setGlobalData(convertDateWise(data))
        })
    },
    []
  )

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.title}>{t('global')}</Typography>
      {globalData &&
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Latest data={globalData} />
          </Grid>
          <Grid item xs={12} md={9}>
            <HistoricLineGraph data={globalData} />
          </Grid>
        </Grid>
      }
    </div>
  )
}
