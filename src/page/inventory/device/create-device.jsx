import PropTypes from "prop-types";
import { useEffect } from "react";
import HeadForm from "./form/head-form";
import { useForm } from "react-hook-form";
import Button from "@Components/Input/Button";
import FormPc from "./form/pc/Form-Pc";
import { CreateDevice } from "./form/utils/CreateDevice";
import { GetDevice, SetValueDevice } from "./form/utils/GetDevice";

function PageCreateDevice({ id }) {
  const { mutate, isLoading, error } = CreateDevice();
  const { data, isLoading: LoadinGet, isError } = GetDevice(id);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    values: {
      Ram_Modulos: [{}],
      Almacenamiento_detalle: [{}],
    },
  });

  function switchAction(datos) {
    if (id) return console.log("SI existe el AIDI");
    mutate(datos);
  }

  if (error) alert("Ocurrio un error al crear el dispositivo");
  const WatchTypeDevice = watch("tipo");

  useEffect(() => {
    (() => {
      if (id && data) {
        SetValueDevice(data, setValue, isError);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, LoadinGet,data]);
  return (
    <main>
      <form onSubmit={handleSubmit(switchAction)}>
        <HeadForm control={control} errors={errors} />
        {WatchTypeDevice === "Pc" && (
          <>
            <FormPc control={control} errors={errors} watch={watch} />
          </>
        )}
        <footer className="md:w-[400px] grid grid-cols-2 gap-2 mt-5">
          {id ? (
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              Crear
            </Button>
          )}
          <Button variant="second" type="button">
            Cancelar
          </Button>
        </footer>
      </form>
    </main>
  );
}

export default PageCreateDevice;
PageCreateDevice.propTypes = {
  id: PropTypes.string,
};
