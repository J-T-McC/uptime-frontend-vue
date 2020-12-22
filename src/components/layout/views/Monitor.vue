<template>
  <div>
    <div class="flex flex-col mt-8">
      <div class="container">
        <div class="flex flex-wrap">

          <div class="w-full m-3">
            <h2 class="bg-white p-5 w-full border-b text-gray-900 font-semibold text-xl">
              {{ header }}
            </h2>
          </div>

          <container v-if="pie.value" class="md:w-1/2">
            <template v-slot:header>
              Past 90 days Uptime
            </template>
            <template v-slot:body>
              <div class="h-56">
                <vue3-chart-js v-if="pie.value" v-bind="{...pie.value}"></vue3-chart-js>
              </div>
            </template>
          </container>

          <container v-if="trend.value" class="md:w-1/2">
            <template v-slot:header>
              Weekly trended Uptime
            </template>
            <template v-slot:body>
              <div class="h-56">
                <vue3-chart-js class="flex" v-if="trend.value" v-bind="{...trend.value}"></vue3-chart-js>
              </div>
            </template>
          </container>

          <container v-if="latestEvents.value">
            <template v-slot:header>
              Recent Events
            </template>

            <template v-slot:body>
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
                  <h4 class="font-semibold text-gray-700 normal-case">
                    <span>{{ event.category }} - {{ event.status }}: </span>
                    <small class="italic font-normal">{{ formatDate(event.created_at) }}</small>
                  </h4>

                </template>

                <template v-slot:description>
                  <span>{{ event.error }}</span>
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
import { reactive, ref } from 'vue'
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
    const latestEventsResource = useResource('latest-monitor-events')

    const route = useRoute()
    const resourceID = route.params.id

    const header = ref(null)

    getPast90Days('show', resourceID).then(result => pie.value = result)
    getTrended('show', resourceID).then(result => trend.value = result)

    const paginationMeta = reactive({})
    const loadRecentEvents = (params) => {
      latestEventsResource.show(resourceID, params).then(({ data }) => {
        latestEvents.value = data.data
        paginationMeta.value = data.meta

        if (!header.value) {
          header.value = latestEvents.value.length ? latestEvents.value[0].monitor.url : 'Unknown Resource'
        }
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
      header,
      eventToIconMap,
      eventToColorMap,
      loadRecentEvents,
      formatDate
    }
  },
}
</script>