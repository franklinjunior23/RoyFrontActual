import HeadCategory from "./components/HeadCategory"
import ListUsers from "./components/ListUsers"

function UserPage() {
  return (
    <main className="mt-10 pb-5">
        <HeadCategory data={'Usuarios'} className="dark:text-white" />
        <ListUsers/>
    </main>
  )
}
export default UserPage