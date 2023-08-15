import { Outlet, useParams } from "react-router-dom";
import RetrocederItem from "../../components/Navlinks/components/RetrocederItem";
import { ColorConteners, IconEmpresa } from "../../assets/DataDefault";

import ListSucursales from "../../components/Section/components/ListSucursales";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateSucursalByEmpresa } from "../../services/ApiGets";
import { useState } from "react";
import ModalCreate from "../../components/Modal/ModalCreate";
import HeadSucur from "../../components/Section/components/HeadSucur";

function EmpresaDet() {
  const { nombreE, sucursalN } = useParams();
  const aleatorio = Math.floor(Math.random() * ColorConteners.length);
  const QueryClitn = useQueryClient();

  /* const CreateSuc = useMutation({
    mutationFn: CreateSucursalByEmpresa,
    onSuccess: QueryClitn.invalidateQueries("Sucursales"),
    
  }); */
  return (
    <main>
      <RetrocederItem />
      {sucursalN ? (
        <Outlet />
      ) : (
        <>
          <section className="mt-6">
            <div
              className="w-full px-4 py-4 rounded-lg flex justify-center items-center gap-4 text-2xl font-bold text-white"
              style={{ background: ColorConteners[aleatorio]?.name }}
            >
              {nombreE} <IconEmpresa />
            </div>
          </section>
          <section className="">
            <HeadSucur />
          </section>
          <section>
            <ListSucursales empresa={nombreE} />
          </section>
        </>
      )}
    </main>
  );
}
export default EmpresaDet;
