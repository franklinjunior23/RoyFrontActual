import { useEffect, useState } from "react";
import ModMenUser from "./ModMenUser";
import {
  IconBrightnessUp,
  IconMoonFilled,
  IconUser,
} from "@tabler/icons-react";
import Notify from "../../Notify/Notify";

/* eslint-disable react/prop-types */
function MenuUser({ User }) {
  const [ActiveModUser, setActiveModUser] = useState(false);
  const { nombre } = User;
  // const [ThemeActual, setThemeActual] = useState(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     return "dark";
  //   } else {
  //     return "light";
  //   }
  // });

  //
  // useEffect(() => {
  //   if (ThemeActual == "dark") {
  //     document.querySelector("html").classList.add("dark");
  //   } else {
  //     document.querySelector("html").classList.remove("dark");
  //   }
  // }, [ThemeActual]);

  // function HandleTheme() {
  //   setThemeActual((value) => (value == "light" ? "dark" : "light"));
  // }
  const ModUserActive = () => {
    setActiveModUser(!ActiveModUser);
  };
  return (
    <div className="flex gap-2">
      <section
        onClick={ModUserActive}
        className="relative cursor-pointer  rounded-md "
      >
        <div className="px-2 lg:px-3 py-1  rounded-lg flex justify-center items-center border  gap-2  text-black dark:text-white ">
          <span className="text-sm capitalize ">{nombre}</span>
          <IconUser width={30} height={30} strokeWidth={1.5} />
        </div>
        {ActiveModUser && <ModMenUser />}
      </section>
      <section className="  rounded-lg px-2 border  lg:px-3 py-1">
        {/* {ThemeActual == "light" ? (
          <IconMoonFilled
            onClick={HandleTheme}
            className=" cursor-pointer
          "
            width={25}
            height={30}
          />
        ) : (
          <IconBrightnessUp
            onClick={HandleTheme}
            className=" cursor-pointer
          "
            color="white"
            width={30}
            height={30}
          />
        )} */}
      </section>
      <section className="border relative  rounded-lg px-2 py-1 h-full flex items-center cursor-pointer text-black dark:text-white">
        <Notify />
      </section>
    </div>
  );
}

export default MenuUser;
