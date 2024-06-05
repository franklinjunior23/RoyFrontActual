import Links from "./NavLinks";
import Logo from "./Logo";
import UserHead from "./User";

function Sidebar() {
  return (
    <>
      <section className="hidden md:fixed w-[250px]  min-w-[250px] min-h-screen   h-full md:flex flex-col  justify-between p-3 py-4 border-r">
        <div>
          <Logo />
          <Links />
        </div>
        <UserHead />
      </section>
    </>
  );
}

export default Sidebar;
