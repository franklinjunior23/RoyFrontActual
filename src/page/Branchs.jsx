import { Outlet, useParams } from "react-router-dom";
import RetrocederItem from "@Components/Navlinks/components/RetrocederItem";
import { ColorConteners, IconEmpresa } from "@Data/DataDefault";

import ListSucursales from "@Components/Section/components/ListSucursales";

import HeadSucur from "@Components/Section/components/HeadSucur";

function BranchsPage() {
  const { nombreE, sucursalN } = useParams();
  const aleatorio = Math.floor(Math.random() * ColorConteners.length);

  /* const CreateSuc = useMutation({
    mutationFn: CreateSucursalByEmpresa,
    onSuccess: QueryClitn.invalidateQueries("Sucursales"),
    
  }); */
  return (
    <main>
      <RetrocederItem />
      {sucursalN ? (
        <Outlet />
      ) : (
        <>
          <section className="mt-6">
            <div
              className="w-full px-4 py-4 rounded-lg flex justify-center items-center gap-4 text-2xl font-bold text-white"
              style={{ background: ColorConteners[aleatorio]?.name }}
            >
              {nombreE} <IconEmpresa />
            </div>
          </section>
          <section className="">
            <HeadSucur />
          </section>
          <section>
            <ListSucursales empresa={nombreE} />
          </section>
        </>
      )}
    </main>
  );
}
export default BranchsPage;
