<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-2xl mb-4">Assign Guest</h2>
      <form @submit.prevent="assignGuest">
        <div class="mb-4">
          <label class="block text-gray-700">Select Guest</label>
          <select v-model="selectedGuestId" class="w-full p-2 border border-gray-300 rounded mt-1">
            <option v-for="guest in guests" :key="guest.id" :value="guest.id">{{ guest.full_name }}</option>
          </select>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="$emit('close')" class="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
          <button type="submit" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded">Assign</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGuests } from '../hooks/useGuests';
import { useAssignGuestToRoom } from '../hooks/useRooms';

const props = defineProps({
  roomId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const { data: guests, isLoading, error } = useGuests();
const assignGuestMutation = useAssignGuestToRoom();

const selectedGuestId = ref(null);

const assignGuest = () => {
  if (selectedGuestId.value) {
    assignGuestMutation.mutate({ roomId: props.roomId, guestId: selectedGuestId.value });
    emit('save', selectedGuestId.value);
    emit('close');
  }
};
</script>

<style>
</style>
