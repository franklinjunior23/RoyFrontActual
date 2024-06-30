import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/componentUI/ui/card";
import { PlusIcon } from "lucide-react";
import Pendts from "./Pendts-item";
import { ScrollArea } from "@/componentUI/ui/scroll-area";

function Field({ name, data, id }) {
  return (
    <Card className="border-0 shadow-none hover:border hover:transition  hover:duration-500 ease-in-out">
      <CardHeader>
        <CardTitle>{name ?? "Titulo de la tarea"}</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[400px] min-h-[600px] pr-1  ">
          {data?.map((item, index) => (
            <Pendts {...item} index={index} key={item.id} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          <span className="flex items-center justify-end text-sm  ">
            Crear tarjeta
            <PlusIcon className="w-4 h-4 ml-1" />
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Field;
