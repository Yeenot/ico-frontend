import { HorizontalBar, mixins } from 'vue-chartjs'

import Vue from 'vue'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';

Vue.component(ChartJsPluginDataLabels)

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: ['options', 'plugins'],
  mounted () {
  	this.renderChart(this.chartData, this.options)
  }
}