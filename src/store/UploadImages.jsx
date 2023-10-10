import { create } from "zustand";

export const DataImageUser = create((set) => ({
  BaseConocimiento: [],
  BaseIdConocimiento: [],
  ImageScreen: [],
  AddBaseConocimiento: (value) =>
    set(() => ({
      BaseConocimiento: [value, ...DataImageUser.getState().BaseConocimiento],
    })),
  AddImageScreen: (value) =>
    set(() => ({
      ImageScreen: [value, ...DataImageUser.getState().ImageScreen],
    })),
  DeleteImageScreen: () =>
    set(() => ({
      ImageScreen: [],
    })),
  DeleteUnicImage: (index) =>
    set(() => ({
      ImageScreen: DataImageUser.getState().ImageScreen.filter(
        (_, i) => i !== index
      ),
    })),
  DeleteBaseCon: () =>
    set(() => ({
      BaseConocimiento: [],
    })),
  DeleteUnic: (index) =>
    set(() => ({
      BaseConocimiento: DataImageUser.getState().BaseConocimiento.filter(
        (_, i) => i !== index
      ),
    })),
  AddApi: (value) =>
    set(() => ({
      BaseIdConocimiento: value,
    })),
  DeleteIdImage: (index) =>
    set(() => ({
      BaseIdConocimiento: DataImageUser.getState().BaseConocimiento.filter(
        (_, i) => i !== index
      ),
    })),
  DeleteBaseUd: () =>
    set(() => ({
      BaseIdConocimiento: [],
    })),
}));
