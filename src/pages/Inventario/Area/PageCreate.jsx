import { useForm } from "react-hook-form";
import { Input } from "@Components/Input";
import PropTypes from "prop-types";
import axiosInstance from "@Services/ConfigApi";
import { toast } from "sonner";

function PageCreateArea({ Handle, TitleModal }) {
  const { register, handleSubmit } = useForm();
  async function HandleCreate(datos) {
    try {
      const { data } = await axiosInstance.post("Areas", {...datos,IdSucursal:});
      console.log(data);
      if (data?.data?.create)
        return toast.success("Se creo Correctamente la area");
    } catch (error) {
      toast.error("Sucedio un error " + error?.message);
    }
  }
  return (
    <aside className="absolute top-12 right-3 modal w-[250px]">
      <h4 className="text-center font-semibold py-2  text-base">
        {TitleModal}
      </h4>
      <form onSubmit={handleSubmit(HandleCreate)}>
        <Input
          label="Nombre"
          className={"pl-3"}
          register={register}
          name={"name"}
        />
        <footer className="grid grid-cols-2 gap-2 text-sm  mt-4 mb-4">
          <button
            type="button"
            className="hover:bg-black/5 rounded-lg"
            onClick={() => {
              Handle();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black dark:bg-white dark:text-black py-1.5 rounded-lg text-white hover:bg-black/80"
          >
            Crear
          </button>
        </footer>
      </form>
    </aside>
  );
}

export default PageCreateArea;
PageCreateArea.propTypes = {
  Handle: PropTypes.func,
  TitleModal: PropTypes.string,
};
