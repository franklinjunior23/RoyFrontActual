import axiosInstance from "@/helpers/config/axios-instance";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldsUpdate } from "@/pages/Inventario/Forms/context/fields-update";
import { useState } from "react";
import { findChanges } from "@/pages/Inventario/Forms/utils/compare-objects";
import Input from "@/pages/Inventario/Users/components/Input";
import InputSelect from "@/pages/Inventario/Users/components/InputSelect";
import { CategoryInventaio } from "@/assets/DataDefault";
import PcLapForm from "@/pages/Inventario/Forms/Components/PcLapForm";
import RedFrom from "@/pages/Inventario/Forms/Components/RedFrom";
import ImpresForm from "@/pages/Inventario/Forms/Components/ImpresForm";
import UpdateDevice from "@/pages/Inventario/Forms/Components/Modal-update-device";
function Hardwareform({ data }) {
  const { nombreE, sucursalN, idDisp } = useParams();
  const [DataHistory, setDataHistory] = useState(false);
  const [ValidateForm, setValidateForm] = useState(false);
  const queryClien = useQueryClient();
  
  const navi = useNavigate();
  const { setValue, getValues, handleSubmit, register, watch, control } =
    useForm();
    const typeDisp = watch("tipo");
  const { AddFields, fields, RemoveFields } = FieldsUpdate();
  const { mutate: MutateCreate } = useMutation({
    mutationFn: async (data) => {
      const resp = await axiosInstance.post(
        `Dispositivos/${nombreE}/${sucursalN}`,
        data
      );
      return resp.data;
    },
    onSuccess: () => {
      queryClien.invalidateQueries({ queryKey: ["GetDisp"] });
      toast.success("Dispositivo creado");
      navi(-1);
    },
  });
  const { mutate: UpdateDisp } = useMutation({
    mutationFn: async (datas) => {
      const resp = await axiosInstance.put(
        `Dispositivos/${data?.data?.id}`,
        datas
      );

      return resp.data;
    },
    onSuccess: () => {
      RemoveFields();
      toast.success("Dispositivo Actualizado");
      navi(-1);
      setDataHistory(false);
      return queryClien.invalidateQueries({ queryKey: ["GetDisp"] });
    },
  });

  const HandleSubt = async (datos) => {
    if (data == undefined) return MutateCreate(datos);

    const device = {
      ...data?.data,
      ...data?.data?.DetalleDispositivo,
      DetalleDispositivo: null,
    };
    AddFields(
      findChanges(device, datos, [
        "createdAt",
        "Agent",
        "IdUser",
        "updatedAt",
        "tipo_con",
        "id",
        "nombre",
        "codigo_dispositivo",
        "historial",
        "Areas",
        "User",
        "IdSucursal",
        "IdDispositivo",
        "DetalleDispositivo",
        "Ram_cantidad",
        "Almacenamiento_canti",
        "tipo_Disp",
        "tipo",
        "serie",
        "marca",
        "modelo",
        "FormArea",
        "FormUser",
        "Tarjeta_Video",
      ])
    );
    setValidateForm(true);
    const updatedData = {
      ...datos,
      isHistoryDevice: DataHistory,
      dataHistory: fields,
    };

    if (ValidateForm) {
      UpdateDisp(updatedData);
    }
  };
  return (
    <form onSubmit={handleSubmit(HandleSubt)}>
      <main className="grid md:grid-cols-4 gap-x-3">
        <section className="grid">
          <Input
            register={register}
            name={"nombre"}
            label="Nombre"
            placeholder={"Nombres .."}
          />
        </section>
        <section className="grid">
          <Input label="Codigo" register={register} name="codigo_dispositivo" />
        </section>
        <section className="grid">
          <InputSelect
            name="tipo"
            label={"Tipo"}
            register={register}
            options={CategoryInventaio}
          />
        </section>

        <div className="grid ">
          <InputSelect
            name="estado"
            label={"Estado"}
            register={register}
            options={[
              { name: "Activo" },
              { name: "Inaperativa" },
              { name: "Malograda" },
            ]}
          />
        </div>
      </main>
      {typeDisp !== "Seleccionar" && (
        <>
          {typeDisp === "Pc" ||
          typeDisp === "Laptop" ||
          typeDisp === "Servidores" ? (
            <PcLapForm
              register={register}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              control={control}
              data={data?.data}
            />
          ) : null}
          {typeDisp === "Red" ? (
            <RedFrom
              register={register}
              watch={watch}
              setValue={setValue}
              control={control}
            />
          ) : null}

          {typeDisp === "Impresora" ? (
            <ImpresForm
              register={register}
              watch={watch}
              setValue={setValue}
              control={control}
            />
          ) : null}
        </>
      )}

      <article className="grid grid-cols-2 mt-5 gap-2">
        {data === undefined ? (
          <button
            className="bg-black/90 rounded-md py-3 text-white"
            type="submit"
          >
            Crear
          </button>
        ) : (
          <UpdateDevice
            setdataHistoryOption={setDataHistory}
            dataHistoryOption={DataHistory}
          />
        )}

        <button
          type="button"
          className="bg-black/40 rounded-md py-3 text-white"
          onClick={() => navi(-1)}
        >
          Cancelar
        </button>
      </article>
    </form>
  );
}

export default Hardwareform;
