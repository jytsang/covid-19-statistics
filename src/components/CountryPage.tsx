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
  }
}))

export const CountryPage: React.FC = props => {
  const { countryCode } = useParams<{countryCode: string}>()
  const [countryData, setCountryData] = React.useState<ReturnType<typeof convertDateWise>>(
    [{date: '2020-01-22', confirmed: 0, deaths:0, recovered: 0}]
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

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.title}>{t(countryCode)}</Typography>
      {countryData &&
        <Grid container spacing={3}>
          <Grid item md={3}>
            <div className={classes.box}>
              <Typography variant="h6" component="h3">Latest</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Confirmed: ${countryData[countryData.length - 1].confirmed}`}
                    secondary="Highest increase:"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Deaths: ${countryData[countryData.length - 1].deaths}`}
                    secondary="Highest increase:"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Recovered: ${countryData[countryData.length - 1].recovered}`}
                    secondary="Highest increase:"
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
