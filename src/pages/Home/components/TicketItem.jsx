import { IconClock } from "@tabler/icons-react";
import {
  ColorConteners,
  DecideColorEstatusTicket,
  EstadoTicket,
} from "../../../assets/DataDefault";
import TruncateText from "../../../utils/TruncateTeaxt";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/ConfigApi";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatTimeToPeruvian } from "../../../utils/FechaConvert";
import { UsecontextAuth } from "@/context/provider-auth";


function TicketItem({
  id,
  Titulo,
  Estado,
  Hora,
  index,
  updatedAt,
  UserUpdateId,
}) {
  const {
    LogedAuth: { nombre: NameUserLoged },
  } = UsecontextAuth();
  const shouldDisable = () => {
    
    if(Estado === "En progreso" && NameUserLoged !== UserUpdateId){
      return true
    }
    if(Estado === "Cerrado" || Estado === "Cancelado"){
      return true
    }
  }

// .
  const [selectedEstado, setSelectedEstado] = useState(Estado);

  const { control, setValue } = useForm();

  const QuerCliente = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: "UpdateTicket",
    mutationFn: async () => {
      const resp = await axiosInstance.put(`Tickets/${id}`, {
        Estado: selectedEstado,
      });
      return resp.data;
    },
    onSuccess: (data) => {
      if (!data?.update) return toast.error(data.message);
      QuerCliente.invalidateQueries("TicketSearch");
      return toast.success(data.message);
    },
    onError: (error) => {
      return toast.error(error.message);
    },
  });

  useEffect(() => {
    setValue("estado", selectedEstado);
  }, [selectedEstado, setValue]);

  const handleSelectChange = (event) => {
    const newEstado = event.target.value;
    if (Estado === "Cerrado" || Estado === "Cancelado") {
      setSelectedEstado(Estado);
      return toast.error(
        "No se puede cambiar el estado de un ticket cerrado o cancelado"
      );
    } else {
      setSelectedEstado(newEstado);
      // Lanza la mutación para actualizar el estado en la API
      mutate(newEstado);
    }
    // Actualiza localmente el estado antes de la mutación
  };
  return (
    <article className="w-full bg-white dark:bg-DarkComponent shadow-lg dark:text-white md:h-[120px] py-4 px-5 rounded-xl relative">
      <section className="md: w-full grid md:grid-cols-[1fr_100px] justify-between h-full">
        <Link
          to={`/Dashboard/Ticket/${id}`}
          className="flex flex-col h-full  justify-between"
        >
          <h3 className="font-medium text-xl py-1 w-full break-words ">
            <TruncateText maxLength={27} text={Titulo ?? "Ticket sin nombre"} />
          </h3>
          <div className="flex w-full gap-2 flex-col md:flex-row md:items-end">
            <span className="text-sm  flex gap-1 items-center tracking-wider font-bold  ">
              <IconClock size={24} /> {Hora}
              {Estado === "Cerrado" && ` -  ${formatTimeToPeruvian(updatedAt)}`}
            </span>
            {Estado === "En progreso" | Estado === "Cerrado" ? (
              <span className=" ml-2 bg-black text-white px-3 text-sm rounded-md text-center">
                {UserUpdateId ?? ''}
              </span>
            ):''}
          </div>
        </Link>
        <footer className="self-center justify-self-center w-full mt-3 ">
          <form>
            <Controller
              name="Estado"
              control={control}
              defaultValue={Estado}
              disabled={shouldDisable}
              render={({ field }) => (
                <select
                  className={`w-full px-2 text-md font-semibold focus:outline-none  ${DecideColorEstatusTicket(
                    Estado
                  )}`}
                  disabled={shouldDisable()}
                  defaultValue={Estado}
                  onChange={(e) => {
                    field.onChange(e);
                    handleSelectChange(e);
                  }}
                >
                  {EstadoTicket.map((value) => (
                    <option
                      value={value.name}
                      key={value.name}
                      className={`bg-${value.name.toLowerCase()}-300 py-2 text-center`}
                    >
                      {value.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </form>
          {/* <span
            className={`px-2 text-md font-semibold ${DecideColorEstatusTicket(
              Estado
            )}`}
          >
            {Estado}
          </span> */}
        </footer>
      </section>

      <header className="absolute h-full w-3  left-0 top-0 flex items-center">
        <section
          className={`bg-orange-300 rounded-md w-2 h-[80%] block`}
          style={{
            backgroundColor: ColorConteners[index % ColorConteners.length].name,
          }}
        />
      </header>
    </article>
  );
}

export default TicketItem;
