import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { toast } from "sonner";
import { useParams } from "react-router-dom";
import axiosInstance from "@/helpers/config/axios-instance";
import { Button } from "@/componentUI/ui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/componentUI/ui/popover";
import { IconBoxMultiple } from "@tabler/icons-react";
function PageCreateArea() {
  const { nombreE, sucursalN } = useParams();
  const formdata = useForm();
  async function HandleCreate(datos) {
    console.log(datos);
    try {
      const { data } = await axiosInstance.post("Areas", {
        ...datos,
        CompanyName: nombreE,
        BranchName: sucursalN,
      });
      console.log(data);
      if (data?.create) {
        toast.success("Se creo Correctamente la area");
      }
    } catch (error) {
      toast.error("Sucedio un error " + error?.message);
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm">
          <IconBoxMultiple className="w-4 h-4 mr-2" />
          Crear Area
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <aside className=" top-12 right-3  w-[250px]">
          <Form {...formdata}>
            <form onSubmit={formdata.handleSubmit(HandleCreate)}>
              <FormField
                control={formdata.control}
                name="name"
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la area" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nombre de la area que deseas crear.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <footer className="grid grid-cols-2 gap-2 text-sm  mt-4 mb-1">
                <Button type="submit">Crear</Button>
              </footer>
            </form>
          </Form>
        </aside>
      </PopoverContent>
    </Popover>
  );
}

export default PageCreateArea;
PageCreateArea.propTypes = {
  Handle: PropTypes.func,
  TitleModal: PropTypes.string,
};
