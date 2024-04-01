import PropTypes from "prop-types";
import { useEffect } from "react";
import HeadForm from "./form/head-form";
import { useForm } from "react-hook-form";
import Button from "@Components/Input/Button";
import FormPc from "./form/pc/Form-Pc";

function PageCreateDevice({ id }) {
  useEffect(() => {
    (() => {
      if (id) {
        console.log(id);
      } else {
        console.log("No hay id");
      }
    })();
  }, [id]);
 
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    values:{
      Ram_Modulos: [{}],
      Almacenamiento_detalle:[{}]
    }
  });
  
  const WatchTypeDevice = watch("tipo");



  return (
    <main>
      <form onSubmit={handleSubmit((dats) => console.log(dats))}>
        <HeadForm control={control} errors={errors} />
        {WatchTypeDevice === "Pc" && (
          <>
            <FormPc control={control} errors={errors} watch={watch} />
          </>
        )}
        <footer className="md:w-[400px] grid grid-cols-2 gap-2">
          <Button type="submit">Crear</Button>
          <Button variant="second" type="button">Cancelar</Button>
        </footer>
      </form>
    </main>
  );
}

export default PageCreateDevice;
PageCreateDevice.propTypes = {
  id: PropTypes.string,
};
