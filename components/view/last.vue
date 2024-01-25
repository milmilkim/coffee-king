<template>
  <img :src="cake" />

  <p class="text-white w-full text-center">
    Thank you for playing <br />
    <button @click="removeMemory" class="bg-black m-2 p-2">
      기억을 지우기
    </button>
  </p>
</template>

<script setup lang="ts">
import cake from '~/assets/images/cake.png';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();
const removeMemory = () => {
  store.removeStep();
};
</script>
