import { Controller } from "react-hook-form";
import Switch from "@Components/Buttons/Buttom/Switch";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/helpers/config/axios-instance";
function ButtonDeleteArea({ id }) {
  const { idDisp } = useParams();
  const QueryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["DeleteAreaTheDevice"],
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(
        `Dispositivos/area/${idDisp}?area=${id}`
      );
      return data;
    },
    onSuccess: ({ message }) => {
      toast.success(
        `${message ?? "Fue Removido el dispositivo de la sucursal"}`
      );
      QueryClient.invalidateQueries({ queryKey: ["DispById"] });
    },
  });
  return (
    <button
      type="button"
      onClick={mutate}
      className=" text-sm bg-red-500 font-semibold px-2 mt-5 rounded-md"
    >
      {isLoading ? "cargando ..." : "Desvincular"}
    </button>
  );
}

function VinculeArea({
  control,
  watch,
  Areas,
  register,
  dataAreas,
  DataUsers,
  IdUser,
  nombreE,
  sucursalN,
}) {
  
  if (dataAreas?.length > 0)
    return (
      <article>
        {dataAreas?.map(({ name, id }, index) => (
          <>
            <header key={index}>
              <h3 className="font-semibold text-xl">{name}</h3>
              <span className="text-xs px-2 rounded-md bg-black">Area</span>
            </header>
            <ButtonDeleteArea id={id} />
          </>
        ))}
      </article>
    );

  return (
    <>
      <header className="mb-3 text-sm">
        
      </header>
      <article className=" grid grid-cols-2   ">
        <section>
          <h4>Vincular por Usuario</h4>
          <Controller
            control={control}
            name="FormUser"
            defaultValue={false}
            render={({ field: { name, value, onChange } }) => {
              return (
                <Switch
                  key={name}
                  state={value}
                  onchange={onChange}
                  name={name}
                />
              );
            }}
          />
        </section>
        <section>
          <h4>Vincular por Area</h4>
          <Controller
            control={control}
            name="FormArea"
            defaultValue={false}
            render={({ field: { name, value, onChange } }) => {
              return (
                <Switch
                  key={name}
                  state={value}
                  onchange={onChange}
                  name={name}
                />
              );
            }}
          />
        </section>
      </article>
      <footer className="mt-5">
        {watch("FormArea") && (
          <>
            {Areas.length > 0 ? (
              <label className="text-sm">
                Areas
                <select
                  className="form-input dark:text-black text-black dark:bg-white"
                  {...register("IdArea")}
                >
                  {Areas.map(({ name, id }, index) => (
                    <option value={id} key={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p>No hay áreas disponibles.</p>
            )}
          </>
        )}
        {watch("FormUser") && (
          <section>
            <div className="grid">
              <label className="dark:text-white mb-3">Nombre Usuario</label>
              <select
                {...register("IdUser")}
                className="py-2 form-input border text-black dark:text-white"
              >
                <option value="null">marcar</option>
                {DataUsers?.map((value, index) => (
                  <option
                    value={value?.id}
                    disabled={value?.Dispositivo?.IdUser}
                    className={
                      value?.Dispositivo?.IdUser &&
                      "dark:text-slate-400 text-red-400"
                    }
                    key={index}
                  >
                    {value?.nombre} {value?.apellido}
                  </option>
                ))}
              </select>
            </div>
            <section className="mt-10 grid place-content-center">
              {IdUser && (
                <Link
                  to={`/Dashboard/Home/${nombreE}/${sucursalN}/Usuarios/${IdUser}`}
                  className="dark:text-white text-center border py-2 px-5 rounded-md"
                >
                  Ver Personal Registrado
                </Link>
              )}
            </section>
          </section>
        )}
      </footer>
    </>
  );
}

export default VinculeArea;
VinculeArea.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.func,
  Areas: PropTypes.any,
  register: PropTypes.func,
  dataAreas: PropTypes.any,
  DataUsers: PropTypes.any,
  IdUser: PropTypes.any,
  nombreE: PropTypes.string,
  sucursalN: PropTypes.string,
};
