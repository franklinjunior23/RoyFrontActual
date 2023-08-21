import { useForm } from "react-hook-form";
import { CategoryInventaio } from "../../../assets/DataDefault";
import PcLapForm from "./Components/PcLapForm";

function ActionType({ type, register, watch, setValue }) {
  if (!type || type === "Defa") {
    return null;
  }

  if (type === "Pc" || type === "Laptop" || type === 'Servidores') {
    return <PcLapForm register={register} watch={watch} setValue={setValue} />;
  } else {
    return <h2>son otras cosas</h2>;
  }
}

function CreateDisp() {
  const { handleSubmit, register, watch, setValue } = useForm();
  const typeDisp = watch("Tipo");

  const HandleSubt = (dat) => {
    console.log(dat);
  };

  return (
    <main className="mt-8 pb-8">
      <form onSubmit={handleSubmit(HandleSubt)}>
        <article className="grid grid-cols-2 gap-3">
          <section className="grid">
            <label>Nombre</label>
            <input
              type="text"
              {...register("nombre")}
              className="w-full py-2 border"
            />
          </section>
          <section className="grid">
            <label>Tipo</label>
            <select {...register("Tipo")} className="border py-2">
              <option defaultValue="Defa">Seleccionar</option>
              {CategoryInventaio.filter(
                (value) => value.name !== "General"
              ).map((value) => (
                <option value={value.name} key={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </section>
        </article>
        {typeDisp !== "Defa" && (
          <ActionType type={typeDisp} register={register} watch={watch} setValue={setValue} />
        )}
        <article>
          <button type="submit">Crear</button>
          <button></button>
        </article>
      </form>
    </main>
  );
}

export default CreateDisp;