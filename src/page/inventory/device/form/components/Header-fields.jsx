import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { ActionGet } from "../utils/GetDevice";
import {
  IconAccessPoint,
  IconCaretLeft,
  IconDeviceLaptop,
  IconDevices,
  IconDevicesPc,
  IconPrinter,
} from "@tabler/icons-react";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import { buttonVariants } from "@/componentUI/ui/button";
import { Card, CardHeader } from "@/componentUI/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/componentUI/ui/tabs";

function Headerfields({ fields }) {
  const { idDisp } = useParams();
  const path = useLocation();
  const Active = path.pathname.split("/")[7];
  const newPath = path.pathname.split("/").slice(0, -2).join("/");
  const { data, isLoading } = ActionGet(idDisp);

  if (isLoading) return <h3>Cargando ...</h3>;

  if (data) localStorage.setItem("data-device", JSON.stringify(data));

  return (
    <>
      <Card className="">
        <CardHeader>
          <header className="md:flex justify-between items-center ">
            <section className="flex items-center gap-5 px-2">
              <div className="mx-2">
                {data?.data?.tipo === "Pc" && Typedevice.pc}
                {data?.data?.tipo === "Laptop" && Typedevice.laptop}
                {data?.data?.tipo === "Red" && Typedevice.red}
                {data?.data?.tipo === "Impresora" && Typedevice.impresora}
                {data?.data?.tipo === "" && Typedevice.default}
              </div>
              <div className="grid">
                <h4 className="text-lg font-semibold">{data?.data?.nombre}</h4>
                <span className="text-sm">
                  {data?.data?.tipo} - {data?.data?.nombre}
                </span>
                <span className="text-xs  text-gray-600 mt-1">
                  Updated
                  {TimeFromPeruvian(data?.data?.DetalleDispositivo?.updatedAt)}
                </span>
              </div>
            </section>

            <Link
              to={newPath}
              className={`${buttonVariants({
                size: "sm",
                variant: "default",
              })} flex gap-1 mt-5 md:mt-0 text-white bg-black w-fit  `}
            >
              <IconCaretLeft size={20} /> Retroceder
            </Link>
          </header>
        </CardHeader>
      </Card>
      <section className="my-2">
        <Tabs defaultValue={Active} className="overflow-x-auto">
          <TabsList >
            {fields.map((value, index) => (
              <TabsTrigger key={index} value={value.value} asChild>
                <Link to={value.value}>{value.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}

Headerfields.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default Headerfields;

export const Typedevice = {
  pc: <IconDevicesPc size={55} color="black" />,
  laptop: <IconDeviceLaptop size={55} color="black" />,
  impresora: <IconPrinter size={55} className="text-black" />,
  red: <IconAccessPoint size={55} className="text-black" />,
  default: <IconDevices size={55} className="text-black" />,
};
