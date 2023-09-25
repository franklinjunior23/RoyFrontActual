import RetrocederItem from "../../../components/Navlinks/components/RetrocederItem"

function ViewRute({dato}) {
  return (
    <header className="flex justify-between">
        <div>
            <h2 className="dark:text-white text-xl  pb-2 border-b mb-5 "> {dato?.map(value=>(value + ' ' + ' '+'/' + ' '))} </h2>
        </div>
        <RetrocederItem/>
    </header>
  )
}
export default ViewRute