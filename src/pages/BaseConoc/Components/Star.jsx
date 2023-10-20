import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react"

function Star() {
    const [TickStar, setTickStar] = useState(false);
    function OnclickStar(){
        setTickStar(!TickStar)
    }
  return TickStar ? < IconStarFilled className="text-yellow-400" size={45}  onClick={OnclickStar}/>  :  <IconStar className="text-yellow-400" size={45} onClick={OnclickStar}  />

  
}
export default Star