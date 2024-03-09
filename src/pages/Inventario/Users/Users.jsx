import { Users } from "./components/table";
import ImageUser from "/Figures/UserPage.svg"

function UserPage() {
  return (
    <main className=" md:grid md:grid-cols-[1fr_250px] gap-5">
      <section> 
        <Users />
      </section>
      <section className="bg-black/30 h-full  dark:bg-black/20 px-3 rounded-xl">
        <h2 className="text-center text-lg my-4 text-white">Usuarios</h2>
        <main className="mt-4 grid  h-[85%] gap-3">
          <CountDevices title={'Total Usuarios'} count={3}/>
          <ContentInfo/>
        </main>

      </section>
    </main>
  );
}
export default UserPage;

function CountDevices({ title, count }) {

  return (
    <section className="bg-black/60 p-4 h-fit rounded-xl text-white  ">
      <span className="text-center block text-[45px] font-bold">{count}</span>
      <h3 className="text-center text-lg my-2">{title}</h3>
    </section>
  );
}

function ContentInfo(){
  return(
    <section className="bg-black/60 self-end  p-4 py-7 rounded-xl">
     
     <img src={ImageUser} className="p-4" alt="Register Users on the branch" />
     <span className="block text-center font-bold text-white mt-5 text-lg">Register Users</span>
    </section>
  )
}
