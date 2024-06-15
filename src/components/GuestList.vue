<template>
  <div>
    <div class="flex gap-4">
      <h1 class="text-4xl text-blue-300 mb-4">Guests</h1>
      <button @click="showAddGuestModal" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mb-6">Add new guest</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white text-gray-900 py-4 rounded shadow" v-for="guest in guests" :key="guest.id">
        <h2 class="text-2xl">{{ guest.full_name }}</h2>
        <p v-if="guest.room">Room #{{ guest.room.room_number }}</p>
        <div class="flex gap-4 justify-center">
          <button @click="editGuest(guest)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Edit</button>
          <button @click="deleteGuest(guest.id)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Delete</button>
        </div>
      </div>
    </div>
    <GuestModal v-if="isGuestModalVisible" @close="isGuestModalVisible = false" @save="handleSaveGuest" :guest="currentGuest" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGuests, useAddGuest, useUpdateGuest, useDeleteGuest } from '../hooks/useGuests';
import GuestModal from './GuestModal.vue';

const { data: guests, isLoading, error } = useGuests();
const addGuestMutation = useAddGuest();
const updateGuestMutation = useUpdateGuest();
const deleteGuestMutation = useDeleteGuest();

const isGuestModalVisible = ref(false);
const currentGuest = ref(null);

const showAddGuestModal = () => {
  currentGuest.value = null;
  isGuestModalVisible.value = true;
};

const editGuest = (guest) => {
  currentGuest.value = guest;
  isGuestModalVisible.value = true;
};

const deleteGuest = (guestId) => {
  deleteGuestMutation.mutate(guestId);
};

const handleSaveGuest = (guest) => {
  if (guest.id) {
    updateGuestMutation.mutate(guest);
  } else {
    addGuestMutation.mutate(guest);
  }
  isGuestModalVisible.value = false;
};
</script>
