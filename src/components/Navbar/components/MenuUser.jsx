import { useState } from "react";
import ModMenUser from "./ModMenUser";

/* eslint-disable react/prop-types */
function MenuUser({ User }) {
  const { nombre } = User;
  const [ActiveModUser, setActiveModUser] = useState(false);
  const ModUserActive = () => {
    setActiveModUser(!ActiveModUser);
  };
  return (
    <div className="flex gap-2">
      <section
        onClick={ModUserActive}
        className="relative cursor-pointer  rounded-md "
      >
        <div className="px-2 lg:px-3  rounded-lg flex justify-center items-center border  border-black/40 gap-2 ">
          <span className="text-sm ">{nombre}</span>
          <i className="fi fi-rr-user text-xl py-1"></i>
        </div>
        {ActiveModUser && <ModMenUser />}
      </section>
      <section className="border border-black/40 rounded-lg px-2 py-2 h-full flex items-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={23}
          height={20}
          viewBox="0 0 13 16"
          fill="none"
        >
          <path
            d="M6.50437 1.66309C4.23994 1.66309 2.39967 3.50335 2.39967 5.76776V7.74484C2.39967 8.16215 2.2218 8.79838 2.00973 9.15411L1.223 10.4608C0.737278 11.268 1.07249 12.1642 1.96184 12.4652C4.91037 13.4503 8.09151 13.4503 11.04 12.4652C11.8678 12.1916 12.2304 11.2133 11.7789 10.4608L10.9921 9.15411C10.7869 8.79838 10.609 8.16215 10.609 7.74484V5.76776C10.609 3.51019 8.76194 1.66309 6.50437 1.66309Z"
            stroke="#292D32"
            strokeMiterlimit={10}
            strokeLinecap="round"
          />
          <path
            d="M7.38298 1.32144C7.5923 1.49871 7.38554 1.75817 7.11324 1.72516V1.72516C7.02453 1.71407 6.93631 1.70535 6.84864 1.69899C6.18614 1.65092 5.84014 1 6.50438 1V1C6.83906 1 7.14589 1.12066 7.38298 1.32144Z"
            stroke="#292D32"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.55681 12.7114C8.55681 13.8402 7.63326 14.7638 6.50447 14.7638C5.9435 14.7638 5.42357 14.5312 5.05417 14.1617C4.68475 13.7923 4.45215 13.2724 4.45215 12.7114"
            stroke="#292D32"
            strokeMiterlimit={10}
          />
        </svg>
      </section>
    </div>
  );
}

export default MenuUser;
