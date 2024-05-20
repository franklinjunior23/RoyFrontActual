import { Card, CardContent } from "@/componentUI/ui/card";
import clsx from "clsx";

function ItemSummare({ children, status, icon }) {
  return (
    <Card className=" p-3 pl-5 relative h-[100px] rounded-lg dark:border-white/20 shadow-md">
      <CardContent >
        <section className="flex justify-between xs:flex-wrap h-full">
         <h3> {children}</h3>
          <div className="self-center">{icon}</div>
        </section>
        <div className="absolute w-1.5 h-full top-0 left-0 flex  items-center">
          <div
            className={clsx(
              "w-full rounded-md h-3/4",
              status ? "bg-green-600" : "bg-red-600"
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ItemSummare;

export function ItemOffline() {
  return <ItemSummare status={false}></ItemSummare>;
}
