import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/componentUI/ui/dialog";
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
import { useForm } from "react-hook-form";
import { CirclePlus } from "lucide-react";
import { UseCreateFolder } from "../action/Useknowledge";

function CreateFolder({ id }) {
  const formd = useForm();
  const { mutate, isLoading } = UseCreateFolder();
  function onSub(data) {
    if (!id) return mutate(data);

    const datos = { ...data, parentId: id };
    return mutate(datos);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <CirclePlus className="w-4 h-4 mr-2" /> Crear Carpeta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Carpeta</DialogTitle>
            <DialogDescription>Creacion de una carpeta</DialogDescription>
          </DialogHeader>
          <Form {...formd}>
            <form onSubmit={formd.handleSubmit(onSub)}>
              <FormField
                control={formd.control}
                name="name"
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre..." {...field} />
                      </FormControl>
                      <FormDescription>Nombre de la carpeta</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <DialogFooter className="mt-5">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creando..." : "Crear"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateFolder;
