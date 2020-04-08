export const getHighestIncrease = (type: 'confirmed' | 'deaths' | 'recovered', globalData: any) => {
    if (globalData.length < 2) return 'N/A'

    let highest = 0
    let highestDate = ''

    globalData.map((data: any, index: number) => {
      if (
        index > 0
        && Math.abs(data[type] - globalData[index - 1][type]) > highest
      ) {
        highest = Math.abs(data[type] - globalData[index - 1][type])
        highestDate = data.date
      }
    })
    
    return `+${highest} (${highestDate})`
  }
