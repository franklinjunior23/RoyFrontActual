import { AlertDialogHeader } from "@/componentUI/ui/alert-dialog";
import { Button, buttonVariants } from "@/componentUI/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/componentUI/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { DeleteFolderApi } from "../action/UseFolderKnowledge";
import { useEffect, useState } from "react";

export default function DeleteFolder({ name, id }) {
  const [OpenDialog, setOpenDialog] = useState(false);
  const { mutate, isLoading, isSuccess } = DeleteFolderApi({
    funct: () => setOpenDialog(false),
  });

  if (!id) return;
  return (
    <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="">
          <Trash
            className={` w-5 h-5`}
            color="white"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 md:w-[500px] w-[90%]">
        <AlertDialogHeader>
          <div className="grid place-content-center">
            <div className="bg-red-400 rounded-full p-4">
              <Trash className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center pt-5 tracking-normal">
            Estas seguro de eliminar la carpeta <br />{" "}
            <span className="inline-block mt-2 ">{name}</span> ?
          </DialogTitle>
          <DialogFooter className={"grid grid-cols-2 pt-5"}>
            <Button
              variant="default"
              disabled={isLoading}
              onClick={() => mutate(id)}
            >
              {isLoading ? "Eliminando..." : "Confirmar"}
            </Button>
            <DialogClose>Cancelar</DialogClose>
          </DialogFooter>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
}
