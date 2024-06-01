import { create } from "zustand";

const useDataDevice = create((set) => ({
  dataDevice: null,
  AddDataDevice: (data) => set({ dataDevice: data }),
}));

export { useDataDevice };
