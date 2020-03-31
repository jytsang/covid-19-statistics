import React from 'react';
import './App.css';
import { getGlobalHistoric } from 'api/covidApi'
import { convertDateWise } from 'utils/convertGraphData'
// import { Line } from '@nivo/line'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from  'recharts';

const App: React.FC = () => {
  const [globalHistoricData, setGlobalHistoricData] = React.useState<any>(null)

  React.useEffect(
    () => {
      getGlobalHistoric()
        .then(data => {
          data = convertDateWise(data)
          setGlobalHistoricData(data)
        })
    },
    []
  )

  return (
    <div className="App" style={{ position: "relative", height: "500px" }}>
      {globalHistoricData &&
        <LineChart
          data={globalHistoricData}
          width={2000}
          height={500}
        >
          <XAxis dataKey="name" />
          <Line type="monotone" dataKey="confirmed" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
        // <Line
        //   data={globalHistoricData}
        //   width={500}
        //   height={500}
        //   axisBottom={{
        //     legend: 'Date'
        //   }}
        //   axisLeft={{
        //     legend: 'Count'
        //   }}
        // />
      }
      {JSON.stringify(globalHistoricData)}
    </div>
  )
}

export default App
