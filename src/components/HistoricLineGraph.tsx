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
  makeStyles,
  useTheme
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  box: {
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[900]
  }
}))

type HistoricLineGraphProps = {
  data: any
}

export const HistoricLineGraph: React.FC<HistoricLineGraphProps> = ({
  data
}) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <div className={classes.box}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
  )
}
