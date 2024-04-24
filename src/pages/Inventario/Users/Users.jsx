import { Users } from "./components/table";
import ImageUser from "/Figures/UserPage.svg"

function UserPage() {
  return (
    <main className=" md:grid md:grid-cols-[1fr_250px] gap-5">
      <section> 
        <Users />
      </section>
      <section className="h-full px-3 bg-black/30 dark:bg-black/20 rounded-xl">
        <h2 className="my-4 text-lg text-center text-white">Usuarios</h2>
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
    <section className="p-4 text-white bg-black/60 h-fit rounded-xl ">
      <span className="text-center block text-[45px] font-bold">{count}</span>
      <h3 className="my-2 text-lg text-center">{title}</h3>
    </section>
  );
}

function ContentInfo(){
  return(
    <section className="self-end p-4 bg-black/60 py-7 rounded-xl">
     
     <img src={ImageUser} className="p-4" alt="Register Users on the branch" />
     <span className="block mt-5 text-lg font-bold text-center text-white">Register Users</span>
    </section>
  )
}
