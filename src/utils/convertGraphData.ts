export const convertDateWise = (data: any) => {
  return Object.keys(data).map(date => {
    return {
      date: date,
      confirmed: data[date].confirmed,
      deaths: data[date].deaths,
      recovered:data[date].recovered
    }
  })
}
