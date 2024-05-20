import TruncateText from "@/helpers/utils/truncate-text";
import ItemSummare from "./components/ItemSummare";
import { TypeIconsOs } from "./const/Os-icons";
import { ClockStatus, StatusAntivirus } from "./const/Type-icons";
import PropTypes from "prop-types";
import {
  IconBrandOpenSource,
  IconServer2,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";

import clsx from "clsx";

import { ActionGet, FactoryDataDevice } from "../utils/GetDevice";
import { IconUser } from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { pathnameNav } from "@/helpers/utils/link-pathname";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import Notes from "./Notes";
import { Card, CardContent, CardHeader } from "@/componentUI/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/componentUI/ui/tooltip";

function Summary() {
  const date = new Date().toLocaleDateString();
  const { idDisp } = useParams();
  const path = useLocation();
  const { data, isLoading } = ActionGet(idDisp);

  const calcularTotalGB = (data) => {
    if (data === null || data?.length === 0) return null;
    const totalGB = data?.reduce((total, item) => {
      // Extraer el número del campo "gb" y sumarlo al total
      if (item?.gb === undefined || item?.gb === "") return total;
      const cantidadGB = parseFloat(item?.gb?.match(/\d+/)[0]);
      return total + cantidadGB;
    }, 0);

    return totalGB;
  };
  if (isLoading) return <h3>Cargando...</h3>;
  const dataDevice = FactoryDataDevice(data?.data);


  return (
    <>
      <section className="grid gap-3 md:grid-cols-4">
        <ItemSummare status={true} icon={ClockStatus(true)}>
          Dispositivo conectado
        </ItemSummare>
        <ItemSummare status={false} icon={StatusAntivirus.false}>
          Sin Antivirus
        </ItemSummare>
        <ItemSummare status={true} icon={ClockStatus(true)}>
          Dispositivo conectado
        </ItemSummare>
        <ItemSummare status={false} icon={ClockStatus(false)}>
          Dispositivo conectado
        </ItemSummare>
      </section>
      <main className="grid gap-3 mt-2 md:grid-cols-2">
        <section className="">
          <ContentBox>
            <CardHeader>
              <h3 className=" font-bold text-slate-400 dark:text-white/80">
                Os
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex gap-10 ">
                {dataDevice?.Os?.platform === "linux"
                  ? TypeIconsOs.linux()
                  : TypeIconsOs.windows()}

                <div className="flex flex-col justify-between">
                  <h4 className="text-xs dark:text-white/80">
                    {dataDevice?.Os?.platform ?? "Microsoft"}
                  </h4>
                  <span className="font-semibold">
                    {dataDevice?.Os?.distro ?? "Microsoft Windows 10 Home N"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-4 mt-6">
                <div>
                  <LabelItem>Os Version</LabelItem>
                  <ValueItem>
                    {dataDevice?.Os?.release ?? "10.0.19043"}{" "}
                  </ValueItem>
                </div>
                <div>
                  <LabelItem>Arquitectura</LabelItem>
                  <ValueItem>{dataDevice?.Os?.arch ?? "x64"} </ValueItem>
                </div>
                <div>
                  <LabelItem>Kernel</LabelItem>
                  <ValueItem>
                    {dataDevice?.Os?.kernel ?? "6.2.9200.0"}
                  </ValueItem>
                </div>
                <div>
                  <LabelItem>Serial</LabelItem>
                  <ValueItem>
                    {dataDevice?.Os?.serial ?? "QJP2H-N7YCR-8G37M-MG234-QGPKC"}
                  </ValueItem>
                </div>
              </div>
            </CardContent>
          </ContentBox>
          <ContentBox className="mt-2">
            <CardHeader>
              <h3 className="font-bold text-slate-400 dark:text-white/80">
                Hardware
              </h3>
            </CardHeader>
            <CardContent>
              <main className="grid md:grid-cols-2 gap-2  md:grid-rows-3 lg:grid-cols-3">
                <div className="pl-4 border-l">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-start">
                        <>
                          <LabelItem>Dispositivo</LabelItem>
                          <ValueItem>{dataDevice?.tipo}</ValueItem>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>
                        <> Dispositivo : {dataDevice?.tipo}</>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="pl-4 border-l">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-start">
                        <>
                          <LabelItem>Tipo</LabelItem>
                          <ValueItem>{dataDevice?.tipo_Disp}</ValueItem>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>
                        <> Tipo : {dataDevice?.tipo_Disp}</>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="pl-4 border-l">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-start">
                        <>
                          <LabelItem>Marca</LabelItem>
                          <ValueItem>{dataDevice?.marca}</ValueItem>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>
                        <> Marca : {dataDevice?.marca}</>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="pl-4 border-l">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-start">
                        <>
                          <LabelItem>Placa Madre</LabelItem>
                          <ValueItem>
                            {dataDevice?.Placa_modelo}{" "}
                            {dataDevice?.Placa_detalle}
                          </ValueItem>
                        </>
                      </TooltipTrigger>
                      <TooltipContent>
                        <>
                          <span>Placa Madre : </span>
                          {dataDevice?.Placa_modelo}
                          {dataDevice?.Placa_detalle}
                        </>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="pl-4 border-l">
                  <div className="py-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <>
                            <LabelItem>Ram </LabelItem>
                            <ValueItem>
                              {calcularTotalGB(dataDevice?.Ram_Modulos) ?? null}{" "}
                              Gb
                            </ValueItem>
                          </>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            <span>Ram : </span>
                            {calcularTotalGB(dataDevice?.Ram_Modulos) ??
                              null}{" "}
                            Gb
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="pl-4 border-l">
                  <div className="py-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <>
                            <LabelItem>Procesador</LabelItem>
                            <ValueItem>
                              {TruncateText({
                                text: `${dataDevice?.Procesador_marca} ${dataDevice?.Procesador_modelo}`,
                                maxLength: 20,
                              })}
                            </ValueItem>
                          </>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            <span>Procesador : </span>
                            {dataDevice?.Procesador_marca}
                            {dataDevice?.Procesador_modelo}
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="pl-4 border-l">
                  <div className="py-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <>
                            <LabelItem>Graphics</LabelItem>
                            <ValueItem>
                              {dataDevice?.Tarjeta_Video?.[0]?.detalle ??
                                "No Registrado"}
                            </ValueItem>
                          </>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            <span>Graphics : </span>
                            {dataDevice?.Tarjeta_Video?.[0]?.detalle ??
                              "No Registrado"}
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="pl-4 border-l">
                  <div className="py-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <>
                            <LabelItem>Numero Serial</LabelItem>
                            <ValueItem>
                              {dataDevice?.serie ?? "No registrado"}
                            </ValueItem>
                          </>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            <span>Serial : </span>
                            {dataDevice?.serie ?? "No registrado"}
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="pl-4 border-l">
                  <div className="py-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <>
                            <LabelItem>Fecha Fabricacion</LabelItem>
                            <ValueItem>{date}</ValueItem>
                          </>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            <span>Fabricacion : </span>
                            {date}
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </main>
              <main className="mt-5">
                <h3 className="text-sm font-bold text-slate-400 dark:text-white/80">
                  Almacenamiento
                </h3>
                <div className="md:flex flex-wrap gap-2">
                  {dataDevice?.Almacenamiento_detalle?.map((item, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <div
                            key={index}
                            className="flex gap-2 mt-3 border px-2 py-1 rounded-md items-center"
                          >
                            <div>
                              <IconServer2 size={30} />
                            </div>
                            <div>
                              <h4>
                                <LabelItem>{item?.tipo}</LabelItem>
                              </h4>
                              <span>
                                <ValueItem>{item?.gb}</ValueItem>
                              </span>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <>
                            Tipo : {item?.tipo} <br /> Gb : {item?.gb} <br />
                            Estado : {item?.estado}
                          </>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </main>
            </CardContent>
          </ContentBox>
        </section>

        <section>
          <section className="grid gap-3 md:grid-cols-2">
            <section className="">
              <ContentBox className=" md:h-fit">
                <CardHeader>
                  <h3 className="flex items-center justify-between gap-2">
                    Vinculado <IconBrandOpenSource size={30} />
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 ">
                    {dataDevice?.IdUser !== null &&
                    dataDevice?.Areas?.length === 0 ? (
                      <>
                        <h3 className="flex items-center justify-center gap-2 my-1">
                          User Conected <IconUser size={25} />
                        </h3>
                        <ul className="grid text-xs">
                          <ItemVincule label="Nombre">
                            {dataDevice?.User?.nombre}
                            {dataDevice?.User?.apellido}
                          </ItemVincule>
                          <ItemVincule label="Cargo">
                            {dataDevice?.User?.cargo.toLowerCase()}
                          </ItemVincule>
                          <ItemVincule label="Genero">
                            {dataDevice?.User?.genero}
                          </ItemVincule>
                          <ItemVincule label="Usuario">
                            {dataDevice?.User?.usuario}
                          </ItemVincule>
                          <ItemVincule label="Contraseña">
                            {dataDevice?.User?.contraseña}
                          </ItemVincule>
                          <ItemVincule label="Anydesk">
                            {dataDevice?.User?.anydesk_id}
                          </ItemVincule>
                          <ItemVincule label="Anydesk contraseña">
                            {dataDevice?.User?.anydesk_contra === ""
                              ? "No tiene contraseña"
                              : dataDevice?.User?.anydesk_contra}
                          </ItemVincule>
                        </ul>
                        <Link
                          to={pathnameNav({
                            path: path.pathname,
                            newPath: `/Usuarios/${dataDevice?.IdUser}`,
                            quantity: 3,
                          })}
                          className="font-semibold text-center text-white bg-black/30 control-input"
                        >
                          Ver
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                    {dataDevice?.Areas?.length !== 0 ? (
                      <>
                        <h3 className="flex items-center justify-center gap-2 my-1">
                          Area Conected <IconUsers size={25} />
                        </h3>
                        <ul className="text-xs">
                          <ItemVincule label="Nombre">
                            {dataDevice?.Areas?.[0]?.name}
                          </ItemVincule>
                          <ItemVincule label="Update">
                            {TimeFromPeruvian(
                              dataDevice?.Areas?.[0]?.updatedAt
                            )}
                          </ItemVincule>
                        </ul>
                      </>
                    ) : (
                      <></>
                    )}
                    {
                      // Si no hay vinculación
                      dataDevice?.Areas?.length === 0 &&
                        dataDevice?.IdUser === null && (
                          <h3 className="text-center">No hay vinculación</h3>
                        )
                    }
                  </div>
                </CardContent>
              </ContentBox>
              <ContentBox className=" md:h-[260px] mt-2.5">
                <CardHeader>
                  <h3 className="flex items-center gap-2">
                    Soporte <IconTool size={24} />
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 mt-5">
                    <div className="">
                      <h5 className="text-center "> Proximamente </h5>
                    </div>
                  </div>
                </CardContent>
              </ContentBox>
            </section>
            <ContentBox className="h-[200px] md:h-[440px] ">
              <Notes notes={dataDevice?.notes} />
            </ContentBox>
          </section>
        </section>
      </main>
    </>
  );
}

export default Summary;

function LabelItem({ children }) {
  return <h4 className="mb-1 text-xs dark:text-white/80">{children}</h4>;
}
LabelItem.propTypes = {
  children: PropTypes.node.isRequired,
};

function ValueItem({ children }) {
  return <span className="text-sm font-medium">{children}</span>;
}
ValueItem.propTypes = {
  children: PropTypes.node.isRequired,
};

function ContentBox({ children, className }) {
  return (
    <Card className={clsx("", className)}>
      <>{children}</>
    </Card>
  );
}
ContentBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ItemVincule({ label, children }) {
  return (
    <span className="md:flex md:justify-between">
      <span className="font-semibold">{label} :</span>
      <span>{children}</span>
    </span>
  );
}
ItemVincule.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
