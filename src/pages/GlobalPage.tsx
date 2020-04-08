import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'
import { getHighestIncrease } from 'utils/calculateStats'

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  },
  box: {
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[900]
  },
  confirmed: {
    color: theme.palette.warning.light
  },
  deaths: {
    color: theme.palette.error.light
  },
  recovered: {
    color: theme.palette.success.light
  },
}))

export const GlobalPage: React.FC = props => {
  const [globalData, setGlobalData] = React.useState<ReturnType<typeof convertDateWise>>(
    [{date: '', confirmed: null, deaths: null, recovered: null}]
  )
  const theme = useTheme()
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
      <Typography variant="h4" component="h2" className={classes.title}>{t('Global')}</Typography>
      {globalData &&
        <Grid container spacing={3}>
          <Grid item md={3}>
            <div className={classes.box}>
              <Typography variant="h6" component="h3">Latest {`(${globalData[globalData.length - 1].date})`}</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Confirmed: <Typography component="span" className={classes.confirmed}>{globalData[globalData.length - 1].confirmed}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('confirmed', globalData)}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Deaths: <Typography component="span" className={classes.deaths}>{globalData[globalData.length - 1].deaths}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('deaths', globalData)}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Recovered: <Typography component="span" className={classes.recovered}>{globalData[globalData.length - 1].recovered}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('recovered', globalData)}`}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={classes.box}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={globalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[600]} />
                  <XAxis
                    dataKey="date"
                    stroke={theme.palette.grey[200]} 
                  />
                  <YAxis stroke={theme.palette.grey[200]} />
                  <Tooltip contentStyle={{ backgroundColor: theme.palette.grey[900] }} />
                  <Legend />
                  <Line
                    dataKey="confirmed"
                    stroke={theme.palette.warning.main}
                    strokeWidth={3}
                    dot={{ stroke: theme.palette.warning.light, strokeWidth: 1, fill: theme.palette.warning.dark }}
                  />
                  <Line
                    dataKey="deaths"
                    stroke={theme.palette.error.main}
                    strokeWidth={3}
                    dot={{ stroke: theme.palette.error.light, strokeWidth: 1, fill: theme.palette.error.dark }}
                  />
                  <Line
                    dataKey="recovered"
                    stroke={theme.palette.success.main}
                    strokeWidth={3}
                    dot={{ stroke: theme.palette.success.light, strokeWidth: 1, fill: theme.palette.success.dark }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Grid>
        </Grid>
      }
    </div>
  )
}
