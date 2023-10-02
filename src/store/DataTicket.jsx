import { create } from "zustand";

export const DataTicket= create((set)=>({
    DataTicket:[],
    DataEmpresas:[],
    AddDataEmpresa:(value)=>set(()=>({
        DataEmpresas:value
    }))
}))