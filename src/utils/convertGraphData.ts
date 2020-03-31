export const convertDateWise = (data: any) => {
  const confirmedData: [any] = [{}]
  const deathsData: [any] = [{}]
  const recoveredData: [any] = [{}]

  // Object.keys(data).map(date => {
  //   confirmedData.push({
  //     "x": date,
  //     "y": data[date].confirmed
  //   })
  //   deathsData.push({
  //     "x": date,
  //     "y": data[date].deaths
  //   })
  //   recoveredData.push({
  //     "x": date,
  //     "y": data[date].recovered
  //   })
  // })

  // return [
  //   {
  //     "id": "confirmed",
  //     "data": confirmedData
  //   },
  //   {
  //     "id": "deaths",
  //     "data": deathsData
  //   },
  //   {
  //     "id": "recovered",
  //     "data": recoveredData
  //   }
  // ]

  return Object.keys(data).map(date => {
    return {
      name: date,
      confirmed: data[date].confirmed,
      deaths: data[date].deaths,
      recovered:data[date].recovered
    }
  })
}
