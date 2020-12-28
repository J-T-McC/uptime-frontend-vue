<template>
  <div>
    <div class="flex flex-col mt-3 lg:mt-8">
      <div class="container">
        <div class="flex flex-wrap">

          <container v-if="monitor.value" :hideBody="true">
            <template v-slot:header>
              <span class="inline-block">
                <span class="flex h-3 w-3 relative">
                  <span :class="getPulseClass(monitor.value.uptime_status, 400)"
                        class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75">
                  </span>
                  <span :class="getPulseClass(monitor.value.uptime_status, 500)"
                        class="relative inline-flex rounded-full h-3 w-3">
                  </span>
                </span>
              </span>

              {{ monitor.value.url }}

            </template>
          </container>

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

          <recent-events :monitor-id="resourceID"></recent-events>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from 'vue3-chartjs'
import Container from '@/components/card/Container'
import RecentEvents from '@/components/layout/sections/RecentEvents'
import useResource from '@/hooks/useResource'
import { reactive } from 'vue'
import { getTrended, getPast90Days } from '@/helpers/dashboard'
import { useRoute } from 'vue-router'
import { toastMessage } from '@/helpers/toast'

export default {
  components: {
    RecentEvents,
    Container,
    Vue3ChartJs,
  },
  emits: ['update-header'],
  setup () {
    const trend = reactive({})
    const pie = reactive({})
    const latestEvents = reactive({})
    const route = useRoute()
    const resourceID = route.params.id
    const monitor = reactive({})

    useResource('monitors').show(resourceID).then(({ data }) => {
      monitor.value = data.data[0] ?? null
    }).catch(toastMessage)

    getPast90Days('show', resourceID).then(result => pie.value = result)
    getTrended('show', resourceID).then(result => trend.value = result)

    const getPulseClass = (status, weight) => {
      let color = 'bg-gray'
      switch (status) {
        case 'up' :
          color = 'bg-green'
          break
        case 'down':
          color = 'bg-red'
          break
      }
      return `${color}-${weight}`
    }

    return {
      trend,
      pie,
      latestEvents,
      monitor,
      resourceID,
      getPulseClass,
    }
  },
}
</script>