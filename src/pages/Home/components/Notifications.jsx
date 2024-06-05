import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/componentUI/ui/dropdown-menu";
import { clsx } from "clsx";
import { Badge } from "@/componentUI/ui/badge";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import { Skeleton } from "@/componentUI/ui/skeleton";
import { useState } from "react";
import { UseDataSocketIO } from "@/context/Provider-SocketIo";

function Notifications({ children }) {
  const [OpenNotification, setOpenNotification] = useState(false);
  const { notification:{data,loading}} = UseDataSocketIO();
  return (
    <DropdownMenu open={OpenNotification} onOpenChange={setOpenNotification}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={"md:w-[450px] max-h-[300px] overflow-y-auto "}
        top={1}
        align="end"
      >
        {loading && (
          <main className="grid gap-3">
            <ItemSekeleton />
            <ItemSekeleton />
            <ItemSekeleton />
          </main>
        )}
        {data &&
          !loading &&
          data?.map((item) => (
            <DropdownMenuItem
              key={item?.id}
              onSelect={(e) => e.preventDefault()}
            >
              <section className="grid grid-cols-[20px_1fr] gap-4 items-center px-2">
                <div
                  className={clsx(
                    "h-3 w-3 rounded-full",
                    item?.notifications_reads[0]?.Read
                      ? "bg-gray-400"
                      : "bg-green-500"
                  )}
                />
                <div>
                  <Badge>{item?.UserAction}</Badge>
                  <p className="mt-2">{item?.Message}</p>
                  <span className="mt-2 text-sm">
                    {TimeFromPeruvian(item?.createdAt)}
                  </span>
                </div>
              </section>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;

function ItemSekeleton() {
  return (
    <section className="grid grid-cols-[20px_1fr] gap-4 items-center px-2">
      <div className={"h-3 w-3 rounded-full bg-gray-400"} />
      <div>
        <Skeleton className="w-[20%] h-4" />
        <div className="grid gap-1 mt-2">
          <Skeleton className="w-[70%] h-4 " />
          <Skeleton className="w-[70%] h-4 " />
        </div>
        <Skeleton className="w-[40%] h-4 mt-2" />
      </div>
    </section>
  );
}
