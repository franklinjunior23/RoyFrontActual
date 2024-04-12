import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HeadForm from "./form/form devices/head-form";
import { useForm } from "react-hook-form";
import Button from "@Components/Input/Button";
import FormPc from "./form/form devices/Form-Pc";
import { useParams } from "react-router-dom";
import { CreateDevice } from "./form/utils/CreateDevice";
import {
  ActionGet,
  SetValueDevice,
  UpdateDevice,
} from "./form/utils/GetDevice";
import FormLaptop from "./form/form devices/Form-Laptop";
import Sectionchangesdevice from "./form/components/Section-changes-device";
import { compareChanges } from "./form/utils/compare-changes";
import { useDataDevice } from "./form/hoocks/state-device-changes";
import { toast } from "sonner";
import HistoryDevice from "./history/History";
import clsx from "clsx";

function PageCreateDevice() {
  const [dataDevice, setdataDevice] = useState(null);
  const { idDisp } = useParams();
  const { data, isLoading: LoadingGetDevice } = ActionGet(idDisp);
  const { mutate, error } = CreateDevice();
  const { mutate: updateDevice } = UpdateDevice(idDisp);
  const [ShowChanges, setShowChanges] = useState(false);
  const { AddDataDevice } = useDataDevice();

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
      Tarjeta_Video: [{}],
    },
  });

  if (error) alert("Ocurrio un error al crear el dispositivo");
  const WatchTypeDevice = watch("tipo");

  useEffect(() => {
    (async () => {
      if (idDisp) {
        setdataDevice(data?.data);
        SetValueDevice(dataDevice, setValue);
      }
    })();
  }, [dataDevice, idDisp, setValue, LoadingGetDevice, data]);

  function switchAction(datos) {
    if (data?.data) {
      if (ShowChanges) {
        updateDevice(datos);
        toast.success("Dispositivo actualizado correctamente");
        return setShowChanges(false);
      }

      const DataComparing = compareChanges(datos, dataDevice, [
        // Arrray
        "Ram_Modulos",
        "Almacenamiento_detalle",
        "Tarjeta_Video",

        // String
        "Placa_detalle",
        "Placa_modelo",
        "Procesador_marca",
        "Procesador_modelo",
      ]);
      AddDataDevice(DataComparing);
      return setShowChanges(true);

      // updateDevice(datos, idDisp);
    }
    mutate(datos);
  }

  if (LoadingGetDevice) return <h1>Cargando...</h1>;
  return (
    <main className={clsx(data?.data?.historial && "grid grid-cols-[1fr_340px] gap-4")}>

      <form onSubmit={handleSubmit(switchAction)}>

        {ShowChanges && (
          <Sectionchangesdevice
            Show={ShowChanges}
            setShow={setShowChanges}
            control={control}
          />
        )}
        {
          data?.data?.tipo === "Pc" | data?.data?.tipo === "Laptop" ? ( 
            <h3>Hola</h3>
          ):null
        }

        <HeadForm control={control} errors={errors} />
        {WatchTypeDevice === "Pc" && (
          <FormPc control={control} errors={errors} watch={watch} />
        )}
        {WatchTypeDevice === "Laptop" && (
          <FormLaptop control={control} errors={errors} watch={watch} />
        )}

        <footer className="md:w-[400px] grid grid-cols-2 gap-2 mt-5">
          <TypeButton />
        </footer>

      </form>
      <HistoryDevice data={data?.data?.historial ?? []} />
    </main>
  );
}

function TypeButton() {
  const { idDisp } = useParams();
  return (
    <>
      {idDisp ? (
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      ) : (
        <Button type="submit">Crear</Button>
      )}

      <Button variant="second" type="button">
        Cancelar
      </Button>
    </>
  );
}

export default PageCreateDevice;
PageCreateDevice.propTypes = {
  id: PropTypes.string,
};
