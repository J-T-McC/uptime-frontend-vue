<template>
  <div>
    <div class="mt-8 relative">

      <div class="container prose-xl">
        <p>
          <create-resource
              @resource:created="pollResources"
              header="Create Monitor"
              resource-name="monitors"
              :resource-form="monitorForm">
            Add
          </create-resource>
          Monitors to stay on top of unexpected downtime and certificate issues on yours or a service providers site
        </p>
      </div>

      <div class="flex flex-col mt-6">
        <div class="h-56" v-if="!monitors">
          <spinner></spinner>
        </div>
        <v-table v-if="monitors && monitors.length">
          <v-table-head>
            <v-table-row>
              <v-table-th>Endpoint</v-table-th>
              <v-table-th>Stats</v-table-th>
              <v-table-th>Uptime Status</v-table-th>
              <v-table-th>Uptime Check Enabled</v-table-th>
              <v-table-th>SSL Check Enabled</v-table-th>
              <v-table-th>Options</v-table-th>
            </v-table-row>
          </v-table-head>
          <v-table-body>
            <v-table-row v-for="(monitor) in monitors" :key="`${monitor.name}-row`">

              <v-table-td>
                <div class="text-sm leading-5 font-medium text-gray-900 flex justify-left h-full text-left">
                  <a target="_blank" :href="monitor.url">{{ monitor.url }}</a>
                </div>
              </v-table-td>

              <v-table-td>
                <div class="flex justify-around">
                  <router-link class="text-blue-400" :to="`/monitors/${monitor.id}`">
                    <presentation-chart-line class="h-7 w-7"></presentation-chart-line>
                  </router-link>
                </div>
              </v-table-td>


              <v-table-td class="text-center">
                   <span
                       :class="{
                          'bg-green-100 text-green-800': monitor.uptime_status === 'up',
                          'bg-red-100 text-red-800': monitor.uptime_status === 'down',
                          'bg-gray-100 text-gray-800': monitor.uptime_status === 'not yet checked'
                        }"
                       class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full relative">
                       {{ monitor.uptime_status }}

                      <span
                          :class="{
                            'bg-red-400': monitor.uptime_status === 'down',
                          }"
                          class="animate-ping absolute inline-flex rounded-full opacity-25 w-full h-full">
                      </span>
                   </span>

              </v-table-td>

              <v-table-td class="text-center"> {{ monitor.uptime_check_enabled }}</v-table-td>

              <v-table-td class="text-center"> {{ monitor.certificate_check_enabled }}</v-table-td>

              <v-table-td>
                <div class="flex justify-around">

                  <relate-resources
                      v-if="monitor.channelForm"
                      @resource:updated="pollResources"
                      :header="`Toggle Channels - ${monitor.url}`"
                      resource-name="monitors-channels"
                      :resource-form="monitor.channelForm"
                      :resource="monitor">
                  </relate-resources>

                  <edit-resource
                      @resource:updated="pollResources"
                      header="Edit Monitor"
                      resource-name="monitors"
                      :resource-form="monitorForm"
                      :resource="monitor">
                  </edit-resource>

                  <delete-resource
                      @resource:deleted="pollResources"
                      header="Delete Monitor"
                      resource-name="monitors"
                      :resource="monitor">
                  </delete-resource>

                </div>
              </v-table-td>
            </v-table-row>
          </v-table-body>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import CreateResource from '@/components/interaction/resources/CreateResource'
import EditResource from '@/components/interaction/resources/EditResource'
import DeleteResource from '@/components/interaction/resources/DeleteResource'

import { monitorForm, toggleTemplate } from '@/helpers/forms.js'
import { toastError } from '@/helpers/resource'
import { ref } from 'vue'

import { PresentationChartLine } from 'heroicons/vue/outline'

import {
  VTable,
  VTableHead,
  VTableBody,
  VTableTd,
  VTableRow,
  VTableTh,
} from '@/components/table'
import RelateResources from '@/components/interaction/resources/RelateResources'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Spinner,
    RelateResources,
    DeleteResource,
    CreateResource,
    EditResource,
    VTable,
    VTableHead,
    VTableBody,
    VTableTd,
    VTableRow,
    VTableTh,
    PresentationChartLine
  },
  setup () {
    const monitorResource = useResource('monitors')
    const channelResource = useResource('channels')

    const monitors = ref(null)
    const channels = ref([])

    const pollResources = () => {
      const monitorPromise = monitorResource.index().then((response) => {
        monitors.value = response.data.data
      }).catch(toastError)

      const channelPromise = channelResource.index().then((response) => {
        channels.value = response.data.data
      })

      Promise.all([monitorPromise, channelPromise]).then(() => {
        monitors.value.forEach((monitor, index) => {
          const form = { inputs: [] }
          channels.value.forEach((channel) => {
            const channelActive = monitor.channels.filter(monitorsChannel => monitorsChannel.id === channel.id)
            form.inputs.push(toggleTemplate(
                `${channel.type}: ${channel.description}`,
                `id[${channel.id}]`,
                channelActive.length > 0
            ))
          })
          monitors.value[index].channelForm = form
        })
      })
    }

    pollResources()

    const showModal = ref(false)

    return {
      monitors,
      showModal,
      pollResources,
      monitorForm
    }
  },
}
</script>