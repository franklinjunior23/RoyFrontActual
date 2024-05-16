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
import { Select } from "antd";
import { useForm } from "react-hook-form";

function FormCreate() {
  const formdata = useForm();

  return (
    <Form {...formdata}>
      <form onSubmit={formdata.handleSubmit}>
        <div className="flex items-end">
          <FormField
            control={formdata.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formdata.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    mode="tags"
                    className={
                      "flex h-10 w-full rounded-md border border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    }
                    size="middle"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Categoria"
                    options={[
                      { value: "Seguridad", label: "Seguridad" },
                      { value: "Redes", label: "Redes" },
                      { value: "Programacion", label: "Programacion" },
                      { value: "Base de datos", label: "Base de datos" },
                      {
                        value: "Sistemas operativos",
                        label: "Sistemas operativos",
                      },
                      { value: "Herramientas", label: "Herramientas" },
                      { value: "Hardware", label: "Hardware" },
                      { value: "Software", label: "Software" },
                    ]}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default FormCreate;
