<template>
  <div>
    <h1 class="text-4xl text-blue-300 mb-4">Rooms</h1>
    <button @click="showAddRoomModal" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mb-6">Add new room</button>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white text-gray-900 p-4 rounded shadow" v-for="room in rooms" :key="room.id">
        <h2 class="text-2xl">Room #{{ room.room_number }}</h2>
        <p>Capacity: {{ room.capacity }}</p>
        <p>Status: {{ room.status }}</p>
        <p v-if="room.guest">Guest: {{ room.guest.full_name }}</p>
        <button v-if="room.status === 'READY'" @click="showAssignGuestModal(room.id)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Assign Guest</button>
        <button v-if="room.status === 'MAINTENANCE'" @click="setReady(room.id)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Set as Ready</button>
        <button v-if="room.status === 'TAKEN'" @click="emptyRoom(room.id)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Room Empty</button>
<!--        TODO Deleting and Editing Room -->
<!--        <button @click="editRoom(room)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Edit</button>-->
<!--        <button @click="deleteRoom(room.id)" class="bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Delete</button>-->
      </div>
    </div>
    <RoomModal v-if="isRoomModalVisible" @close="isRoomModalVisible = false" @save="handleSaveRoom" :room="currentRoom" />
    <AssignGuestModal v-if="isAssignGuestModalVisible" @close="isAssignGuestModalVisible = false" @save="handleAssignGuest" :roomId="selectedRoomId" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useRooms, useAddRoom, useUpdateRoom, useDeleteRoom, useSetRoomReady, useEmptyRoom} from '../hooks/useRooms';
import RoomModal from './RoomModal.vue';
import AssignGuestModal from './AssignGuestModal.vue';

const { data: rooms, isLoading, error } = useRooms();
const addRoomMutation = useAddRoom();
const updateRoomMutation = useUpdateRoom();
const deleteRoomMutation = useDeleteRoom();
const setRoomReadyMutation = useSetRoomReady();
const emptyRoomMutation = useEmptyRoom();

const isRoomModalVisible = ref(false);
const isAssignGuestModalVisible = ref(false);
const currentRoom = ref(null);
const selectedRoomId = ref(null);

const showAddRoomModal = () => {
  currentRoom.value = null;
  isRoomModalVisible.value = true;
};

const showAssignGuestModal = (roomId) => {
  selectedRoomId.value = roomId;
  isAssignGuestModalVisible.value = true;
};

const editRoom = (room) => {
  currentRoom.value = room;
  isRoomModalVisible.value = true;
};

const deleteRoom = (roomId) => {
  deleteRoomMutation.mutate(roomId);
};

const handleSaveRoom = (room) => {
  if (room.id) {
    updateRoomMutation.mutate(room);
  } else {
    addRoomMutation.mutate(room);
  }
  isRoomModalVisible.value = false;
};

const setReady = (roomId) => {
  setRoomReadyMutation.mutate(roomId);
};

const emptyRoom = (roomId) => {
  emptyRoomMutation.mutate(roomId);
};
</script>
