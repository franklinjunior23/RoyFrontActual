import { IconNotes } from "@tabler/icons-react";
import FormCreateNote, { Form } from "./components/FormCreateNote";
import PropTypes from "prop-types";
import { FormateDayD } from "@/helpers/utils/conver-day-ddmmyy";
import TruncateText from "@/helpers/utils/truncate-text";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/helpers/config/axios-instance";
import { toast } from "sonner";
import { DeleteTask } from "./services/Task-services";
import { CardContent, CardHeader } from "@/componentUI/ui/card";

function ItemEdit(data) {
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="p-1 text-white bg-black rounded-md"
      >
        <IconEdit size={16} />
      </button>
      <Modal
        title="Actualizar nota"
        open={Open}
        onCancel={handleClose}
        footer={[]}
      >
        <Form onEdit={data} />
      </Modal>
    </>
  );
}
function ItemRemove({ title }) {
  const [Open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate, isLoading } = DeleteTask();

  async function Delete() {
    mutate(title);
    if (isLoading) {
      return toast.loading("Eliminando nota");
    }
    if (!isLoading) {
      return handleClose();
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="p-1 text-white bg-red-500 rounded-md"
      >
        <IconTrash size={16} />
      </button>
      <Transition appear show={Open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex justify-center mb-5 text-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-100">
                      <IconTrash size={45} />
                    </div>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-center"
                  >
                    ¿Eliminar Nota?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-muted-foreground">
                      Está seguro que desea eliminar la nota, esta acción ya no
                      podrá deshacerse y se borraran la nota seleccionada.
                    </p>
                  </div>

                  <div className="flex items-center mt-5 gap-x-2">
                    <button
                      type="button"
                      className="w-full p-3 text-white transition-all bg-red-400 border border-transparent rounded-full outline-none ring-offset-2 ring-offset-transparent hover:ring-offset-background-secondary hover:ring-2 hover:ring-danger"
                      onClick={Delete}
                    >
                      Si, eliminar nota
                    </button>
                    <button
                      type="button"
                      className="w-full p-3 transition-all bg-transparent border border-dashed rounded-full outline-none border-foreground ring-offset-2 ring-offset-transparent hover:ring-offset-background-secondary hover:ring-2 hover:ring-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

ItemRemove.propTypes = {
  title: PropTypes.string,
};

function ItemNotes({ title, description, createdAt, tag }) {
  const datanote = { title, description, createdAt, tag };
  return (
    <section className="grid max-w-full py-2 border-b border-black/50">
      <header className="flex justify-between w-full">
        <h4 className="text-sm font-semibold capitalize">
          <TruncateText text={title} maxLength={28} />
        </h4>
        <span className="text-xs">{FormateDayD(createdAt)}</span>
      </header>
      <div className="flex flex-wrap w-full gap-1 mt-2">
        {tag?.map((tag, index) => (
          <span
            key={index}
            className="px-1 py-0.5 text-xs bg-gray-200/60  rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="min-w-full mt-2 text-xs break-all ">{description}</p>
      <footer className="flex gap-1 mt-2">
        <ItemEdit data={datanote} />
        <ItemRemove title={title} />
      </footer>
    </section>
  );
}

ItemNotes.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.any,
  tag: PropTypes.array || null,
};

function Notes({ notes }) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="flex items-center gap-2 text-lg">
            Notas <IconNotes size={24} />
          </h3>
          <FormCreateNote />
        </div>
      </CardHeader>
      <CardContent >
        <main
          className="w-full h-full gap-2 mt-2 overflow-y-auto "
          style={{
            scrollbarColor: "#c8c8c8 white",
            scrollbarWidth: "thin",
          }}
        >
          {(!notes || notes?.length === 0) && (
            <p className="text-center">No hay notas</p>
          )}
          {notes &&
            notes.map((note, index) => <ItemNotes key={index} {...note} />)}
        </main>
      </CardContent>
    </>
  );
}

export default Notes;

Notes.propTypes = {
  notes: PropTypes.array,
};
