import { useForm } from "react-hook-form";

import axiosInstance from "../../services/ConfigApi";
import { UseContextLoged } from "../../context/AuhtLoged";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navi = useNavigate();
  const { AddToken, LogedAuth } = UseContextLoged();
  async function LoginUsuario(datos) {
    const { data } = await axiosInstance.post("/auth/login", datos);
    if (data.loged) {
      AddToken(data.token_user, data.user);

      return toast.success(`Bienvenido ${data.user.nombre}`);
    }

    return toast.error("Coloque sus datos correctos");
  }
  useEffect(() => {
    if (LogedAuth) {
      navi("Dashboard");
    }
  }, [navi, LogedAuth]);
  return (
    <main className=" overflow-x-hidden h-screen grid place-content-center dark:bg-DarkFondo   dark:text-white  ">
      <article className="    lg:py-4 px-14 lg:px-6 bg-white  dark:bg-[#484848] lg:w-[620px] lg:shadow-2xl rounded-xl ">
        <section>
          <h2 className="text-center font-medium mt-8 lg:mt-2 tracking-wide text-3xl uppercase ">
            INTISCORP
          </h2>
        </section>
        <section className="lg:hidden self-center mt-5">
          <picture className="m-auto flex justify-center ">
            <img
              src="https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
              alt=""
              className="w-[150px]   "
            />
          </picture>
        </section>

        <section className="lg:flex justify-center items-center gap-4 lg:gap-20">
          <picture className="hidden lg:block  ">
            <img
              src="https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
              alt=""
              className="lg:w-[300px] block mx-4 lg:h-full   lg:m-auto"
            />
          </picture>
          <div className="  md:m-auto w-full ">
            <form onSubmit={handleSubmit(LoginUsuario)}>
              <main className="grid gap-3 mt-12 lg:mt-2">
                <section className="grid">
                  <label htmlFor="" className="text-sm">
                    Usuario
                  </label>
                  <input
                    type="text"
                    {...register("usuario", {
                      required: {
                        value: true,
                        message: "El usuario no puede estar vacio",
                      },
                    })}
                    id=""
                    className="focus:outline-none text-lg py-2 border indent-3 rounded-lg mt-1  dark:bg-white/40 dark:border-none"
                  />
                  {errors.usuario && (
                    <span className="text-xs text-red-500">
                      {errors.usuario.message}
                    </span>
                  )}
                </section>
                <section className="grid">
                  <label htmlFor="" className="text-sm">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    {...register("contraseña", {
                      required: {
                        value: true,
                        message: "Complete la contraseña",
                      },
                    })}
                    id=""
                    className="focus:outline-none py-2 border indent-3 rounded-lg mt-1 text-lg dark:bg-white/40 dark:border-none "
                  />
                  {errors.contraseña && (
                    <span className="text-xs text-red-500">
                      {errors.contraseña.message}
                    </span>
                  )}
                </section>
                <section className=" ">
                  <button className="text-center w-full bg-black rounded-xl mt-6 lg:mt-10 md:mt-3 lg:mb-4 py-3 tex-white  ">
                    Iniciar Sesion
                  </button>
                </section>
              </main>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
}

export default Login;
