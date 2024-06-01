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
import Button from "@Components/Input/Button";
import { useForm } from "react-hook-form";
import { CreateBranch } from "../actions/UseBranchs";

function FormBranch() {
  const { mutate, isLoading, isError } = CreateBranch();
  const formd = useForm();
  return (
    <div>
      <Form {...formd}>
        <form
          onSubmit={formd.handleSubmit((data) => {
            mutate(data);
          })}
        >
          <FormField
            control={formd.control}
            name="nombre"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la sucursal" {...field} />
                </FormControl>
                <FormDescription>
                  Nombre de la sucursal que deseas crear.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <footer className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear"}
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
}

export default FormBranch;
