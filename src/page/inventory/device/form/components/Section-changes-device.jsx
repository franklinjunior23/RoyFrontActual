import { Switch } from "antd";

import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useDataDevice } from "../hoocks/state-device-changes";
import { compareChanges } from "../utils/compare-changes";

function Sectionchangesdevice({ Show, setShow, control }) {
  const {dataDevice} = useDataDevice();
  
  return (
    <div>
      <dialog open={Show} className="modal  dark:text-black bg-black/40 ">
        <div className="modal-box max-w-[700px] ">
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
                  render={({ field }) => <Switch {...field} className="bg-black" size="default" />}
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
            <section>
              Cambios
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
