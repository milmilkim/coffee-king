import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', () => {
  const step = useCookie('step');

  const setStep = (newStep: number) => {
    step.value = String(newStep);
  };

  const currentStep = computed(() => Number(step.value));

  return { setStep, currentStep };
});
