import React from 'react'
import { useParams } from 'react-router-dom'
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

import { getCountryHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

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

export const CountryPage: React.FC = props => {
  const { countryCode } = useParams<{countryCode: string}>()
  const [countryData, setCountryData] = React.useState<ReturnType<typeof convertDateWise>>(
    [{date: '', confirmed: null, deaths: null, recovered: null}]
  )
  const theme = useTheme()
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

  const getHighestIncrease = React.useCallback(
    (type: 'confirmed' | 'deaths' | 'recovered') => {
      if (countryData.length < 2) return 'N/A'

      let highest = 0
      let highestDate = ''

      countryData.map((data, index) => {
        if (
          index > 0
          && Math.abs(data[type] - countryData[index - 1][type]) > highest
        ) {
          highest = Math.abs(data[type] - countryData[index - 1][type])
          highestDate = data.date
        }
      })
      
      return `+${highest} (${highestDate})`
    },
    [countryData]
  )

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.title}>{t(countryCode)}</Typography>
      {countryData &&
        <Grid container spacing={3}>
          <Grid item md={3}>
            <div className={classes.box}>
              <Typography variant="h6" component="h3">Latest {`(${countryData[countryData.length - 1].date})`}</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Confirmed: <Typography component="span" className={classes.confirmed}>{countryData[countryData.length - 1].confirmed}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('confirmed')}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Deaths: <Typography component="span" className={classes.deaths}>{countryData[countryData.length - 1].deaths}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('deaths')}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        Recovered: <Typography component="span" className={classes.recovered}>{countryData[countryData.length - 1].recovered}</Typography>
                      </>
                    }
                    secondary={`Highest increase: ${getHighestIncrease('recovered')}`}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={classes.box}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={countryData}>
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
