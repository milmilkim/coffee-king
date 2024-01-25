import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', () => {
  const step = useCookie('step');

  const setStep = (newStep: number) => {
    step.value = String(newStep);
  };

  const removeStep = () => {
    step.value = null;
  };

  const currentStep = computed(() => Number(step.value));

  return { setStep, currentStep, removeStep };
});
