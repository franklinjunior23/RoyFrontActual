import { File, Folder, Trash } from "lucide-react";
import { GetFoldersDelete, RestaureFolder } from "../action/UseFolderKnowledge";
import { Badge } from "@/componentUI/ui/badge";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import { Button } from "@/componentUI/ui/button";

export default function RestaureFolders() {
  const { data, isLoading, isError } = GetFoldersDelete();
  const { mutate: RestaureFol, isLoading: LoadingRestaure } = RestaureFolder();
  return (
    <div className="mt-8">
      <div className=" flex gap-2">
        <Badge variant="secondary" className="">
          Carpetas Eliminadas <Trash className="w-5 h-5 ml-2" />
        </Badge>
      </div>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="mt-5">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className=" bg-gray-50 rounded-md p-2 py-3 text-sm my-1"
            >
              <header className="flex items-center justify-between">
                <div className="md:flex gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <h1>{item.name}</h1>
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={LoadingRestaure}
                      className="mt-1"
                      onClick={() => {
                        RestaureFol(item.id);
                      }}
                    >
                      Restaurar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1 text-red-500"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
                <Badge variant="secondary" className="text-red-400">
                <relative-time
                      lang="es"
                     
                    >
                      <time  dateTime={new Date(item.delete).toISOString()}>
                        
                      </time>
                      
                    </relative-time>
                 
                </Badge>
              </header>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
