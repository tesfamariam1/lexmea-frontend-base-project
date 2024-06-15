<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl mb-4">{{ guest?.id ? 'Edit Guest' : 'Add Guest' }}</h2>
      <form @submit.prevent="saveGuest">
        <div class="mb-4">
          <label class="block text-gray-700">Full Name</label>
          <input v-model="form.full_name" type="text" class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Age</label>
          <input v-model="form.age" type="number" class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
          <button type="submit" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  guest: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  full_name: '',
  age: null,
});

watch(
    () => props.guest,
    (newGuest) => {
      if (newGuest) {
        form.value = { ...newGuest };
      } else {
        form.value = { full_name: '', age: null };
      }
    },
    { immediate: true }
);

const saveGuest = () => {
  emit('save', form.value);
};
</script>

<style>

</style>
