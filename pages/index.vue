<template>
  <div class="text-6xl text-white">COFFEE KING</div>
  <div class="flex items-center justify-center mt-10">
    <div
      class="w-32 h-32 bg-white rounded-2xl cursor-pointer"
      @click="onClickScanner">
      <img :src="image" alt="QR 스캔 아이콘" />
    </div>
  </div>
  <Scanner v-if="isShowScannerModal" @scan="scanQr" @close="close" />
</template>

<script setup lang="ts">
import image from '~/assets/images/scanner.png';
import Scanner from '~/components/scanner.vue';

const isShowScannerModal = ref(true);

const onClickScanner = () => {
  isShowScannerModal.value = true;
};

const scanQr = (value: string) => {
  alert(value);
  close();
};

const close = () => {
  isShowScannerModal.value = false;
};
</script>
