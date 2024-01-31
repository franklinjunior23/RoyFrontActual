import { Controller } from "react-hook-form";
import Switch from "@Components/Buttons/Buttom/Switch";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function VinculeArea({ control, watch, Areas, register, dataAreas,DataUsers,IdUser,nombreE,sucursalN }) {
    if(dataAreas?.length>0) return <article>

       {
        dataAreas?.map(({name,id})=>(
           <>
            <header>
                <h3  className="font-semibold text-xl">{name}</h3>
                <span className="text-xs px-2 rounded-md bg-black">Area</span> 
            </header>
            <button type="button" className=" text-sm bg-red-500 font-semibold px-2 mt-5 rounded-md">Desvincular</button>
           </>
        ))
       }
    </article>
  return (
    <>
      <article className=" grid grid-cols-2   ">
        <section>
          <h4>Vincular por Usuario</h4>
          <Controller
            control={control}
            name="FormUser"
            defaultValue={false}
            render={({ field: { name, value, onChange } }) => {
              return <Switch state={value} onchange={onChange} name={name} />;
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
              return <Switch state={value} onchange={onChange} name={name} />;
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
                  {Areas.map(({ name, id }) => (
                    <option value={id} key={id}>
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
                className="py-2 border indent-2 dark:border-none dark:bg-Component dark:text-white"
              >
                <option value="null">marcar</option>
                {DataUsers?.map((value) => (
                  <option
                    value={value?.id}
                    disabled={value?.Dispositivo?.IdUser}
                    className={
                      value?.Dispositivo?.IdUser && "dark:text-slate-400"
                    }
                    key={value?.id}
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
