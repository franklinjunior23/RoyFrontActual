import { Outlet } from "react-router-dom";
import ListCategoy from "@Components/Section/components/ListCategoy";
import Count from "@Components/Charts/Counts.jsx/Count";

function CategoryS() {
  return (
    <section>
      <div className="mb-4 md:mb-6 ">
        <ListCategoy />
      </div>
      <main className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-[1fr_340px] gap-6">
        <div>
          <Outlet />
        </div>
        <div className="dark:bg-DarkComponent rounded-xl p-3 hidden lg:block border">
          <Count />
        </div>
      </main>
    </section>
  );
}
export default CategoryS;
