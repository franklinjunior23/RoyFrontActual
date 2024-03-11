import { useForm } from "react-hook-form";
import { CategoryInventaio, FormDisp } from "@Data/DataDefault";
import PcLapForm from "./Components/PcLapForm";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@Services/ConfigApi";
import RedFrom from "./Components/RedFrom";
import ImpresForm from "./Components/ImpresForm";
import { Suspense, useEffect, useState } from "react";
import ButtomDots from "@Components/Buttons/Buttom/ButtomDots";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF_PC from "@Components/pdf/Pc/PDF_PC";
import Input from "@Components/Input/Input/Input";
import InputSelect from "@Components/Input/Select/Select";
import TruncateText from "@/utils/TruncateTeaxt";
import UpdateDevice from "./Components/Modal-update-device";
import { findChanges, generateSummary } from "./utils/compare-objects";
import { FieldsUpdate } from "./context/fields-update";
import { TimeFromPeruvian } from "@/utils/FechaConvert";

function CreateDisp() {
  const { nombreE, sucursalN, idDisp } = useParams();
  const [DataHistory, setDataHistory] = useState(false);
  const [ValidateForm, setValidateForm] = useState(false);
  const { setValue, getValues, handleSubmit, register, watch, control } =
    useForm();
  const { AddFields, fields, RemoveFields } = FieldsUpdate();

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
      FormDisp?.forEach((param) => {
        if (data.data[param] !== undefined) {
          setValue(param, data.data[param]);
        } else if (
          data.data.DetalleDispositivo &&
          data.data.DetalleDispositivo[param] !== undefined
        ) {
          setValue(
            "Almacenamiento_detalle",
            data?.data?.DetalleDispositivo?.Almacenamiento_detalle
          );
          setValue(param, data?.data?.DetalleDispositivo[param]);
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
        "IdArea"
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
    <>
      {/** Section for Modal Update  */}

      <main className=" pb-8 grid gap-4 md:grid-cols-[1fr_minmax(360px,350px)]">
        <Suspense key={data?.data?.id} fallback={() => <h2>Cargando ....</h2>}>
          <div>
            {data && (
              <header className="py-2 flex justify-end">
                <ButtomDots
                  Options={Options_Dispositivo}
                  OptionDownload={Options_Downloads}
                />
              </header>
            )}
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
          </div>
        </Suspense>
        <aside className="bg-black flex flex-col p-4 rounded-xl max-h-fit min-h-[300px]">
          <h3 className="text-center text-xl font-semibold my-3 text-white">
            Historial
          </h3>
          <main className="max-h-[400px] min-h-[350px] overflow-x-clip overflow-y-auto CustomScroll">
            <main className=" flex flex-col flex-wrap gap-y-3 mr-2 ">
              {data?.data?.historial?.map((value, index) => (
                <ItemHistory key={index} {...value} />
              )) ?? <h2>No hay historial</h2>}
              {
                data?.data?.historial?.length === 0 && <h2>No hay historial</h2>
              }
            </main>
          </main>
          <footer className=" mt-auto">
            <button
              type="button"
              className="w-full  bg-white/20 text-white  px-3 py-2 font-medium rounded-lg "
            >
              <Link to={"historial"}>Ver Historial Completo</Link>
            </button>
          </footer>
        </aside>
      </main>
    </>
  );
}

export default CreateDisp;

function ItemHistory({ action, createdAt }) {
  return (
    <section className="bg-white/50 p-3 w-full  text-white rounded-xl">
      <header className="flex justify-between items-center"><h4 className="my-1 font-semibold capitalize">
        {TimeFromPeruvian(createdAt)}
      </h4> <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-black">Modified</span></header>
      <p className="text-sm  break-all  ">
        <TruncateText
          text={generateSummary(action)}
          maxLength={90}
          ComponentNext={() => <></>}
        />
      </p>
      
      <ul className="flex flex-wrap gap-1.5 text-sm mt-2">
        {
          action?.map((value, index) => (
            <LabelCategory key={index} title={value?.field} />
          )) ?? <h2></h2>
        }
      </ul>
    </section>
  );
}
function LabelCategory({ title }) {
  return (
    <li className="bg-blue-600 font-semibold  text-xs px-1.5 rounded-md py-0.5">
      {title}
    </li>
  );
}
