<template>
    <Main v-if="store.currentStep"  />
    <secret v-else />
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/mainStore';
import Main from '~/components/view/main.vue';
import Secret from '~/components/view/secret.vue';

const store = useMainStore();
</script>
