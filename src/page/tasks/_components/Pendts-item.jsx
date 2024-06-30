import { Avatar, AvatarFallback, AvatarImage } from "@/componentUI/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/componentUI/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/componentUI/ui/tooltip";
import { AvatarImg } from "@/helpers/utils/avatar-ui";
import clsx from "clsx";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
function Pendts({ title, id, index, users }) {
  const [Active, setActive] = useState(false);
  function handleActive() {
    setActive(!Active);
  }

  return (
    <Draggable direction="horizontal" draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          // eslint-disable-next-line react/no-unknown-property
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "rounded-lg my-3 min-h-fit h-fit cursor-pointer overflow-hidden border",
            {
              "bg-white": snapshot.isDragging, // ejemplo de clase condicional
              // puedes agregar más clases según necesites
            }
          )}
        >
          <div className="w-full h-[30px] bg-blue-600/90" />
          <div className="p-3" onClick={handleActive}>
            <h3>{title}</h3>
          </div>
          <footer className="p-3 flex justify-between items-center">
            <span className="flex text-xs items-center gap-2">
              <Clock className=" w-4 h-4" /> Lunes 23 23:30
            </span>
            <div className="flex   ">
            
              <GroupAvatar data={users} />
            </div>
          </footer>
          {Active && <PendtsDialog setChange={setActive} />}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

function PendtsDialog({ setChange }) {
  return (
    <Dialog defaultOpen onOpenChange={setChange}>
      <DialogContent>
        <DialogDescription>
          <p>Descripcion de la tarea</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function GroupAvatar({ data, maxGroup = 2 }) {
  const visibleAvatars = data?.slice(0, maxGroup); // Mostrar hasta 3 avatares visibles
  const hiddenAvatars = data?.slice(maxGroup); // Avatares ocultos que se mostrarán al hacer hover

  return (
    <>
      {visibleAvatars?.map((avatar, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex">
                <Avatar key={index} className={`-ml-3 cursor-pointer`}>
                  <AvatarImage
                    className="w-8 h-8 m-1 rounded-full"
                    src={AvatarImg({
                      name: avatar?.name,
                      lastName: avatar?.lastName,
                    })}
                    alt="User"
                  />
                  <AvatarFallback>
                    {avatar?.name} {avatar?.lastName}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                {avatar?.name} {avatar?.lastName}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {hiddenAvatars?.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar key="more" className={`-ml-3 cursor-pointer`}>
                <AvatarFallback className="w-8 h-8 mt-1 text-sm text-gray-600">+{hiddenAvatars.length}</AvatarFallback>
                <div className="hidden group-hover:flex flex-col absolute -left-8 top-8 z-10">
                  {hiddenAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="w-8 h-8  cursor-pointer"
                      name={avatar.name}
                      lastName={avatar.lastName}
                    />
                  ))}
                </div>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <div className="bg-black flex gap-2 px-2">
                {hiddenAvatars?.map((avatar, index) => (
                  <div key={index} className="grid place-content-center">
                    <Avatar key={index} className={` cursor-pointer mx-auto `}>
                      <AvatarImage
                        className="w-8 h-8 mt-1 rounded-full"
                        src={AvatarImg({
                          name: avatar.name,
                          lastName: avatar.lastName,
                        })}
                        alt="User"
                      />
                      <AvatarFallback>
                        {avatar.name} {avatar.lastName}
                      </AvatarFallback>
                    </Avatar>
                    {avatar.name} {avatar.lastName}
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export default Pendts;
