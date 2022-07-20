<template>
  <div class="reports-container" ref="reports" id="main"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])
export default {
  name: 'ReportsIndex',
  components: {},
  data() {
    return {
      option: {}
    }
  },
  created() {
    this.getEchars()
  },
  methods: {
    getEchars() {}
  },
  mounted() {
    const app = {}

    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)

    const categories = (function () {
      let now = new Date()
      const res = []
      let len = 10
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        now = new Date(+now - 2000)
      }
      return res
    })()
    const categories2 = (function () {
      const res = []
      let len = 10
      while (len--) {
        res.push(10 - len - 1)
      }
      return res
    })()
    const data = (function () {
      const res = []
      let len = 10
      while (len--) {
        res.push(Math.round(Math.random() * 1000))
      }
      return res
    })()
    const data2 = (function () {
      const res = []
      let len = 0
      while (len < 10) {
        res.push(+(Math.random() * 10 + 5).toFixed(1))
        len++
      }
      return res
    })()
    this.option = {
      title: {
        text: '代码敲敲有限公司'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: 'income',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          name: 'expend',
          type: 'line',
          data: data2
        }
      ]
    }
    app.count = 11
    setInterval(function () {
      const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')
      data.shift()
      data.push(Math.round(Math.random() * 1000))
      data2.shift()
      data2.push(+(Math.random() * 10 + 5).toFixed(1))
      categories.shift()
      categories.push(axisData)
      categories2.shift()
      categories2.push(app.count++)
      myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data2
          }
        ]
      })
    }, 2100)

    this.option && myChart.setOption(this.option)
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.reports-container {
  width: 1000px;
  height: 600px;
}
</style>
