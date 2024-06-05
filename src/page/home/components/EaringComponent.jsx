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
    <div className="h-[100px] my-1 bg-slate-300">
      <h2>Item</h2>
    </div>
  );
}
