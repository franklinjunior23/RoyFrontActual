import { Button } from "@/componentUI/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/componentUI/ui/form";
import { Input } from "@/componentUI/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "../action/useSignIn";

const shema = z.object({
  usuario: z
    .string({
      message: "El usuario debe tener entre 3 y 20 caracteres",
    })
    .min(3)
    .max(20),
    contraseña: z
    .string({
      message: "La contraseña debe tener entre 3 y 20 caracteres",
    })
    .min(6)
    .max(20),
});

function FormSign() {
  const { mutate } = useSignIn();
  const formd = useForm({
    resolver: zodResolver(shema),
  });

  function Submit(data) {
    mutate(data);
  }

  return (
    <Form {...formd}>
      <form
        onSubmit={formd.handleSubmit(Submit)}
        className="mt-5 flex flex-col gap-2"
      >
        <FormField
          control={formd.control}
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Usuario123" {...field} />
              </FormControl>
              <FormDescription>Digite su usuario</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formd.control}
          name="contraseña"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription>Digite su contraseña</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer>
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </footer>
      </form>
    </Form>
  );
}

export default FormSign;
