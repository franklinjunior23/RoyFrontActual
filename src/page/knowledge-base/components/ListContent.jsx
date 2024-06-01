import { SearchUser } from "../../../store/SearchUser";
import Page404 from "@/page/Not-found";
import Cardknowledge from "./Card-knowledge";
import { badgeVariants } from "@/componentUI/ui/badge";
import { IconClipboardText, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import {  buttonVariants } from "@/componentUI/ui/button";
import { GetKnowledge } from "../action/Useknowledge";
import { Skeleton } from "@/componentUI/ui/skeleton";
import PropTypes from "prop-types";
import CreateFolder from "./CreateFolder";
import FolderAccordion from "./Card-knowledge";
import RestaureFolders from "./Restaure-Folder";
import ROLE from "@/types/Rols";
import { UsecontextAuth } from "@/context/provider-auth";

function ListContent({ text, setText }) {
  // traer la funcion para agregar los articulos a la base de conocimiento storage
  const AddBase = SearchUser((state) => state.AddBaseConocimiento);
  const { RoleUser } = UsecontextAuth();

  // traer los datos de la base de conocimiento con react query
  const { data, isLoading, isError } = GetKnowledge();

  // agregar los articulos a la base de conocimiento  si es que existe

  return (
    <main className="mt-8">
      <section className="flex md:flex-row flex-col-reverse gap-3 dark:text-white mb-4 justify-between items-end">
        <span
          className={` px-3 py-1 rounded-md  text-sm ${badgeVariants({
            variant: "secondary",
          })}`}
        >
          {isLoading ? (
            <Skeleton className="w-[50px] h-4" />
          ) : isError ? (
            <>Error Base de conociminto</>
          ) : (
            <>
              Total : {data?.details?.cantidad ?? "error"} {isError && "Error"}
            </>
          )}
        </span>
        <nav className="flex justify-end gap-2">
          <div className="flex dark:bg-DarkComponent border dark:border-none  rounded-md gap-2 justify-between">
            <input
              type="text"
              className="flex h-full w-full rounded-md bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
              value={text}
              placeholder="Buscar articulo..."
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center gap-1 dark:text-white">
              {text !== "" && (
                <IconX
                  strokeWidth={2}
                  size={18}
                  color="red"
                  onClick={() => setText("")}
                  className="cursor-pointer"
                />
              )}
              <IconSearch size={20} />
            </div>
          </div>
          <Link
            to={"Create"}
            className={`  justify-center  py-2 lg:py-0  text-white rounded-md flex items-center gap-1 ${buttonVariants(
              { size: "sm" }
            )}`}
          >
            Crear <IconClipboardText />
          </Link>
        </nav>
      </section>

      <section className="mt-10">
        {isLoading ? (
          <main className="grid gap-1">
            <Skeleton className={"w-full h-[30px] p-4"}></Skeleton>
          </main>
        ) : isError ? (
          <Page404 />
        ) : data?.data?.length > 0 ? (
          <main className="grid gap-1">
            {data?.data?.map((item) => (
              <FolderAccordion key={item.id} item={item} />
            ))}
          </main>
        ) : (
          <h1>
            <CreateFolder className={"mt-5"} />
          </h1>
        )}
        <div className="mt-5">
          <CreateFolder />
        </div>
        {RoleUser ===ROLE.ADMIN && <RestaureFolders />}
      </section>
    </main>
  );
}

export default ListContent;

function FilterBase({ data, text }) {
  const filterDocs = data?.filter((item) =>
    item.Titulo.toLowerCase().includes(String(text).toLowerCase())
  );

  if (filterDocs.length > 0) {
    return (
      <main className="overflow-y-auto custom custom-scrollbar  flex flex-wrap gap-x-8 gap-y-5">
        {filterDocs.map((item) => (
          <>
            <Cardknowledge key={item.id} {...item} />
          </>
        ))}
      </main>
    );
  }

  return (
    <h1 className="text-center mt-8">
      No se encontro resultados del documento : {text}
    </h1>
  );
}
FilterBase.propTypes = {
  data: PropTypes.array,
  text: PropTypes.string,
};
