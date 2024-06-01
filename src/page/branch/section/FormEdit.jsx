import { Button } from "@/componentUI/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/componentUI/ui/form";
import Input from "@Components/Input/Input";
import { useForm } from "react-hook-form";
import { GetCompany, UpdateCompany } from "../actions/UseCompany";

function FormEdit() {
  const { isLoading, data } = GetCompany();
  const {mutate,isLoading:LoadingEdit,isError}=UpdateCompany()


  const form = useForm();
  function Handle(data) {
    mutate(data)
  }

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error</div>;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(Handle)}>
        <div>
          <FormField
            name="nombre"
            control={form.control}
            defaultValue={data?.body?.data?.nombre}
            rules={{
              minLength: {
                value: 3,
                message: "El nombre debe tener minimo 3 caracteres",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="razon_social"
            control={form.control}
            defaultValue={data?.body?.data?.razon_social}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razon Social</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="lugar"
            control={form.control}
            defaultValue={data?.body?.data?.lugar}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lugar</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <footer className="mt-4">
          <Button type="submit" >
            {LoadingEdit ? "Cargando..." : "Guardar"}
          </Button>
        </footer>
      </form>
    </Form>
  );
}

export default FormEdit;
