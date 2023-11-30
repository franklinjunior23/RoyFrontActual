import { useState } from "react";
import TruncateText from "../../../utils/TruncateTeaxt";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

function ItemNotify({Description}) {
  const [ViewMoreText, setViewMoreText] = useState(false);

  function HandleViewMoreText() {
    setViewMoreText(!ViewMoreText);
  }

  function ButtonViewDescription() {
    return (
      <button
        className="mt-1 invisible group-hover/notify:visible ml-0 text-gray-700 bg-slate-300 px-2 rounded-md flex justify-center items-center"
        onClick={HandleViewMoreText}
      >
        {ViewMoreText ? (
          <>
            Leer menos <IconChevronUp size={18}  />
          </>
        ) : (
          <>
            Leer mas <IconChevronDown size={18} />
          </>
        )}
      </button>
    );
  }

  return (
    <article className="grid grid-cols-[80px_3.5px_1fr]  text-black gap-3 hover:bg-slate-100 group/notify  rounded-md p-2"
    style={{ height: ViewMoreText ? "auto" : "110px" } }
    >
      <span className="self-center break-words text-xl text-center tracking-wide	 ">
        10 : 00
      </span>
      <span className="h-full bg-slate-900 w-full"></span>
      <header>
        <span className="text-sm font-medium ">User</span>
        <p className="text-sm ">
          {ViewMoreText === false ? (
            <TruncateText
              text={Description ?? 'Reportar Error NTFD-23 '}
              maxLength={48}
              ComponentNext={() => <ButtonViewDescription />}
            />
          ) : (
            <>  {Description} <ButtonViewDescription/> </>
          )}
        </p>
      </header>
    </article>
  );
}

export default ItemNotify;

// Compare this snippet from src/pages/Home/components/TicketItem.jsx:
