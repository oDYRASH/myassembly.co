// modelStore.js
import { ref, provide, inject } from 'vue';

const MODEL_KEY = Symbol('model');

export const createModelStore = () => {
  const model = ref(null);
  const setModel = (newModel) => {
    model.value = newModel;
  };

  provide(MODEL_KEY, { model, setModel });
};

export const useModelStore = () => {
  const store = inject(MODEL_KEY);
  if (!store) {
    throw new Error('ModelStore not provided');
  }
  return store;
};