import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMeetingStore = create(
  persist(
    (set) => ({
      meetings: [],
      addMeeting: (meeting) =>
        set((state) => ({
          meetings: [...state.meetings, { ...meeting, id: Date.now() }],
        })),
      updateMeeting: (id, updatedData) =>
        set((state) => ({
          meetings: state.meetings.map((m) =>
            m.id === id ? { ...m, ...updatedData } : m
          ),
        })),
      deleteMeeting: (id) =>
        set((state) => ({
          meetings: state.meetings.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'meeting-storage', // unique name for localStorage
    }
  )
);
