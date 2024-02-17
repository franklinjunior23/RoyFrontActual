import { useForm } from "react-hook-form";
import { CategoryInventaio, FormDisp } from "@Data/DataDefault";
import PcLapForm from "./Components/PcLapForm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@Services/ConfigApi";
import RedFrom from "./Components/RedFrom";
import ImpresForm from "./Components/ImpresForm";
import { Suspense, useEffect } from "react";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF_PC from "@Components/pdf/Pc/PDF_PC";
import Input from "@Components/Input/Input/Input";
import InputSelect from "@Components/Input/Select/Select";

function CreateDisp() {
  const { nombreE, sucursalN, idDisp } = useParams();

  const { setValue, getValues, handleSubmit, register, watch, control } =
    useForm();

  const typeDisp = watch("tipo");

  const navi = useNavigate();
  const queryClien = useQueryClient();
  if (idDisp !== undefined && idDisp !== "create") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var { data } = useQuery({
      queryKey: ["DispById"],
      queryFn: async () => {
        const resp = await axiosInstance.get(`Dispositivos/${idDisp}`);
        return resp.data;
      },
    });
  }
  useEffect(() => {
    if (data) {
      setValue("IdUser", data?.data?.User?.id);
      setValue("FormUser", data?.data?.User !== null ? true : false);
      FormDisp.forEach((param) => {
        if ((data?.data && data?.data[param] !== null) || undefined) {
          setValue(param, data.data[param]);
          if (data?.data[param] == undefined) {
            setValue(param, data?.data?.DetalleDispositivos[0][param]);
            if (param == "Almacenamiento" || param == "Ram_Modulos") {
              setValue(
                "Almacenamiento",
                data?.data?.DetalleDispositivos[0]["Almacenamiento_detalle"]
              );
              setValue(
                "Ram_Modulos",
                data?.data?.DetalleDispositivos[0]["Ram_Modulos"]
              );
              setValue(
                "Tarjeta_Video",
                data?.data?.DetalleDispositivos[0]["Tarjeta_Video"]
              );
            }
          }
        }
      });
    }
  }, [data, setValue]);

  const Options_Dispositivo = [
    {
      label: "Editar",
      Function: () => {
        console.log("Editar");
      },
    },
    {
      label: "Elimar",
      Function: () => {
        console.log("Eliminar");
      },
    },
  ];
  const Options_Downloads = () => {
    return (
      <PDFDownloadLink
        fileName={`${data?.data?.nombre}&${data?.data?.tipo ?? "Disp"}`}
        document={<PDF_PC data={data} />}
      >
        Reporte PDF
      </PDFDownloadLink>
    );
  };

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
      toast.success("Dispositivo Actualizado");
      navi(-1);
      return queryClien.invalidateQueries({ queryKey: ["GetDisp"] });
    },
  });
  const HandleSubt = async (datos) => {
    if (data == undefined) return MutateCreate(datos);
    return UpdateDisp(datos);
  };
  return (
    <main className=" pb-8">
      {data && (
        <header className="py-2 flex justify-end">
          <ButtomDots
            Options={Options_Dispositivo}
            OptionDownload={Options_Downloads}
          />
        </header>
      )}
      <Suspense key={data?.data?.id} fallback={() => <h2>Cargando ....</h2>}>
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
              <Input
                label="Codigo"
                register={register}
                name="codigo_dispositivo"
              />
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
            <button
              type="submit"
              className="bg-black/90 rounded-md py-3 text-white"
            >
              {data ? "Actualizar" : "Crear"}
            </button>
            <button
              type="button"
              className="bg-black/40 rounded-md py-3 text-white"
              onClick={() => navi(-1)}
            >
              Cancelar
            </button>
          </article>
        </form>
      </Suspense>
    </main>
  );
}

export default CreateDisp;
