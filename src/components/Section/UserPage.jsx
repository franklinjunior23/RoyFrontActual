import HeadCategory from "./components/HeadCategory"
import ListUsers from "./components/ListUsers"

function UserPage() {
  return (
    <main className="mt-10">
        <HeadCategory data={'Usuarios'} />
        <ListUsers/>
    </main>
  )
}
export default UserPage