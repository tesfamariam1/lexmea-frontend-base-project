<script setup>
import {computed, ref} from 'vue';
import RoomList from './components/RoomList.vue';
import GuestList from './components/GuestList.vue';

const currentView = ref('RoomList');

const currentViewComponent = computed(() => {
  return currentView.value === 'RoomList' ? RoomList : GuestList;
});

const showRooms = () => {
  currentView.value = 'RoomList';
};

const showGuests = () => {
  currentView.value = 'GuestList';
};
</script>

<template>
  <div class="flex gap-12">
    <button @click="showRooms" class="hover:underline">Rooms</button>
    <button @click="showGuests" class="hover:underline">Guests</button>
  </div>
  <main class="flex-grow p-8">
    <component :is="currentViewComponent" />
  </main>
</template>
