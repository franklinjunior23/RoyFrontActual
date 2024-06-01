import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import axiosInstance from "@/helpers/config/axios-instance";

function IdDispositivo() {
  const { idDisp } = useParams();
  const { data } = useQuery({
    queryKey: ["DispositivoByID"],
    queryFn: async () => {
      const resp = await axiosInstance.get(`Dispositivos/${idDisp}`);
      return resp.data.data;
    },
    
  });

  const { register, handleSubmit, setValue } = useForm();


  return (
    <main className="mt-8">
      <header>
        <h3 className="text-lg">
          Tipo : <span className="font-semibold">{data?.tipo}</span>
        </h3>
      </header>
      <article className="pt-5">
        <section className="grid lg:grid-cols-3 gap-4">
          <div className="grid gap-3">
            <div className="grid">
              <label>Nombre de {data?.tipo}</label>
              <input type="text" className="py-2 indent-2 border rounded-md" />
            </div>
            <div className="grid">
              <label>Tipo de {data?.tipo}</label>
              <input type="text" className="py-2 indent-2 border rounded-md" />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="grid">
                <label>Marca </label>
                <input type="text" className="py-2 indent-2 border rounded-md"  />
            </div>
            <div className="grid">
                <label>Modelo </label>
                <input type="text" className="py-2 indent-2 border rounded-md"/>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
export default IdDispositivo;
