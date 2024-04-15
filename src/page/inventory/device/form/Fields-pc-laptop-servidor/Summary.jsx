import TruncateText from "@/helpers/utils/truncate-text";
import ItemSummare from "./components/ItemSummare";
import { TypeIconsOs } from "./const/Os-icons";
import { ClockStatus, StatusAntivirus } from "./const/Type-icons";
import PropTypes from "prop-types";
import {
  IconBrandOpenSource,
  IconPlus,
  IconServer2,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";
import { IconNotes } from "@tabler/icons-react";
import Button from "@Components/Input/Button";
import clsx from "clsx";
import { useState } from "react";
import { ActionGet, FactoryDataDevice } from "../utils/GetDevice";
import { IconUser } from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { pathnameNav } from "@/helpers/utils/link-pathname";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";

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
  console.log(dataDevice);
  return (
    <>
      <section className="grid gap-5 md:grid-cols-4">
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
      <main className="grid gap-5 mt-4 md:grid-cols-2">
        <section className="">
          <ContentBox>
            <h3 className="text-sm font-bold text-slate-400 dark:text-white/80">
              Os
            </h3>
            <div className="flex gap-10 mt-5">
              {TypeIconsOs.windows()}
              <div className="flex flex-col justify-between">
                <h4 className="text-xs dark:text-white/80">Microsoft</h4>
                <span className="font-semibold">
                  Microsoft Windows 10 Home N
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-4 mt-6">
              <div>
                <LabelItem>Os Version</LabelItem>
                <ValueItem>10.0.19043</ValueItem>
              </div>
              <div>
                <LabelItem>Versión de la consola</LabelItem>
                <ValueItem>19045</ValueItem>
              </div>
              <div>
                <LabelItem>Service Pack</LabelItem>
                <ValueItem>6.2.9200.0</ValueItem>
              </div>
              <div>
                <LabelItem>Licencia SO</LabelItem>
                <ValueItem>QJP2H-N7YCR-8G37M-MG234-QGPKC</ValueItem>
              </div>
            </div>
          </ContentBox>
          <ContentBox className="mt-4">
            <h3 className="text-sm font-bold text-slate-400 dark:text-white/80">
              Hardware
            </h3>
            <main className="grid grid-cols-2 gap-4 mt-4 md:grid-rows-3 md:grid-cols-3">
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Dispositivo</LabelItem>
                  <ValueItem>{dataDevice?.tipo}</ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Tipo</LabelItem>
                  <ValueItem>{dataDevice?.tipo_Disp}</ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Marca</LabelItem>
                  <ValueItem>{dataDevice?.marca}</ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Placa Madre</LabelItem>
                  <ValueItem>
                    {dataDevice?.Placa_modelo} {dataDevice?.Placa_detalle}{" "}
                  </ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Ram</LabelItem>
                  <ValueItem>
                    {calcularTotalGB(dataDevice?.Ram_Modulos) ?? null} Gb
                  </ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Procesador</LabelItem>
                  <ValueItem>
                    {TruncateText({
                      text: `${dataDevice?.Procesador_marca} ${dataDevice?.Procesador_modelo}`,
                      maxLength: 20,
                    })}
                  </ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Graphics</LabelItem>
                  <ValueItem>
                    {dataDevice?.Tarjeta_Video?.[0]?.detalle ?? "No Registrado"}
                  </ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Numero Serial</LabelItem>
                  <ValueItem>{dataDevice?.serie ?? "No registrado"}</ValueItem>
                </div>
              </div>
              <div className="pl-4 border-l">
                <div className="py-1.5">
                  <LabelItem>Fecha Fabricacion</LabelItem>
                  <ValueItem>{date}</ValueItem>
                </div>
              </div>
            </main>
            <main className="mt-5">
              <h3 className="text-sm font-bold text-slate-400 dark:text-white/80">
                Almacenamiento
              </h3>
              <div className="flex flex-wrap gap-5">
                <div className="flex gap-5 mt-3">
                  <div>
                    <IconServer2 size={30} />
                  </div>
                  <LabelItem>Disco Duro</LabelItem>
                  <ValueItem>1 TB</ValueItem>
                </div>
                <div className="flex gap-5 mt-3">
                  <div>
                    <IconServer2 size={30} />
                  </div>
                  <LabelItem>Disco Duro</LabelItem>
                  <ValueItem>1 TB</ValueItem>
                </div>
              </div>
            </main>
          </ContentBox>
        </section>

        <section>
          <section className="flex justify-between gap-5">
            <section className="w-1/2">
              <ContentBox className=" md:h-fit">
                <h3 className="flex items-center justify-between gap-2">
                  Vinculado <IconBrandOpenSource size={30} />
                </h3>
                <div className="grid gap-2 mt-3">
                  {dataDevice?.IdUser!== null &&
                  dataDevice?.Areas?.length === 0 ? (
                    <>
                      <h3 className="flex items-center justify-center gap-2 my-1">
                        User Conected <IconUser size={25} />
                      </h3>
                      <ul className="text-xs">
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
                          {TimeFromPeruvian(dataDevice?.Areas?.[0]?.updatedAt)}
                        </ItemVincule>
                      </ul>
                    </>
                  ) : (
                    <></>
                  )}
                  {
                    // Si no hay vinculación
                    dataDevice?.Areas?.length === 0 && dataDevice?.IdUser === null && (
                      <h3 className="text-center">No hay vinculación</h3>
                    )
                  }
                </div>
              </ContentBox>
              <ContentBox className=" md:h-[260px] mt-4">
                <h3 className="flex items-center gap-2">
                  Soporte <IconTool size={24} />
                </h3>
                <div className="grid gap-2 mt-5">
                  <div className="">
                    <h5 className="text-center "> Proximamente </h5>
                  </div>
                </div>
              </ContentBox>
            </section>
            <ContentBox className=" w-1/2 h-[200px] md:h-[320px]">
              <div className="flex justify-between">
                <h3 className="flex items-center gap-2">
                  Notas <IconNotes size={24} />
                </h3>
                <Button>
                  <IconPlus size={15} className="text-white" />
                </Button>
              </div>
              <div></div>
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
    <div
      className={clsx(
        "p-5 rounded-lg shadow-md md:shadow-none border dark:border-white/20 ",
        className
      )}
    >
      {children}
    </div>
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
