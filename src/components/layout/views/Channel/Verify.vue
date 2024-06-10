<script setup>
import { computed, onMounted, ref } from 'vue';

import Logo from '@/components/svg/Logo.vue';
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';

const route = useRoute();

const encryptedId = computed(() => route.params.id);
const expires = computed(() => route.query.expires);
const signature = computed(() => route.query.signature);

const showSpinner = ref(true);
const showSuccess = ref(false);
const showFailure = ref(false);

const verifyChannel = async () => {
  try {
    await ApiService.get(`api/channel/verify/${encryptedId.value}`, {
      params: {
        expires: expires.value,
        signature: signature.value
      },
    });

    showSuccess.value = true;
  } catch (e) {
    showFailure.value = true;
  } finally {
    showSpinner.value = false;
  }
};

onMounted(() => {
  verifyChannel();
});

</script>

<template>
  <div class="flex justify-center items-center h-full px-6">
    <div class="p-6 max-w-md w-full bg-white shadow-md rounded-md">
      <div class="flex justify-center items-center">
        <logo></logo>
        <span class="text-gray-700 font-semibold text-2xl">Uptime</span>
      </div>

      <div class="prose pt-5">
        <p v-if="!showFailure && !showSuccess">
          Verifying channel...
        </p>

        <p v-if="showSuccess">
          Your channel has been verified. It can now receive notifications.
        </p>

        <p v-if="showFailure">
          There was an error verifying your channel.
        </p>
      </div>

      <div class="flex justify-between items-center mt-4">
        <router-link to="/dashboard">
          <a class="block text-sm fontme text-blue-400 hover:underline" href="#">Return to Dashboard</a>
        </router-link>
      </div>

      <spinner v-if="showSpinner"></spinner>
    </div>
  </div>
</template>

<style scoped>

</style>