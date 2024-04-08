import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HeadForm from "./form/pc/head-form";
import { useForm } from "react-hook-form";
import Button from "@Components/Input/Button";
import FormPc from "./form/pc/Form-Pc";
import { useParams } from "react-router-dom";
import { CreateDevice } from "./form/utils/CreateDevice";
import {  ActionGet, SetValueDevice, UpdateDevice } from "./form/utils/GetDevice";
import FormLaptop from "./form/pc/Form-Laptop";

function PageCreateDevice() {
  const [dataDevice, setdataDevice] = useState(null);
  const { idDisp } = useParams();
  const {data,isLoading:LoadingGetDevice}= ActionGet(idDisp)
  const { mutate, isLoading, error } = CreateDevice();
  const {mutate:updateDevice}= UpdateDevice(idDisp)

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
      Tarjeta_Video:[{}]
    },
  });
  function switchAction(datos) {
    if (idDisp) updateDevice(datos,idDisp)
    mutate(datos);
  }

  if (error) alert("Ocurrio un error al crear el dispositivo");
  const WatchTypeDevice = watch("tipo");

  useEffect(() => {
    (async () => {
      if (idDisp) {
        setdataDevice(data);
        SetValueDevice(dataDevice, setValue);
      }
    })();
  }, [dataDevice, idDisp, setValue,LoadingGetDevice,data]);
  return (
    <main>
      <form onSubmit={handleSubmit(switchAction)}>
        <HeadForm control={control} errors={errors} />
        {WatchTypeDevice === "Pc" && (
          <FormPc control={control} errors={errors} watch={watch} />
        )}
        {WatchTypeDevice === "Laptop" && (
          <FormLaptop control={control} errors={errors} watch={watch} />
        )}
        <footer className="md:w-[400px] grid grid-cols-2 gap-2 mt-5">
          {idDisp ? (
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
