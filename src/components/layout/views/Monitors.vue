<template>
  <div>
    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">

          <v-table v-if="monitors.length">
            <v-table-head>
              <v-table-row>
                <v-table-th>Endpoint</v-table-th>
                <v-table-th>Uptime Check Enabled</v-table-th>
                <v-table-th>SSL Check Enabled</v-table-th>
                <v-table-th>Uptime Status</v-table-th>
                <v-table-th>
                  <div class="flex flex-wrap w-full">
                    <create-monitor @monitor:created="pollResources"></create-monitor>
                  </div>
                </v-table-th>
              </v-table-row>
            </v-table-head>

            <v-table-body>

              <v-table-row v-for="(monitor) in monitors" :key="`${monitor.name}-row`">

                <v-table-td>
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ monitor.raw_url }}
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
                       class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                       {{ monitor.uptime_status }}
                    </span>
                </v-table-td>

                <v-table-td>
                  <div class="flex flex-col-2 justify-around">
                    <edit-monitor @monitor:updated="pollResources" :monitor="monitor"></edit-monitor>
                    <delete-monitor @monitor:deleted="pollResources" :monitor="monitor"></delete-monitor>
                  </div>
                </v-table-td>

              </v-table-row>

            </v-table-body>

          </v-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import { ref } from 'vue'
import CreateMonitor from '@/components/interactions/monitors/CreateMonitor'
import EditMonitor from '@/components/interactions/monitors/EditMonitor'
import DeleteMonitor from '@/components/interactions/monitors/DeleteMonitor'
import {
  VTable,
  VTableHead,
  VTableBody,
  VTableTd,
  VTableRow,
  VTableTh
} from '@/components/table'

export default {
  components: {
    DeleteMonitor,
    EditMonitor,
    CreateMonitor,
    VTable,
    VTableHead,
    VTableBody,
    VTableTd,
    VTableRow,
    VTableTh
  },
  setup () {
    const resource = useResource('monitors')
    const monitors = ref([])

    const pollResources = () => {
      resource.index().then((response) => {
        monitors.value = response.data.data
      })
    }

    pollResources()

    const showModal = ref(false)

    return {
      monitors,
      showModal,
      pollResources
    }
  },
}
</script>