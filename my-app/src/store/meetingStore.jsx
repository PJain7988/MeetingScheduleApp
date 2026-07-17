import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMeetingStore = create(
  persist(
    (set) => ({
      meetings: [],
      userProfile: {
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: 'sarah.jenkins@example.com',
        bio: 'Product Manager focused on building excellent user experiences.',
        avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=e0e7ff&color=4338ca&size=80'
      },
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
      updateProfile: (profileData) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profileData }
        })),
    }),
    {
      name: 'meeting-storage', // unique name for localStorage
    }
  )
);
