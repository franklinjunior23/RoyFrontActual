import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { useParams } from "react-router-dom";

import { SwitchIconDisp } from "@Helpers/DispositivoIcon/SwitchDispositivo";
import axiosInstance from "@/helpers/config/axios-instance";
function PageDispositivo() {
  const [DataDisp, setDataDisp] = useState(null);
  const { id } = useParams();
  const [ThemeActual] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    async function FetchChingDisp() {
      const { data } = await axiosInstance.get(`Dispositivos/${id}`);
      setDataDisp(data?.data);
      return data;
    }
    FetchChingDisp();
  }, [id]);
  useEffect(() => {
    if (ThemeActual == "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [ThemeActual]);

  console.log(DataDisp);
  return (
    <main className="dark:bg-DarkFondo px-3 bg-white w-screen h-screen  relative">
      <div className="md:max-w-screen-xl mx-auto pt-10">
        <header className="flex justify-between">
          <section className="dark:bg-DarkComponent w-[200px] md:w-[300px] p-4 rounded-lg grid items-center">
            <h3 className="text-white  text-3xl font-semibold ">
              {DataDisp?.tipo}
              <br />
              <span className="text-lg font-normal"> {DataDisp?.nombre}</span>
            </h3>
          </section>
          <section className="dark:bg-DarkComponent w-[90px]  p-4 rounded-lg ">
            <h3 className="text-white text-3xl font-semibold grid place-content-center">
              <SwitchIconDisp data={DataDisp?.tipo} size={60} />
            </h3>
          </section>
        </header>
        <header className="bg-DarkComponent mt-4 p-4 rounded-lg text-white">
          <h3>Nombre : {DataDisp?.nombre}</h3>
          <h3>Tipo : {DataDisp?.tipo_Disp}</h3>
          <h3>Marca : {DataDisp?.marca}</h3>
          <h3>
            Codigo dispositivo : {DataDisp?.codigo_dispositivo ?? "undefined"}
          </h3>

          <h3
            className={`${
              DataDisp?.estado === "Activo" ? "bg-green-500" : "bg-red-400"
            } p-2 rounded-md text-center font-semibold`}
          >
            {DataDisp?.estado}
          </h3>
        </header>
        <Navbar />
      </div>
    </main>
  );
}

export default PageDispositivo;
