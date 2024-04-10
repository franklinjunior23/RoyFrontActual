import { Switch } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useDataDevice } from "../hoocks/state-device-changes";
import clsx from "clsx";
import { TypeStyles } from "../const/type-changes-item";

function Sectionchangesdevice({ Show, setShow, control }) {
  const { dataDevice } = useDataDevice();
  console.log(dataDevice);

  return (
    <div>
      <dialog open={Show} className="modal  dark:text-black bg-black/40 ">
        <div className="modal-box max-w-[800px] overflow-hidden">
          <main className="grid md:grid-cols-2 gap-2">
            <section>
              <h3 className="font-bold mb-6 text-2xl text-center">
                ¿Desea registrar en el historial?
              </h3>
              <span className="grid place-content-center">
                <Controller
                  control={control}
                  name="isHistory"
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch {...field} className="bg-black" size="default" />
                  )}
                />
              </span>

              <section className="mt-3">
                <div className="my-6 text-sm">
                  <h4 className="font-semibold">Importante:</h4>

                  <p className="text-black/60 mt-3">
                    Al hacer clic en{" "}
                    <span className="mx-1 inline-block font-semibold">
                      Aceptar
                    </span>
                    , se creará un historial de cambios para este dispositivo.
                    Esto le permitirá realizar un seguimiento detallado de los
                    componentes modificados.
                  </p>

                  <p className="text-red-500 mt-2 font-semibold">
                    ¡Recuerde! Si decide hacer clic en{" "}
                    <span className="mx-1 inline-block">No Aceptar</span>,{" "}
                    <span className="underline">no se creará</span> un historial
                    de cambios para este dispositivo. Esta acción es
                    irreversible.
                  </p>
                </div>
              </section>
            </section>
            <section className="h-full">
              <h3 className="font-semibold">Cambios</h3>
              <div className="w-full max-h-[320px] px-2 overflow-y-auto gap-3 flex flex-col overflow-hidden text-sm custom-scrollbar ">
                {dataDevice?.length === 0 && (
                  <li className="text-center">No hay cambios</li>
                )}
                {dataDevice?.map((itemChange) => {
                  return (
                    <div
                      key={itemChange?.field}
                      className="relative w-full bg-slate-50 py-2 px-2 rounded-lg"
                    >
                      <main>
                        <h3 className="capitalize font-medium text-base">
                          {itemChange?.field}
                          <h3 className="text-sm">{itemChange?.column}</h3>{" "}
                        </h3>

                        <table className="w-full mt-3 text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase  bg-slate-300 dark:text-gray-00">
                            <th scope="col" className="py-2 px-6">
                              Antes
                            </th>
                            <th scope="col" className="py-2 px-6">
                              Despues
                            </th>
                          </thead>
                          <tbody className="bg-white text-black  border-b text-xs ">
                            <td className="py-3 px-6">
                              {JSON.stringify(itemChange?.before)}
                            </td>
                            <td className="py-3 px-6">
                              {JSON.stringify(itemChange?.after)}
                            </td>
                          </tbody>
                        </table>
                      </main>
                      <span
                        className={clsx(
                          "bg-black absolute top-2 right-1 h-fit text-white text-xs rounded-lg font-semibold px-1.5 py-1",
                          TypeStyles[itemChange?.type] ?? TypeStyles.add
                        )}
                      >
                        {itemChange?.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

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
    </div>
  );
}

export default Sectionchangesdevice;
Sectionchangesdevice.propTypes = {
  control: PropTypes.any.isRequired,
  setShow: PropTypes.any.isRequired,
  Show: PropTypes.any.isRequired,
};
