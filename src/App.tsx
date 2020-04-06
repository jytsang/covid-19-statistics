import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Typography
} from '@material-ui/core'

import { CountriesList } from 'components/CountriesList'
import { SideNav } from 'components/SideNav'
import { CountryPage } from 'components/CountryPage'

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
  },
  title: {
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  }
}))

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <SideNav className={classes.sidebar}>
            <CountriesList />
          </SideNav>
          <main className={classes.content}>
            <header>
              <Typography variant="h2" component="h1" className={classes.title}>COVID-19 Statistics</Typography>
            </header>
            <Route path="/:countryCode">
              <CountryPage />
            </Route>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
