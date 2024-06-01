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
import { Button, buttonVariants } from "@/componentUI/ui/button";
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
import { CirclePlus, FileText, FolderMinus } from "lucide-react";
import { UseCreateFolder } from "../action/Useknowledge";
import { Link } from "react-router-dom";
import { IconClipboardText } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

function CreateFolder({ id }) {
  const [OpenDialog, setOpenDialog] = useState(false);
  const formd = useForm();
  const { mutate, isLoading } = UseCreateFolder({
    funct: () => setOpenDialog(false),
  });
  function onSub(data) {
    if (!id) return mutate(data);

    const datos = { ...data, parentId: id };
    return mutate(datos);
  }

  return (
    <>
      <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
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
              <DialogFooter className="mt-5 grid grid-cols-2 gap-2">
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

export function CreateArticle({id}) {
  if(!id) return toast.error("Selecciona la carpeta para crear un articulo");
  return (
    <Link
      to={`${id}/create-article`}
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <CirclePlus className="w-4 h-4 mr-2" />
     Crear Articulo
    </Link>
  );
}
