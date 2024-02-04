import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  IconBrightnessUp,
  IconEye,
  IconEyeOff,
  IconMoonFilled,
} from "@tabler/icons-react";
import { UseContextLoged } from "@/context/AuhtLoged";
import axiosInstance from "@/services/ConfigApi";

function Login() {
  const [ThemeActual, setThemeActual] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });
  useEffect(() => {
    if (ThemeActual == "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [ThemeActual]);

  function HandleTheme() {
    setThemeActual((value) => (value == "light" ? "dark" : "light"));
  }
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navi = useNavigate();
  const { AddToken, LogedAuth } = UseContextLoged();
  async function LoginUsuario(datos) {
    if (datos?.usuario == "" || datos?.contraseña == "")
      return toast.error("Complete los campos");
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
    <main className=" overflow-x-hidden h-screen grid place-content-center dark:bg-DarkFondo  dark:text-white relative">
      <div className="absolute top-5 right-5">
        <button onClick={HandleTheme}>
          {" "}
          {ThemeActual === "light" ? (
            <IconMoonFilled />
          ) : (
            <IconBrightnessUp />
          )}{" "}
        </button>
      </div>
      <article className=" py-4   lg:py-4 px-10 lg:px-8 bg-white  dark:bg-[#484848] lg:w-[620px] lg:shadow-2xl rounded-xl ">
        <section>
          <h2 className="text-center font-medium mt-2 md:mt-8 lg:mt-2 tracking-wide text-3xl mb-2 uppercase ">
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

        <section className="lg:flex lg:justify-center items-center gap-4 lg:gap-">
          <picture className="hidden lg:block  ">
            <img
              src="https://www.intiscorp.com.pe/wp-content/uploads/2022/10/1-1-1.png"
              alt=""
              className="lg:w-[300px]  block mx-4 lg:h-full   lg:m-auto"
            />
          </picture>
          <div className="  lg:ml-8  w-full ">
            <form onSubmit={handleSubmit(LoginUsuario)}>
              <main className="grid gap-2 mt-8 lg:mt-2">
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
                    className="focus:outline-none text-lg py-2 border indent-3 rounded-lg mt-0.5  dark:bg-white/40 dark:border-none"
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
                  <div className="flex py-2 w-full justify-between  border indent-3 rounded-lg mt-0.5 text-lg dark:bg-white/40 dark:border-none">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("contraseña", {
                        required: {
                          value: true,
                          message: "Complete la contraseña",
                        },
                      })}
                      id=""
                      className="focus:outline-none indent-2  bg-transparent"
                    />

                    {showPassword ? (
                      <span
                        onClick={handlePasswordVisibility}
                        className="mr-2 cursor-pointer"
                      >
                        <IconEyeOff />
                      </span>
                    ) : (
                      <span
                        onClick={handlePasswordVisibility}
                        className="mr-2 cursor-pointer"
                      >
                        <IconEye />
                      </span>
                    )}
                  </div>
                  {errors.contraseña && (
                    <span className="text-xs text-red-500 ">
                      {errors.contraseña.message}
                    </span>
                  )}
                </section>
                <section className=" ">
                  <button className="text-center w-full bg-black rounded-xl mt-2 lg:mt-4 text-white md:mt-3 lg:mb-4 py-3 tex-white  ">
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
