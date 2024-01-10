import { useSearchParams } from "react-router-dom";
import { create } from "zustand";

export const UseSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  return {
    searchParams,
    setSearchParams,
  };
};
export const StateUsers = create((set) => ({
  SearchUser: "",
  setSearchUser: (newValue) => set({ searchUser: newValue }),
}));
