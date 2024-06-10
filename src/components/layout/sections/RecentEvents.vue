<template>
  <container :loading="!latestEvents.value" class="w-full">
    <template v-slot:header>
      Recent Events
    </template>

    <template v-slot:body v-if="latestEvents.value">
      <basic-card
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
          <router-link :to="`/monitors/${event.monitor.id}`"
                       class="block overflow-hidden overflow-ellipsis font-semibold">
            {{ event.monitor.url }}
          </router-link>

          <span class="text-xs block max-w-md">
            <span>{{ formatDate(event.created_at) }}</span> -
            <span>{{ event.category }} - {{ event.status }}</span>
          </span>
        </template>

        <template v-slot:description>
          <p class="text-sm mb-3 italic p-2 shadow-inner bg-gray-100 mt-2" v-if="event.error">"{{ event.error }}"</p>
        </template>
      </basic-card>

      <pagination-buttons @navigate="loadRecentEvents" :meta="paginationMeta.value" :buttons-shown="3"></pagination-buttons>

      <p v-if="!latestEvents.value.length" class="italic text-gray-500 text-center">
        No monitor events available
      </p>

    </template>
  </container>
</template>

<script>

import Container from '@/components/card/Container'
import BasicCard from '@/components/card/BasicCard'
import PaginationButtons from '@/components/interaction/PaginationButtons'
import useResource from '@/hooks/useResource'
import { reactive } from 'vue'
import { ArrowCircleDown, ArrowCircleUp, ShieldExclamation } from 'heroicons/vue/solid'
import moment from 'moment'

const eventToIconMap = {
  'CERTIFICATE-ONLINE': ShieldExclamation,
  'CERTIFICATE-VALID': ShieldExclamation,
  'CERTIFICATE-INVALID': ShieldExclamation,
  'CERTIFICATE-EXPIRED': ShieldExclamation,
  'CERTIFICATE-RECOVERED': ShieldExclamation,
  'UPTIME-RECOVERED': ArrowCircleUp,
  'UPTIME-OFFLINE': ArrowCircleDown,
}

const eventToColorMap = {
  'CERTIFICATE-VALID': 'text-yellow-400',
  'CERTIFICATE-INVALID': 'text-red-400',
  'CERTIFICATE-EXPIRED': 'text-red-400',
  'CERTIFICATE-RECOVERED': 'text-red-400',
  'UPTIME-RECOVERED': 'text-blue-400',
  'UPTIME-OFFLINE': 'text-red-400',
}

export default {
  name: 'RecentEvents',
  props: {
    monitorId: Number
  },
  components: {
    Container,
    BasicCard,
    PaginationButtons
  },
  setup (props) {
    const latestEventsResource = useResource('latest-monitor-events')

    const latestEvents = reactive({})
    const paginationMeta = reactive({})

    const formatDate = (date) => {
      return moment(date).local().format('YYYY-MM-DD HH:mm:ss')
    }

    const loadRecentEvents = (params) => {
      const eventPromise = props.monitorId ? latestEventsResource.show(props.monitorId, params) : latestEventsResource.index(params)
      eventPromise.then(({ data }) => {
        latestEvents.value = data.data
        paginationMeta.value = data.meta
      })
    }

    loadRecentEvents({ page: 1 })

    return {
      latestEvents,
      paginationMeta,
      eventToIconMap,
      eventToColorMap,
      loadRecentEvents,
      formatDate,
    }
  }

}
</script>