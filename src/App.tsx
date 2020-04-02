import React from 'react';
import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from  'recharts';

import { CountriesList } from 'components/CountriesList'
import { SideNav } from 'components/SideNav'

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: 300,
      flexShrink: 0,
      flexGrow: 0,
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}))

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <SideNav className={classes.sidebar}>
          <CountriesList />
        </SideNav>
        <main className={classes.content}>
          content
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
