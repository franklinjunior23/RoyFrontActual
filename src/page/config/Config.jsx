import { Button } from "@/componentUI/ui/button";
import { Card, CardContent } from "@/componentUI/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentUI/ui/form";
import { Input } from "@/componentUI/ui/input";
import { UsecontextAuth } from "@/context/provider-auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UseGetUser } from "./action/useGetProfile";

function PageConfig() {
  const formd = useForm();
  const { LogedAuth } = UsecontextAuth();
  const { data, isLoading, isError } = UseGetUser();

  useEffect(() => {
    function SetValues() {
      formd.setValue("name", LogedAuth?.nombre);
      formd.setValue("lastname", LogedAuth?.apellido);
    }
    SetValues();
  }, []);
  function SaveChanges(data) {
    console.log(data);
  }
  isLoading && <IsLoading />
  return (
    <main className="mx-auto md:w-[70%]">
      <Card>
        <CardContent>
          <Form {...formd}>
            <form onSubmit={formd.handleSubmit(SaveChanges)}>
              <section className="md:flex justify-between items-center ">
                <div>
                  <div className="flex gap-3">
                    <FormField
                      control={formd.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>

                          <FormControl>
                            <Input placeholder="Nombre" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formd.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="Apellido" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={formd.control}
                    name="correo"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Correo</FormLabel>
                        <FormControl>
                          <Input placeholder="Correo" {...field} />
                        </FormControl>
                        <FormDescription>
                          Correo electronico para el envio de mensajes o
                          alarmas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <section className="relative group/imageupload overflow-hidden rounded-full transition-all duration-100	ease-out">
                  <img
                    src={`https://ui-avatars.com/api/?name=${LogedAuth?.nombre}+${LogedAuth?.apellido}`}
                    alt="Imagen User for intisoft"
                    className="w-32 rounded-full"
                  />
                  <div className="absolute hidden  place-content-center group-hover/imageupload:visible group-hover/imageupload:grid 	 top-0 w-full h-full bg-black/20  left-0">
                    Cambiar Imagen
                  </div>
                </section>
              </section>

              <section className="flex gap-2 mt-5">
                <Button type="submit">Guardar</Button>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </section>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

export default PageConfig;

function IsLoading(){
  return <main>
    <h2>Cargando...</h2>
  </main>
}
