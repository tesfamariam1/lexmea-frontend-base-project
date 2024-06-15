import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const fetchGuests = async () => {
    const response = await fetch(`${API_BASE_URL}/api/guests`);
    if (!response.ok) {
        throw new Error('Network happened');
    }
    return response.json();
};

const addGuest = async (guest: { full_name: string; age: number }) => {
    const response = await fetch(`${API_BASE_URL}/api/guests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guest),
    });
    if (!response.ok) {
        throw new Error('Network happened');
    }
    return response.json();
};

const updateGuest = async (guest: { id: number; full_name: string; age: number }) => {
    const response = await fetch(`${API_BASE_URL}/api/guests/${guest.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guest),
    });
    if (!response.ok) {
        throw new Error('Network happened');
    }
    return response.json();
};

const deleteGuest = async (guestId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/guests/${guestId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network happened');
    }
    return response.status === 204 ? {} : response.json();
};

export const useGuests = () => {
    return useQuery(['guests'], fetchGuests);
};

export const useAddGuest = () => {
    const queryClient = useQueryClient();
    return useMutation(addGuest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['guests']);
        },
    });
};

export const useUpdateGuest = () => {
    const queryClient = useQueryClient();
    return useMutation(updateGuest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['guests']);
        },
    });
};

export const useDeleteGuest = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteGuest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['guests']);
        },
    });
};
