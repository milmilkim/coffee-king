<template>
    <Main v-if="store.currentStep && store.currentStep < 5"  />
	<Last v-else-if="store.currentStep >= 5" />
    <secret v-if="!store.currentStep"/>
</template>

<script setup lang="ts">
import { useMainStore } from '~/stores/mainStore';
import Main from '~/components/view/main.vue';
import Secret from '~/components/view/secret.vue';
import Last from '~/components/view/last.vue';

const store = useMainStore();
</script>
