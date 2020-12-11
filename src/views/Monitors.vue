<template>
  <div>
    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div>
            <router-link to="/monitors/create">
              <div class="rounded-md py-4 px-4">
                <button class="px-6 py-3 bg-green-600 rounded-md text-white font-medium hover:bg-green-500">
                  Create Monitor
                </button>
              </div>
            </router-link>
          </div>
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Uptime Check Enabled
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  SSL Check Enabled
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" >
                  Uptime Status
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
              </tr>
              </thead>

              <tbody class="bg-white">
              <tr v-for="(u, index) in monitors" :key="index">
                <td  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ u.raw_url }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">
                    {{ u.uptime_check_enabled }}
                  </div>
                </td>


                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                  {{ u.certificate_check_enabled }}
                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span :class="{'bg-green-100 text-green-800' : u.uptime_status === 'up', 'bg-red-100 text-red-800': u.uptime_status === 'down'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                        {{ u.uptime_status }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import {ref} from 'vue'
export default {
  setup () {
    const resource = useResource('monitors')
    const monitors = ref([])
    resource.index().then((response) => {
      monitors.value = response.data.data
    })
    return {
      monitors
    }
  },
}
</script>