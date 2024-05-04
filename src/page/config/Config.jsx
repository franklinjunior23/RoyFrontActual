import { UsecontextAuth } from "@/context/provider-auth";
import Button from "@Components/Input/Button";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

function PageConfig() {
  const { control, handleSubmit, setValue } = useForm();
  const { LogedAuth } = UsecontextAuth();

  useEffect(() => {
    function SetValues() {
      setValue("name", LogedAuth?.nombre);
      setValue("lastname", LogedAuth?.apellido);
    }
    SetValues();
  }, []);
  function SaveChanges(data) {
    console.log(data);
  }
  return (
    <div>
      <h2 className="text-xl ">Configuración</h2>
      <main className="flex justify-between items-center md:w-[60%] mx-auto mt-5">
        <form onSubmit={handleSubmit(SaveChanges)} className="">
          <h3 className="text-xl mb-5">Perfil</h3>
          <section className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="name"
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Nombre
                  <Input {...field} />
                </Label>
              )}
            />
            <Controller
              control={control}
              name="lastname"
              defaultValue={""}
              render={({ field }) => (
                <Label>
                  Apellido
                  <Input {...field} />
                </Label>
              )}
            />
          </section>
          <Controller
            control={control}
            name="email"
            defaultValue={""}
            type="email"
            render={({ field }) => (
              <Label>
                Correo
                <Input {...field} type={"email"} />
              </Label>
            )}
          />

          <section className="flex gap-2 mt-5">
            <Button>Guardar</Button>
            <Button variant="second">Cancelar</Button>
          </section>
        </form>

        <section className="relative group/imageupload overflow-hidden rounded-full transition-all duration-100	ease-out">
          <img
            src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg"
            alt="Imagen User for intisoft"
            className="w-48 rounded-full"
          />
          <div className="absolute hidden  place-content-center group-hover/imageupload:visible group-hover/imageupload:grid 	 top-0 w-full h-full bg-black/20  left-0">
            Cambiar Imagen
          </div>
        </section>
      </main>

      {/**<HeaderRoutes/> */}
    </div>
  );
}

export default PageConfig;
