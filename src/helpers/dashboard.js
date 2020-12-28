import resolveConfig from 'tailwindcss/resolveConfig'
import useResource from '@/hooks/useResource'

const tailwindConfig = resolveConfig()
const trendResource = useResource('event-counts-trended')
const pieResource = useResource('event-counts-grouped')

const hexOpacity = {
  soft: '10',
  medium: '80',
  strong: 'BF'
}

function getChartJSSeries (data) {
  const seriesData = []
  const seriesLabels = []

  data.forEach((point) => {
    seriesData.push(point.percent)
    seriesLabels.push(point.category)
  })

  if (!seriesData.length) {
    seriesData.push(0)
    seriesLabels.push('No Data')
  }

  return {
    seriesData,
    seriesLabels,
  }
}

const getTrended = async (method = 'index', resourceID = null) => {
  const { data } = await trendResource[method](resourceID)

  const { seriesData, seriesLabels } = getChartJSSeries(data)

  return {
    id: 'dailyUptime',
    type: 'line',
    data: {
      labels: seriesLabels.reverse(),
      datasets: [
        {
          label: 'Up',
          data: seriesData.reverse(),
          fill: 'origin',
          fillOpacity: .1,
          backgroundColor: tailwindConfig.theme.colors.blue['400'] + hexOpacity.medium,
          borderColor: tailwindConfig.theme.colors.blue['400']
        },
        {
          //clone series to add downtime fill to plot
          data: seriesData.reverse(),
          fill: 'end',
          backgroundColor: tailwindConfig.theme.colors.white,
          borderColor: tailwindConfig.theme.colors.transparent
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        filter: function (item) {
          //only show up series in tooltip
          return item.datasetIndex === 0
        },
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (point) {
            return point.yLabel + '%'
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false
          },
          offset: seriesData.length === 1
        }],
        yAxes: [{
          gridLines: {
            display:false
          },
          ticks: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 100,
            callback: function (value) {
              return `${value}%`
            }
          }
        }]
      },
    }
  }
}

const getPast90Days = async (method = 'index', resourceID = null) => {
  const { data } = await pieResource[method](resourceID)

  const { seriesData, seriesLabels } = getChartJSSeries(data)

  const backgroundColors = {
    Down: tailwindConfig.theme.colors.gray['200'],
    Up: tailwindConfig.theme.colors.blue['400'],
  }

  return {
    id: 'dailyUptime',
    type: 'pie',
    data: {
      labels: seriesLabels,
      datasets: [{
        label: 'Weekly UpTime',
        data: seriesData,
        backgroundColor: function (point) {
          return backgroundColors[seriesLabels[point.dataIndex]]
        }
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      },
    }
  }
}

export { getTrended, getPast90Days }