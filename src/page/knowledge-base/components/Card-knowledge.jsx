import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentUI/ui/accordion";
import { File, FolderIcon } from "lucide-react";
import CreateFolder, { CreateArticle } from "./CreateFolder";
import ROLE from "@/types/Rols";
import DeleteFolder from "./DeleteFolder";
import { Badge } from "@/componentUI/ui/badge";
import { TimeFromPeruvian } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";
import { Link } from "react-router-dom";
import { UsecontextAuth } from "@/context/provider-auth";

function FolderAccordion({ item, level = 0 }) {
  const { RoleUser } = UsecontextAuth();
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
            className={`flex justify-between w-full items-center px-3 ${mr} ${
              level === 2 && "ml-6"
            }`}
          >
            <div className="flex gap-2 items-center justify-start ">
              {item.name}
              <FolderIcon strokeWidth={2.3} className="w-5 h-5 ml-1 " />

              <div className="ml-5 flex justify-start items-end gap-1">
                {item?.subfolders && <CreateFolder id={item.id} />}
                <CreateArticle id={item.id} />
                {RoleUser === ROLE.ADMIN && <DeleteFolder {...item} />}
              </div>

              <div className="pl-6"></div>
            </div>
            <span className="text-xs">{TimeFromPeruvian(item.createdAt)}</span>
          </header>
        </AccordionTrigger>
        <AccordionContent className={`${mr}`}>
          {item?.subfolders?.map((sub) => (
            <FolderAccordion key={sub.id} item={sub} level={level + 1} />
          ))}
          <div className="ml-6 mt-4">
            {item?.subfolders?.length > 0 && item?.knowledges?.length < 0 && (
              <CreateArticle />
            )}


            {item?.knowledges?.map((article) => (
              <div
                key={article.id}
                className={`px-4 flex flex-col gap-5 md:grid grid-cols-[200px_1fr_300px] mb-1.5 py-2 bg-gray-100/50 rounded-md`}
              >
                <Link to={`article/${article.id}`}>
                  <h3 className="flex items-center gap-2 capitalize mr">
                    <TruncateText text={article.Titulo} maxLength={15} />
                    <File className="w-5 h-5" />
                  </h3>
                </Link>
                <ul className="flex flex-wrap gap-2">
                  {article.Categoria?.map((cat, index) => (
                    <Badge key={index} className="capitalize">
                      {cat}
                    </Badge>
                  ))}
                </ul>
                <div className="md:flex ">
                  <Badge variant="outline" className="h-fit">
                    <relative-time lang="es">
                      <time
                        dateTime={new Date(article.createdAt).toISOString()}
                      ></time>
                    </relative-time>
                  </Badge>
                  {/* <Badge variant="outline">
                    Ultima actualizacion : {TimeFromPeruvian(item.updatedAt)}
                  </Badge> */}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FolderAccordion;
