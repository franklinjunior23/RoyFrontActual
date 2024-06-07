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

const shema = z.object({
  user: z.string().min(3).max(20),
});

function FormSign() {
  const formd = useForm({
    resolver:  zodResolver(shema),
  });
  function SignIn(data) {
    console.log(data);
  }
  return (
    <Form {...formd}>
      <form
        onSubmit={formd.handleSubmit(SignIn)}
        className="mt-5 flex flex-col gap-2"
      >
        <FormField
          control={formd.control}
          name="user"
          
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
          name="password"
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
