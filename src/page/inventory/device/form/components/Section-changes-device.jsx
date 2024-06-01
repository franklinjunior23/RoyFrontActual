import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useDataDevice } from "../hoocks/state-device-changes";
import clsx from "clsx";
import { TypeStyles } from "../const/type-changes-item";
import { Label } from "@/componentUI/ui/label";
import { Switch } from "@/componentUI/ui/switch";

import { Button } from "@/componentUI/ui/button";

import { Input } from "@/componentUI/ui/input";


function Sectionchangesdevice({ Show, setShow, control }) {
  const { dataDevice } = useDataDevice();

  return (
    <>
      <dialog
        open={Show}
        onChange={setShow}
        className={`bg-black/20 fixed z-50 top-0 right-0 grid place-content-center w-full h-full`}
      >
        <div className=" inset-1 z-[60] bg-white p-8 rounded-lg max-w-[800px] overflow-hidden grid grid-cols-2 gap-2">
          <div>
            <div>
              <div>¿Desea registrar en la base de datos?</div>
              <div>
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
              </div>
            </div>
            <div>
              <Controller
                control={control}
                name="isHistory"
                defaultValue={false}
                render={({ field }) => (
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        ¿Desea registrar en la base de datos?
                      </Label>
                    </div>
                    <Switch
                      disabled={dataDevice?.length === 0}
                      value={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="History"
                defaultValue={JSON.stringify(dataDevice) ?? ""}
                render={({ field }) => (
                  <div >
                    <Input value={JSON.stringify(field.value) ?? ""} />
                  </div>
                )}
              />
            </div>
          </div>
          <main className="">
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
                            <th scope="col" className="py-2 px-6 w-[50%]">
                              Antes
                            </th>
                            <th scope="col" className="py-2 px-6 w-[50%]">
                              Despues
                            </th>
                          </thead>
                          <tbody className="bg-white text-black  border-b text-xs ">
                            <td className="py-3 px-6 text-pretty w-[50%]">
                              {JSON.stringify(itemChange?.before)}
                            </td>
                            <td className="py-3 px-6 text-pretty w-1/2">
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
            <Button
              variant="destructive"
              type="button"
              onClick={() => setShow(false)}
            >
              Cerrar
            </Button>

            <Button type="submit" variant="default">
              Actualizar
            </Button>
          </footer>
        </div>
      </dialog>
    </>
  );
}

export default Sectionchangesdevice;
Sectionchangesdevice.propTypes = {
  control: PropTypes.any.isRequired,
  setShow: PropTypes.any.isRequired,
  Show: PropTypes.any.isRequired,
};
