<template>
  <div class="text-4xl w-full text-center mt-3 text-white">COFFEE KING</div>
  <div class="flex items-center justify-center mt-10">
    <div
      class="w-32 h-32 bg-white rounded-2xl cursor-pointer"
      @click="onClickScanner">
      <img :src="image" alt="QR 스캔 아이콘" />
    </div>
  </div>
  <div class="flex items-center justify-center mt-10">
    <div class="w-12 h-12" @click="onClickScanner">
      <img :src="coffeebean" alt="원두아이콘" />
    </div>

    <p class="ml-3 text-white">
      {{ store.currentStep }}/5 <br />
      전설의 커피콩을 모두 모아 여정을 완료하세요.
    </p>
  </div>
  <Scanner v-if="isShowScannerModal" @scan="scanQr" @close="close" />
</template>

<script setup lang="ts">
import image from '~/assets/images/scanner.png';
import coffeebean from '~/assets/images/coffee-beans.png';

import Scanner from '~/components/scanner.vue';
import axios from 'axios';

const isShowScannerModal = ref(false);
const store = useMainStore();
const onClickScanner = () => {
  isShowScannerModal.value = true;
};

const scanQr = (value: string) => {
  checkCoffee(value);
  close();
};

const checkCoffee = async (token: string) => {
  try {
    const { data } = await axios.post('/api/verify', { token });
    console.log(data);
  } catch (err) {
    alert('잘못된 QR');
  }
};

const close = () => {
  isShowScannerModal.value = false;
};

onMounted(() => {
  console.log('token');
  axios.post('/api/token', {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MDYxOTk3NDUsImV4cCI6MTczNzczNTcyNCwiYXVkIjoiIiwic3ViIjoiIiwiQ09GRkVFIjoiU0VDT05EIn0.Nhpv9ZVUpVsdXFwxW2IRk1d0bfcUYTNv_VvFG6PqJs4',
  });
});
</script>
