import HeadCategory from "@Components/Section/components/HeadCategory";

import { Users } from "./components/table";

function UserPage() {
  return (
    <main className=" pb-5 md:grid md:grid-cols-[1fr_300px]">
      <section>
        <HeadCategory data={"Usuarios"} className="dark:text-white" />
        
        <Users />
      </section>
      <section></section>
    </main>
  );
}
export default UserPage;
