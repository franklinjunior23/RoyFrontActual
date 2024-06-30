import { Badge } from "@/componentUI/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/componentUI/ui/card";
import { ScrollArea } from "@/componentUI/ui/scroll-area";

function Earing() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pendientes</CardTitle>
        <CardDescription>Pendiente para el dia de hoy</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[180px] ">
          <ItemEaring />
          <ItemEaring />
          <ItemEaring />
          <ItemEaring />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Earing;

function ItemEaring() {
  return (
    <div className=" my-1.5 border  rounded-md p-3">
      <h2 className="text-lg">Titulo</h2>
      <p className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quidem
        possimus quo, necessitatibus ratione dolore vero ex, obcaecati eos
        delectus repellat! Tempora, doloremque fuga magnam neque eaque ipsam
        praesentium. Ut.
      </p>
      <footer className="flex gap-2 mt-3">
        <Badge>FranxSp Soporte</Badge>
        <Badge>23/07/2024</Badge>
      </footer>
    </div>
  );
}
