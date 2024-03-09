import Switch from "@Components/Buttons/Buttom/Switch";
import { useEffect, useState } from "react";
import { FieldsUpdate } from "../context/fields-update";

export default function UpdateDevice({
  setdataHistoryOption,
  dataHistoryOption,
}) {
  const [Show, setShow] = useState(false);
  const { fields } = FieldsUpdate();

  return (
    <>
      <button
        className="bg-black/90 rounded-md py-3 text-white"
        type="button"
        onClick={() => setShow(!Show)}
      >
        Actualizar
      </button>
      <dialog open={Show} className="modal  dark:text-black bg-black/40 ">
        <div className="modal-box ">
          <h3 className="font-bold mb-6 text-2xl text-center">
            ¿Desea registrar en el historial?
          </h3>

          <section className="mt-3">
            <span>Opción</span>
            <Switch
              onchange={setdataHistoryOption}
              name="isHistory"
              state={dataHistoryOption}
            />
            <main className="mt-5  ">
              {fields.length > 0 ? (
                fields.map((value, index) => (
                  <UpdateViewChanges key={index} {...value} />
                ))
              ) : (
                <h2>No hay cambios</h2>
              )}
            </main>

            <div className="my-6 text-sm">
              <h4 className="font-semibold">Importante:</h4>

              <p className="text-black/60 mt-3">
                Al hacer clic en{" "}
                <span className="mx-1 inline-block font-semibold">Aceptar</span>
                , se creará un historial de cambios para este dispositivo. Esto
                le permitirá realizar un seguimiento detallado de los
                componentes modificados.
              </p>

              <p className="text-red-500 mt-2 font-semibold">
                ¡Recuerde! Si decide hacer clic en{" "}
                <span className="mx-1 inline-block">No Aceptar</span>,{" "}
                <span className="underline">no se creará</span> un historial de
                cambios para este dispositivo. Esta acción es irreversible.
              </p>
            </div>
          </section>

          <footer className="grid grid-cols-2 gap-3 mt-4">
            <button
              className="btn"
              onClick={() => setShow(!Show)}
              type="button"
            >
              Cerrar
            </button>

            <button className="btn btn-neutral" type="submit">
              Actualizar
            </button>
          </footer>
        </div>
      </dialog>
    </>
  );
}

function UpdateViewChanges({ type, field, before, after }) {
 
  const renderObject = (obj) => {
    if (Object.keys(obj).length === 0) {
      return (
        <>
          <span> se eliminó</span>
        </>
      );
    }

    return (
      <div>
        <h3>{}</h3>

        <div className="grid grid-flow-col   flex-1">
          {Object.entries(obj).map(([key, value]) => (
            <span className="grid text-center text-sm" key={key}>
              {key.replace(/\d/g, "")}
              <span className="text-black  border-t border-b">
                {typeof value === "object" ? renderObject(value, key) : value}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="border p-2 px-3 rounded-xl my-1">
        <header className="flex justify-between items-center mb-4">
          <span className="">
            {field.includes("_")
              ? field
                  .replace("_", " ")
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              : field}
          </span>
          <span className="text-xs bg-black font-medium text-white px-2 py-1 rounded-xl">
            {type}
          </span>
        </header>
        <div>
          <h3 className="text-xs bg-blue-500 w-fit px-2 text-white rounded-lg font-semibold my-1.5">Antes</h3>
          {typeof before === "object" ? renderObject(before) : <p>{before}</p>}

          <h3 className="text-xs bg-blue-500 w-fit px-2 text-white rounded-lg font-semibold my-1.5">Ahora</h3>
          {typeof after === "object" ? renderObject(after) : <p>{after}</p>}
        </div>
      </section>
    </>
  );
}
