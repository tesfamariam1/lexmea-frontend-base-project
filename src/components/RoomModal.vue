<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl mb-4">{{ room?.id ? 'Edit Room' : 'Add Room' }}</h2>
      <form @submit.prevent="saveRoom">
        <div class="mb-4">
          <label class="block text-gray-700">Floor Number</label>
          <input v-model="form.floor_number" type="number" class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Room Number</label>
          <input v-model="form.room_number" type="number" class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Capacity</label>
          <input v-model="form.capacity" type="number" class="w-full p-2 border border-gray-300 rounded mt-1" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Status</label>
          <select v-model="form.status" class="w-full p-2 border border-gray-300 rounded mt-1">
            <option value="READY">READY</option>
            <option value="TAKEN">TAKEN</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>
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
  room: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save']);

const form = ref({
  floor_number: 0,
  room_number: 0,
  capacity: 0,
  status: 'READY',
});

watch(
    () => props.room,
    (newRoom) => {
      if (newRoom) {
        form.value = { ...newRoom };
      } else {
        form.value = { floor_number: 0, room_number: 0, capacity: 0, status: 'READY' };
      }
    },
    { immediate: true }
);

const saveRoom = () => {
  emit('save', form.value);
};
</script>
