import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  IconButton,
  makeStyles,
  ThemeProvider,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { getAllLatest } from 'api/covidApi'

import { CountriesList } from 'components/CountriesList'
import { SideNav } from 'components/SideNav'
import { CountryPage } from 'pages/CountryPage'
import { GlobalPage } from 'pages/GlobalPage'
import { Footer } from 'components/Footer'

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
      position: 'relative',
      width: 300,
      flexShrink: 0,
      flexGrow: 0,
    }
  },
  content: {
    flexGrow: 1
  },
  main: {
    minHeight: 'calc(100vh - 70px)',
    padding: theme.spacing(3)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  title: {},
  menuButton: {
    alignSelf: 'flex-end',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

const App: React.FC = () => {
  const classes = useStyles()
  const [countriesData, setCountriesData] = React.useState<any>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  React.useEffect(
    () => {
      getAllLatest()
        .then(data => {
          data.sort((a: any, b: any) => {
            return a[Object.keys(a)[0]].confirmed < b[Object.keys(b)[0]].confirmed ? 1 : -1
          })
          setCountriesData(data)
        })
    },
    []
  )

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <SideNav
            className={classes.sidebar}
            drawerOpen={drawerOpen}
            handleToggleDrawer={handleDrawerToggle}
          >
            <CountriesList countriesData={countriesData} />
          </SideNav>
          <div className={classes.content}>
            <main className={classes.main}>
              <div>
                <header className={classes.header}>
                  <Typography variant="h5" component="h1" className={classes.title}>COVID-19 Statistics</Typography>
                  <IconButton
                    className={classes.menuButton}
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </header>
                <Switch>
                  <Route path="/:countryCode">
                    <CountryPage />
                  </Route>
                  <Route path="/">
                    <GlobalPage />
                  </Route>
                </Switch>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
