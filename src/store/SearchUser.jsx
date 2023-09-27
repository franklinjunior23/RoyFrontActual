import { create } from "zustand";

export const SearchUser = create((set) => ({
  SearchBaseConocimiento: "",
  BaseConocimiento: [],
  AddBaseConocimiento: (value) =>
    set(() => ({
      BaseConocimiento: value,
    })),
}));
