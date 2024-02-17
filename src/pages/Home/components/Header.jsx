
import Buttom from "@Components/Buttons/Buttom/Buttom";

import { IconBell, IconSearch } from "@tabler/icons-react";

function Header() {
  const today = new Date();
  const Format = formatDate(today);

  return (
    <header className="flex justify-between">
      <section>
        <h4 className="text-blue-600 text-3xl font-bold capitalize">
          Dashboard
        </h4>
        <p className="text-Chiqui capitalize dark:text-white pb-2 mt-1 text-sm  ">
          {Format}
        </p>
      </section>
      <section className="self-start  gap-2 hidden md:flex ">
        <label className="flex items-center gap-2 form-input ">
          <IconSearch />
          <input
            type="text"
            placeholder="Buscar"
            className=" w-[400px] border-none form-input p-0"
          />
        </label>
        <Buttom >
          <IconBell />
        </Buttom>
      </section>
    </header>
  );
}

export default Header;
function formatDate(date) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-PE", options);
}

//   <div className="self-end">
//       <ItSection dato={true} />
//     </div>
