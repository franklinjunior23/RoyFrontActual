import { useParams } from "react-router-dom"

function PageIdBC() {
    const {id}=useParams()
  return (
    <div>{id}</div>
  )
}
export default PageIdBC