import React from 'react';
import './App.css';
import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

import CssBaseline from '@material-ui/core/CssBaseline'
import { Grid } from '@material-ui/core'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from  'recharts';

import { CountriesList } from 'components/CountriesList'
import { SideNav } from 'components/SideNav'

const App: React.FC = () => {
  return (
    <Grid container className="App">
      <CssBaseline />
      <SideNav>
        <CountriesList />
      </SideNav>
      <Grid item md={9}>
        content
      </Grid>
    </Grid>
  )
}

export default App
