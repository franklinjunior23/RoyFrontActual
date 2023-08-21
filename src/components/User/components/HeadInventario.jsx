import { useNavigate } from "react-router-dom"

function HeadInventario() {
  const navi = useNavigate()
  return (
    <header className="mt-6 flex justify-between items-end">
        <h3>Inventario ..</h3>
        <button className="bg-black text-white px-3 py-1 rounded-md" onClick={()=>navi('Create')}>
            + Dispositivo
        </button>
    </header>
  )
}
export default HeadInventario