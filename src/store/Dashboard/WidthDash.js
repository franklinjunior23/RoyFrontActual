import { create } from "zustand";

export const useDashboardWidthStore = create((set) => ({
  stateWidth: false,
  toggleWidth: () => set((state) => ({ stateWidth: !state.stateWidth })),
}));
