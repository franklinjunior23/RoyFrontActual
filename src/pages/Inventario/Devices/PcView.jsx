import Input from "@Components/Input/Input/Input";
import { useForm } from "react-hook-form";

function PcView() {
  const { register, handleSubmit } = useForm();
  return (
    <article>
      <form onSubmit={handleSubmit}>
        <section>
          <Input register={register} name={''}  />
        </section>
      </form>
    </article>
  );
}

export default PcView;
