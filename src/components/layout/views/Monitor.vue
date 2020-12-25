<template>
  <div>
    <div class="flex flex-col mt-8">
      <div class="container">
        <div class="flex flex-wrap">

          <div class="w-full m-3" v-if="monitor.value">
            <h2 class="bg-white p-5 w-full border-b text-gray-900 text-xl rounded shadow-md">
              {{ monitor.value.url }}
            </h2>
          </div>

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
              Weekly trended Uptime
            </template>
            <template v-slot:body>
              <div class="h-56">
                <vue3-chart-js class="flex" v-if="trend.value" v-bind="{...trend.value}"></vue3-chart-js>
              </div>
            </template>
          </container>

          <container :loading="!latestEvents.value">
            <template v-slot:header>
              Recent Events
            </template>

            <template v-slot:body v-if="latestEvents.value">
              <basic-card
                  class="xl:w-full lg:w-full sm:w-full lg:w-full mb-0"
                  v-for="event in latestEvents.value"
                  :key="event.id">

                <template v-slot:icon>
                  <component
                      class="h-10 w-10"
                      :class="eventToColorMap[`${event.category}-${event.status}`]"
                      :is="eventToIconMap[`${event.category}-${event.status}`]">
                  </component>
                </template>

                <template v-slot:title>
                  <h4>
                    <span>{{ event.category }} - {{ event.status }}: </span>
                    <small class="italic font-normal">{{ formatDate(event.created_at) }}</small>
                  </h4>
                </template>

                <template v-slot:description>
                  <span class="text-sm">{{ event.error }}</span>
                </template>
              </basic-card>

              <pagination-buttons @navigate="loadRecentEvents" :meta="paginationMeta.value"></pagination-buttons>

              <p v-if="!latestEvents.value.length" class="italic text-gray-500 text-center">
                No monitor events available
              </p>

            </template>
          </container>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from 'vue3-chartjs'
import Container from '@/components/card/Container'
import BasicCard from '@/components/card/BasicCard'
import PaginationButtons from '@/components/interaction/PaginationButtons'
import { reactive } from 'vue'
import useResource from '@/hooks/useResource'
import { getTrended, getPast90Days } from '@/helpers/dashboard'
import { ShieldExclamation, ArrowCircleUp, ArrowCircleDown } from 'heroicons/vue/solid'
import { useRoute } from 'vue-router'
import moment from 'moment'

const eventToIconMap = {
  'CERTIFICATE-VALID': ShieldExclamation,
  'CERTIFICATE-INVALID': ShieldExclamation,
  'CERTIFICATE-EXPIRED': ShieldExclamation,
  'UPTIME-RECOVERED': ArrowCircleUp,
  'UPTIME-OFFLINE': ArrowCircleDown,
}

const eventToColorMap = {
  'CERTIFICATE-VALID': 'text-yellow-400',
  'CERTIFICATE-INVALID': 'text-red-300',
  'CERTIFICATE-EXPIRED': 'text-red-300',
  'UPTIME-RECOVERED': 'text-blue-400',
  'UPTIME-OFFLINE': 'text-red-300',
}

export default {
  components: {
    PaginationButtons,
    Container,
    BasicCard,
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

    useResource('monitors').show(resourceID).then(({data}) => {
      monitor.value = data.data[0] ?? null
    })

    getPast90Days('show', resourceID).then(result => pie.value = result)
    getTrended('show', resourceID).then(result => trend.value = result)

    const paginationMeta = reactive({})
    const loadRecentEvents = (params) => {
      useResource('latest-monitor-events').show(resourceID, params).then(({ data }) => {
        latestEvents.value = data.data
        paginationMeta.value = data.meta
      })
    }

    loadRecentEvents({ page: 1 })

    const formatDate = (date) => {
      return moment(date).local().format('YYYY-MM-DD HH:mm:ss')
    }

    return {
      trend,
      pie,
      latestEvents,
      paginationMeta,
      monitor,
      eventToIconMap,
      eventToColorMap,
      loadRecentEvents,
      formatDate
    }
  },
}
</script>