import { IconClipboardText, IconSearch, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/componentUI/ui/breadcrumb";

function Header({ setValue, Value }) {
  return (
    <header className="grid ">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={'/Dashboard/home'}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Base de conocimiento</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <nav className="md:justify-self-end md:flex md:gap-2 flex-col md:flex-row md:mt-2">
        <div className="flex dark:bg-DarkComponent border dark:border-none py-2 px-2 rounded-md gap-2 justify-between">
          <input
            type="text"
            className="bg-transparent indent-0.5 border-none focus:outline-none text-base dark:text-white text-black"
            placeholder="Busqueda de Conocimiento"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex items-center gap-1 dark:text-white">
            {Value !== "" && (
              <IconX
                strokeWidth={2}
                size={20}
                onClick={() => setValue("")}
                className="cursor-pointer"
              />
            )}
            <IconSearch />
          </div>
        </div>
        <Link
          to={"Create"}
          className="bg-black mt-4 md:mt-0 px-2  w-[100px] justify-center  py-2 lg:py-0  text-white rounded-md flex items-center gap-1"
        >
          Crear <IconClipboardText />
        </Link>
      </nav>
    </header>
  );
}
export default Header;

Header.propTypes = {
  setValue: PropTypes.func,
  Value: PropTypes.string,
};
