import { create } from "zustand";

export const DataListDashboard= create((set)=>({
    DataList:[],
    AddDataList:(value)=>set(()=>({
        DataList:value
    }))
}))