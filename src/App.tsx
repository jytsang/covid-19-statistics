import React from 'react';
import './App.css';
import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'

import { Grid } from '@material-ui/core'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from  'recharts';

import { CountriesList } from 'components/CountriesList/CountriesList'

const App: React.FC = () => {
  return (
    <Grid container className="App">
      <Grid item md={3}>
        <CountriesList />
      </Grid>
      <Grid item md={9}>
        content
      </Grid>
    </Grid>
  )
}

export default App
