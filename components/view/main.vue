<template>
  <div class="text-4xl w-full text-center mt-3 text-white">COFFEE KING</div>
  <div class="flex items-center justify-center mt-10">
    <div
      class="w-32 h-32 bg-white rounded-2xl cursor-pointer"
      v-if="!isCompleted"
      @click="onClickScanner">
      <img :src="image" alt="QR 스캔 아이콘" />
    </div>
    <div v-else class="w-32 h-32 cursor-pointer" @click="onClickKey">
      <img :src="key" alt="열쇠 아이콘" />
    </div>
  </div>
  <div class="flex items-center justify-center mt-10">
    <div class="w-12 h-12" @click="onClickScanner">
      <img :src="coffeebean" alt="원두아이콘" />
    </div>

    <p class="ml-3 text-white">
      {{ store.currentStep }}/5 <br />
      <template v-if="!isCompleted">
        전설의 커피콩을 모두 모아 여정을 완료하세요.
      </template>
      <template v-else
        >모든 커피콩을 손에 넣었습니다! 열쇠를 변환하여 입력하세요.</template
      >

      <input
        v-model="lastKey"
        class="m-3 p-3 text-black"
        type="text"
        placeholder="비밀번호를 입력하세요." />
      <button @click.prevent="onSubmitLastKey" class="bg-gray-100 p-3 text-black">
        전송
      </button>
    </p>
  </div>
  <Scanner v-if="isShowScannerModal" @scan="scanQr" @close="close" />
</template>

<script setup lang="ts">
import image from '~/assets/images/scanner.png';
import coffeebean from '~/assets/images/coffee-beans.png';
import key from '~/assets/images/key.png';

import Scanner from '~/components/scanner.vue';
import axios from 'axios';

const lastKey = ref('');
const isCompleted = computed(() => store.currentStep >= 5);
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

    const coffee = data.data.coffee;

    if (store.currentStep === 1 && coffee === 'second') {
      store.setStep(2);
    } else if (store.currentStep === 2 && coffee === 'third') {
      store.setStep(3);
    } else if (store.currentStep === 3 && coffee === 'fourth') {
      store.setStep(4);
    } else if (store.currentStep === 4 && coffee === 'fifth') {
      store.setStep(5);
    } else {
      alert('잘못된 순서!');
    }
  } catch (err) {
    alert('잘못된 QR');
  }
};

const onClickKey = () => {
  alert('EPISODE');
};

const onSubmitLastKey = () => {
  if (
    lastKey.value.toUpperCase() === '9F8EFB645554E3BB6022C9019BA2360904A6BAFF'
  ) {
    store.setStep(6);
  } else {
    alert('-_-!');
    lastKey.value = '';
  }
};

const close = () => {
  isShowScannerModal.value = false;
};
</script>
