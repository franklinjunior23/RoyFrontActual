import { User } from "lucide-react";
import { Users } from "./components/table";
import ImageUser from "/Figures/UserPage.svg";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import clsx from "clsx";

function UserPage() {
  return (
    <main className="">
      <header className="flex gap-3 flex-wrap ">
        <ItemCount label={"Usuarios"} count={3} icon={<User />} />
        <ItemCount label={"Activos"}  count={3} />
        <ItemCount label={"Retirados"}  count={0} />
      </header>
      <section>
        <Users />
      </section>
    </main>
  );
}
export default UserPage;

function ItemCount({ icon, label, count, color, hover }) {
  const colors = {
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-400",
  };
  return (
    <article
      className={clsx(
        "border flex-1 px-5 py-2 max-h-[200px] h-[60px] rounded-lg border-green",
        color
      )}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center ">
          <span className="text-xl font-bold">{label}</span>
          <span> {icon && icon}</span>
        </div>
        <span className={clsx("text-3xl font-bold ", colors[color])}>
          {count}
        </span>
      </div>
    </article>
  );
}

function CountDevices({ title, count }) {
  return (
    <section className="p-4 text-white bg-black/60 h-fit rounded-xl ">
      <span className="text-center block text-[45px] font-bold">{count}</span>
      <h3 className="my-2 text-lg text-center">{title}</h3>
    </section>
  );
}

function ContentInfo() {
  return (
    <section className="self-end p-4 bg-black/60 py-7 rounded-xl">
      <img src={ImageUser} className="p-4" alt="Register Users on the branch" />
      <span className="block mt-5 text-lg font-bold text-center text-white">
        Register Users
      </span>
    </section>
  );
}
