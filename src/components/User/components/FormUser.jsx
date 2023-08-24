import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GetDispUser, GetUserById } from "../../../services/ApiGets";
import { TipyAsign } from "../../../assets/DataDefault";

function FormUser({ id }) {
  const navi = useNavigate();
  const { data, isLoading } = useQuery(["UserData", id], () => GetUserById(id));
  const { data: DataDisp } = useQuery({
    initialData: [],
    queryKey:['DipsData'],
    queryFn: GetDispUser,
  });
  const DatPc = DataDisp.filter((value) => value.tipo === "PC");
  const DatLap = DataDisp.filter((value) => value.tipo === "LAPTOP");

  const { handleSubmit, register, watch } = useForm({
    values: {
      nombre: data?.resp?.nombre || "",
      apellido: data?.resp?.apellido || "",
      genero: data?.resp?.genero || "",
      tipo_doc: data?.resp?.apellido || "",
      doc: data?.resp?.doc || "",
      cargo: data?.resp?.cargo || "",
      tipo_usuario: data?.resp?.tipo_usuario || "",
      nivel_red: data?.resp?.nivel_red || "",
      usuario: data?.resp?.usuario || "",
      contraseña: data?.resp?.contraseña || "",
      anydesk_id: data?.resp?.anydesk_id || "",
      anydesk_contra: data?.resp?.anydesk_contra || "",
      email_tip: data?.resp?.email_tip || "",
      email_dirrecion: data?.resp?.email_dirrecion || "",
      email_contraseña: data?.resp?.email_contraseña || "",
      tipo_disp: data?.resp?.Dispositivo?.tipo || "Def",
      nombre_disp: data?.resp?.Dispositivo?.nombre || "",
    },
  });

  if (isLoading) return <h2>Cargando ...</h2>;

  if (!data.where) {
    toast.error("Error Usuario no encontrado");
    return navi(-1);
  }
  const TypeDisp = watch("tipo_disp");
  //const HandleSub = () => {};

  // eslint-disable-next-line react/prop-types
  const ContentInput = ({ label, name }) => {
    return (
      <section className="grid w-full mb-1">
        <label className="text-sm text-slate-700">{label}</label>
        <input
          type="text"
          className="w-full border rounded-md py-2 indent-2 truncate "
          {...register(`${name}`)}
        />
      </section>
    );
  };
  return (
    <main className="mt-10 mb-5">
      <main>
        <form onSubmit={handleSubmit}>
          <section className="grid grid-cols-2 gap-3">
            <main className="">
              <ContentInput label={"Nombre"} name={"nombre"} />
              <ContentInput label={"Apellido"} name={"apellido"} />
            </main>
            <div className=" flex flex-col justify-between">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3846/3846728.png"
                className="w-[100px] m-auto rounded-full"
                alt=""
              />
              <select
                className="self-center px-2 py-2 focus:outline-none rounded-md"
                {...register("genero")}
              ></select>
            </div>
          </section>
          <section className="mt-4">
            <section className="grid grid-cols-2 gap-3">
              <ContentInput label={"Tipo Doc"} name={"tipo_doc"} />
              <ContentInput label={"Doc"} name={"doc"} />
            </section>
            <section>
              <ContentInput label={"Cargo"} name={"cargo"} />
            </section>
            <section className="grid grid-cols-2 gap-3">
              <ContentInput label={"Tipo de Usuario"} name={"tipo_usuario"} />
              <ContentInput label={"Nivel de Red"} name={"nivel_red"} />
            </section>
            <section className="grid grid-cols-2 gap-3">
              <ContentInput label={"Usuario"} name={"usuario"} />
              <ContentInput label={"Contraseña"} name={"contraseña"} />
            </section>
            <section className="grid grid-cols-2 gap-3">
              <ContentInput label={"Anydesk Id"} name={"anydesk_id"} />
              <ContentInput label={"Anydesk Cntra"} name={"anydesk_contra"} />
            </section>
            <section className="grid grid-cols-2 gap-3">
              <ContentInput label={"Tipo Email"} name={"email_tip"} />
              <ContentInput label={"Correo"} name={"email_dirrecion"} />
            </section>
            <h3 className="py-4 text-lg"> Asignacion de pc</h3>
            <section className="grid grid-cols-2 gap-3 mt-5">
              <div>
                <div className="grid">
                  <label className="text-sm">Tipo</label>
                  <select
                    className="py-2 md:py-3 border w-full text-sm"
                    {...register("tipo_disp")}
                  >
                    <option value="Def" key="12">
                      Seleccionar
                    </option>
                    {TipyAsign.map((dat, index) => (
                      <option value={dat.name} key={index}>
                        {dat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2 grid">
                  <label className="text-sm">Id {TypeDisp}</label>
                  <select
                    className="py-2 border w-full text-sm md:py-3"
                    {...register("nombre_disp")}
                  >
                   <option value={data?.resp?.Dispositivo?.nombre} key={data?.resp?.Dispositivo?.nombre}>{data?.resp?.Dispositivo?.nombre}</option>
                   
                  </select>
                </div>
              </div>
              <div>
                <img
                  src="https://imgmedia.elpopular.pe/640x345/elpopular/original/2021/10/11/6164a02974f3f35da80bbdcd.webp"
                  alt=""
                  className="w-full"
                />
              </div>
            </section>
          </section>
          <section className="mt-6">
            <section className="grid grid-cols-2 gap-4">
              <button className="py-2 text-center border bg-black/90 text-white">
                Crear
              </button>
              <button className="py-2 text-center border bg-black/70 text-white">
                Cancelar
              </button>
            </section>
          </section>
        </form>
      </main>
    </main>
  );
}
export default FormUser;
