<template>
  <div>
    <div class="mt-8">

      <div class="container prose-xl">
        <p>
          <create-resource
              @resource:created="pollResources"
              header="Create Channel"
              resource-name="channels"
              :resource-form="channelForm">
          </create-resource>
          an integrations to alert you when a disaster strikes
        </p>
      </div>

      <div class="flex flex-wrap mt-6" v-if="channels.length">
        <basic-card v-for="channel in channels"
                    :key="channel.id"
                    :header="channel.type"
                    :icon="channelTypeToIconComponent[channel.type] ?? Bell"
                    :description="channel.description">

          <template v-slot:header>
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
                :resource-form="channelForm"
                :resource="channel">
            </delete-resource>
          </template>

        </basic-card>
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
import { Mail, Bell } from 'heroicons/vue/outline'
import { ref } from 'vue'

const channelTypeToIconComponent = {
  'mail': Mail,
  'discord': Discord,
  'slack': Slack,
}

export default {
  components: {
    CreateResource,
    DeleteResource,
    EditResource,
    BasicCard,
  },
  setup () {
    const resource = useResource('channels')
    const channels = ref([])

    const pollResources = () => {
      resource.index().then((response) => {
        channels.value = response.data.data
      })
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