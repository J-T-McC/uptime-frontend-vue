<template>
  <div>
    <div class="mt-3 lg:mt-8 relative">

      <div class="container prose-xl lg:p-0 p-3">
        <p>
          <create-resource
              @resource:created="pollResources"
              header="Create Channel"
              resource-name="channels"
              :resource-form="channelForm">
            Add
          </create-resource>
          notification channels to alert you when something blows up
        </p>
      </div>

      <div class="flex flex-wrap mt-2 lg:mt-6 pl-3 pr-3 lg:p-0">
        <div class="h-56" v-if="!channels">
          <spinner></spinner>
        </div>

        <template v-if="channels && channels.length">
          <basic-card
              class="lg:w-1/2 xl:w-1/3 mb-2 mt-2 sh"
              v-for="channel in channels"
              :key="channel.id"
              :title="channel.type"
              :icon="channelTypeToIconComponent[channel.type] ?? Bell"
              :description="channel.description">

            <template v-slot:header>
              <div class="flex">
                <edit-resource
                    @resource:updated="pollResources"
                    header="Edit Channel"
                    resource-name="channels"
                    :resource-form="channelForm"
                    :resource="channel">
                </edit-resource>

                <delete-resource
                    @resource:deleted="pollResources"
                    header="Delete Channel"
                    resource-name="channels"
                    :resource="channel">
                </delete-resource>
              </div>
            </template>

          </basic-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import useResource from '@/hooks/useResource'
import BasicCard from '@/components/card/BasicCard'
import CreateResource from '@/components/interaction/resources/CreateResource'
import EditResource from '@/components/interaction/resources/EditResource'
import DeleteResource from '@/components/interaction/resources/DeleteResource'

import { channelForm } from '@/helpers/forms'
import { Discord, Slack } from '@/components/svg'
import { Mail, Bell } from 'heroicons/vue/solid'
import { ref } from 'vue'
import { toastMessage } from '@/helpers/toast'
import Spinner from '@/components/Spinner'

const channelTypeToIconComponent = {
  'mail': Mail,
  'discord': Discord,
  'slack': Slack,
}

export default {
  components: {
    Spinner,
    CreateResource,
    DeleteResource,
    EditResource,
    BasicCard,
  },
  setup () {
    const resource = useResource('channels')
    const channels = ref(null)

    const pollResources = () => {
      resource.index().then((response) => {
        channels.value = response.data.data
      }).catch(toastMessage)
    }

    pollResources()

    const showModal = ref(false)

    return {
      channelTypeToIconComponent,
      channels,
      showModal,
      pollResources,
      channelForm,
      Bell
    }
  },
}
</script>