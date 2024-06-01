import { Link, useParams } from "react-router-dom";
import TruncateText from "@/utils/TruncateTeaxt";
import { findChanges, generateSummary } from "./utils/compare-objects";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import PageCreateDevice from "@/page/inventory/device/create-device";

function CreateDisp() {
  const { idDisp } = useParams();

  const HandleSubt = async (datos) => {
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
    const updatedData = {
      ...datos,
      isHistoryDevice: DataHistory,
      dataHistory: fields,
    };
  };

  return (
    <>
      <main className="pb-8 grid gap-4 md:grid-cols-[1fr_minmax(360px,350px)] relative">
        <PageCreateDevice />
        <HistoryDevice />
      </main>
    </>
  );
}

export default CreateDisp;

function HistoryDevice({ data }) {
  return (
    <aside className="bg-black flex flex-col p-4 rounded-xl sticky top-0  min-h-[300px] max-h-[800px]">
      <h3 className="text-center text-xl font-semibold my-3 text-white">
        Historial
      </h3>
      <main className="max-h-[400px] min-h-[350px] overflow-x-clip overflow-y-auto CustomScroll">
        <main className=" flex flex-col flex-wrap gap-y-3 mr-2 ">
          {data?.data?.historial?.map((value, index) => (
            <ItemHistory key={index} {...value} />
          )) ?? <h2>No hay historial</h2>}
          {data?.data?.historial?.length === 0 && <h2>No hay historial</h2>}
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
  );
}

function ItemHistory({ action, createdAt }) {
  return (
    <section className="bg-white/50 p-3 w-full  text-white rounded-xl">
      <header className="flex justify-between items-center">
        <h4 className="my-1 font-semibold capitalize">
          {TimeFromPeruvian(createdAt)}
        </h4>{" "}
        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-black">
          Modified
        </span>
      </header>
      <p className="text-sm  break-all  ">
        <TruncateText
          text={generateSummary(action)}
          maxLength={90}
          ComponentNext={() => <></>}
        />
      </p>

      <ul className="flex flex-wrap gap-1.5 text-sm mt-2">
        {action?.map((value, index) => (
          <LabelCategory key={index} title={value?.field} />
        )) ?? <h2></h2>}
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
