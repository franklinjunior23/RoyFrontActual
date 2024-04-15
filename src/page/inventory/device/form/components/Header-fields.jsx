
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { ActionGet } from "../utils/GetDevice";
import { IconCaretLeft, IconDeviceLaptop, IconDevicesPc } from "@tabler/icons-react";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";


function Headerfields({ fields }) {
  const { idDisp } = useParams();
  const path = useLocation();
  const Active = path.pathname.split("/")[7];
  const newPath = path.pathname.split("/").slice(0, -2).join("/")
  const { data, isLoading } = ActionGet(idDisp);

  if (isLoading) return <h3>Cargando ...</h3>;

  if (data) localStorage.setItem("data-device", JSON.stringify(data));

  return (
    <>
      <header className="flex items-center justify-between">
        <section className="flex items-center gap-5 px-2 py-4">
          <div className="mx-2">
            {data?.data?.tipo === "Pc" && Typedevice.pc}
            {data?.data?.tipo === "Laptop" && Typedevice.laptop}
          </div>
          <div className="grid">
            <h4 className="text-lg font-semibold">{data?.data?.nombre}</h4>
            <span className="text-xs">
              {data?.data?.tipo} {data?.data?.nombre}
            </span>
            <span className="text-xs text-gray-600">
              Updated{" "}
              {TimeFromPeruvian(data?.data?.DetalleDispositivo?.updatedAt)}
            </span>
          </div>
        </section>
        <Link to={newPath} className="flex gap-1 text-white bg-black w-fit control-input" ><IconCaretLeft size={20}/> Retroceder</Link>
      </header>
      <section className="mb-5">
        <header className="flex flex-wrap w-full gap-3 ">
          {fields.map((value, index) => (
            <section key={index} className="">
              <Link
                to={value.value}
                className={clsx(
                  "py-2 px-1 transition-all duration-300 ease-in	 ",
                  Active === value.value &&
                    " border-black border-b-2 dark:border-white"
                )}
              >
                {value.label}
              </Link>
            </section>
          ))}
        </header>
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
};
