<template>
  <div>
    <div class="mt-8">

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
        <v-table v-if="monitors.length">
          <v-table-head>
            <v-table-row>
              <v-table-th>Endpoint</v-table-th>
              <v-table-th>Uptime Check Enabled</v-table-th>
              <v-table-th>SSL Check Enabled</v-table-th>
              <v-table-th>Uptime Status</v-table-th>
              <v-table-th></v-table-th>
            </v-table-row>
          </v-table-head>
          <v-table-body>
            <v-table-row v-for="(monitor) in monitors" :key="`${monitor.name}-row`">
              <v-table-td>
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-gray-900">
                      {{ monitor.url }}
                    </div>
                  </div>
                </div>
              </v-table-td>
              <v-table-td> {{ monitor.uptime_check_enabled }}</v-table-td>
              <v-table-td> {{ monitor.certificate_check_enabled }}</v-table-td>
              <v-table-td>
                   <span
                       :class="{
                          'bg-green-100 text-green-800': monitor.uptime_status === 'up',
                          'bg-red-100 text-red-800': monitor.uptime_status === 'down',
                          'bg-gray-100 text-gray-800': monitor.uptime_status === 'not yet checked'
                        }"
                       class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                       {{ monitor.uptime_status }}
                    </span>
              </v-table-td>
              <v-table-td>
                <div class="flex flex-col-2 justify-around">

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

import {
  VTable,
  VTableHead,
  VTableBody,
  VTableTd,
  VTableRow,
  VTableTh
} from '@/components/table'
import RelateResources from '@/components/interaction/resources/RelateResources'

export default {
  components: {
    RelateResources,
    DeleteResource,
    CreateResource,
    EditResource,
    VTable,
    VTableHead,
    VTableBody,
    VTableTd,
    VTableRow,
    VTableTh
  },
  setup () {
    const monitorResource = useResource('monitors')
    const channelResource = useResource('channels')

    const monitors = ref([])
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
            form.inputs.push(
                toggleTemplate(
                    `${channel.type}: ${channel.description}`,
                    `id[${channel.id}]`,
                    channelActive.length > 0
                )
            )
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