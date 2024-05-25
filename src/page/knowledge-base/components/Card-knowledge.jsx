import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentUI/ui/accordion";
import {buttonVariants } from "@/componentUI/ui/button";
import { CirclePlus, FolderIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import CreateFolder from "./CreateFolder";
import ROLE from "@/types/Rols";
import DeleteFolder from "./DeleteFolder";

function FolderAccordion({ item, level = 0 }) {
  const mr = `ml-${level * 3}`;
  function handleRightClick(e) {
    e.preventDefault();
  }
  return (
    <Accordion type="multiple" collapsible>
      <AccordionItem value={`item-${item.id}`}>
        <AccordionTrigger
          className="hover:bg-gray-50 rounded-lg"
          onContextMenu={handleRightClick}
        >
          <header
            className={`flex gap-2 py-0 px-4 items-center justify-start ${mr} ${
              level === 2 && "ml-6"
            }`}
          >
            {item.name}
            <FolderIcon strokeWidth={2.3} className="w-5 h-5 " />
            <div className="pl-6">
              {ROLE.ADMIN && (
               <DeleteFolder {...item} />
              )}
            </div>
          </header>
        </AccordionTrigger>
        <AccordionContent className={`${mr}`}>
          <div className="flex ml-6">
            {item?.subfolders?.length === 0 &&
              item?.knowledges?.length === 0 && (
                <div>
                  <>
                    <CreateFolder id={item.id} />
                    <CreateArticle />
                  </>
                </div>
              )}
            {item?.subfolders?.length > 0 && item?.knowledges?.length < 0 && (
              <CreateArticle />
            )}

            {!item?.subfolders && item?.knowledges?.length === 0 && (
              <>
                <CreateArticle />
              </>
            )}
          </div>
          {item?.subfolders?.map((sub) => (
            <FolderAccordion key={sub.id} item={sub} level={level + 1} />
          ))}

          {item?.knowledges?.map((article) => (
            <div key={article.id} className={`${mr}`}>
              <p>{article.title}</p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FolderAccordion;

function CreateArticle() {
  return (
    <Link
      to={""}
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      <CirclePlus className="w-4 h-4 mr-2" /> Crear Articulo
    </Link>
  );
}
