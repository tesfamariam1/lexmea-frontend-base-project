import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const fetchRooms = async () => {
    const response = await fetch(`${API_BASE_URL}/api/rooms`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const addRoom = async (room: { floor_number: number; room_number: number; capacity: number; status: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
const assignGuestToRoom = async ({ roomId, guestId }: { roomId: number; guestId: number }) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}/assign-guest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guest_id: guestId }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
const emptyRoom = async (roomId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}/deassign-guest`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
const updateRoom = async (room: { id: number; floor_number: number; room_number: number; capacity: number; status: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${room.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(room),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const deleteRoom = async (roomId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const setRoomReady = async (roomId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/rooms/${roomId}/set-ready`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
export const useAssignGuestToRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(assignGuestToRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};
export const useEmptyRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(emptyRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};
export const useRooms = () => {
    return useQuery(['rooms'], fetchRooms);
};

export const useAddRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(addRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};

export const useUpdateRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(updateRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};

export const useDeleteRoom = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRoom, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};

export const useSetRoomReady = () => {
    const queryClient = useQueryClient();
    return useMutation(setRoomReady, {
        onSuccess: () => {
            queryClient.invalidateQueries(['rooms']);
        },
    });
};
