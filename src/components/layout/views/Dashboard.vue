<template>
  <div>
    <div class="flex flex-col mt-3 lg:mt-8">
      <div class="container">
        <div class="flex flex-wrap">

          <container :loading="!pie.value" class="md:w-1/2">
            <template v-slot:header>
              Past 90 days Uptime
            </template>
            <template v-slot:body>
              <div class="h-56">
                <vue3-chart-js v-if="pie.value" v-bind="{...pie.value}"></vue3-chart-js>
              </div>
            </template>
          </container>

          <container :loading="!trend.value" class="md:w-1/2">
            <template v-slot:header>
              Trended Uptime
            </template>
            <template v-slot:body>
              <div class="h-56">
                <vue3-chart-js class="flex" v-if="trend.value" v-bind="{...trend.value}"></vue3-chart-js>
              </div>
            </template>
          </container>

          <recent-events></recent-events>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from 'vue3-chartjs'
import Container from '@/components/card/Container'
import { reactive } from 'vue'
import { getTrended, getPast90Days } from '@/helpers/dashboard'
import RecentEvents from '@/components/layout/sections/RecentEvents'

export default {
  components: {
    Container,
    Vue3ChartJs,
    RecentEvents
  },
  setup () {
    const trend = reactive({})
    const pie = reactive({})

    getPast90Days().then(result => pie.value = result)
    getTrended().then(result => trend.value = result)

    return {
      trend,
      pie,
    }
  },
}
</script>