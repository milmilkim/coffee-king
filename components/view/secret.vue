<template>
  <div>
    <h3 class="m-3 text-white text-2xl">환영합니다.</h3>
    <p class="m-3 text-white">여정을 시작하기 위해 자격을 증명하세요.</p>
    <input
      v-model="email"
      class="m-3 p-3"
      type="email"
      placeholder="이메일을 입력하세요." />
    <button
      :disabled="isLoading"
      @click.prevent="submit"
      class="bg-gray-100 p-3">
      전송
    </button>

    <input
      v-model="password"
      class="m-3 p-3"
      type="text"
      placeholder="비밀번호를 입력하세요." />
    <button @click.prevent="onSubmitPassword" class="bg-gray-100 p-3">
      전송
    </button>

    <p class="m3 text-red-100">
      * 모든 진행사항은 브라우저에 저장됩니다. <br />
      * HINT: ****64
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useMainStore } from '~/stores/mainStore';

const store = useMainStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const submit = async () => {
  if (!email.value.trim()) {
    alert('이메일을 입력하세요');
    return;
  }
  try {
    isLoading.value = true;
    await axios.post('/api/mail', {
      to: email.value,
      text: 'UEFTU1dPUkQ6IFNUQVJCVUNLUwpORVhUOiDtg4TroKUv7Iuc6rCBL+yLoOyaqQpISU5UOiBXM1c=',
    });
    alert('전송 완료.');
    isLoading.value = false;
  } catch (err) {
    alert('전송 실패! 다시 시도하세요.');
  }
};

const onSubmitPassword = () => {
  if (password.value === 'STARBUCKS') {
    store.setStep(1);

  } else {
    alert('-_-?');
  }
};
</script>
