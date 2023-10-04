import { create } from "zustand";

export const DataImageUser = create((set) => ({
  BaseConocimiento: [],
  AddBaseConocimiento: (value) =>
    set(() => ({
      BaseConocimiento: value,
    })),
}));
