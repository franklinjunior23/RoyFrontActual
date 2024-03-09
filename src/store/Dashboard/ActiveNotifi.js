import { create } from "zustand";

export const ToggleActive = create((set) => ({
  StateActive: false,
  ToggleActivation: () => set((state) => ({ StateActive: !state.StateActive })),
}));
