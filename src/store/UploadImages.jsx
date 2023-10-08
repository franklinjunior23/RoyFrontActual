import { create } from "zustand";

export const DataImageUser = create((set) => ({
  BaseConocimiento: [],
  BaseIdConocimiento: [],
  AddBaseConocimiento: (value) =>
    set(() => ({
      BaseConocimiento: [value, ...DataImageUser.getState().BaseConocimiento],
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
}));
