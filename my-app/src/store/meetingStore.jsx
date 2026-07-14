import { create } from 'zustand';

export const useMeetingStore = create((set) => ({
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
}));
