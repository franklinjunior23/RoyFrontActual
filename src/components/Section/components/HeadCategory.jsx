import { useState } from "react";
import ContentModal from "../../Modal/ContentModal";
import { useNavigate } from "react-router-dom";

function HeadCategory({data,type}) {

  const [UserActiveMen, setUserActiveMen] = useState(false);
  const navi = useNavigate()
  const handleActiveCam = ()=>{
    setUserActiveMen(!UserActiveMen);
  }
  return (
    <header className="flex justify-between items-center gap-2 relative">
      <h2 className="text-lg">{data}</h2>
      <button className="bg-black py-2 text-center text-white px-4 rounded-lg" onClick={()=>navi('create')}>
        Crear {data}
      </button>
      { /*  UserActiveMen && <ContentModal handle={handleActiveCam} />*/ }
    </header>
  );
}
export default HeadCategory;
