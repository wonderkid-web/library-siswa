import { create } from "zustand";

export const useProfilePicture = create((set) => ({
    profile: "default_profile",
    updateProfile: (newProfile) => set(() => ({ profile: newProfile })),
  }));
