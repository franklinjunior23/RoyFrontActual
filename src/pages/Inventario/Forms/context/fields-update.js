import { create } from "zustand";

export const FieldsUpdate = create((set) => ({
  fields: [],
  AddFields: (value) =>
    set(() => ({
      fields: value,
    })),
  RemoveFields: () =>
    set(() => ({
      fields: [],
    })),
}));
