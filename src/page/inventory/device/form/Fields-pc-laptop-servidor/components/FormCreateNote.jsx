import Button from "@Components/Input/Button";
import ErrrorInput from "@Components/Input/ErrrorInput";
import Input from "@Components/Input/Input";
import Label from "@Components/Input/Label";
import { IconPlus } from "@tabler/icons-react";
import { Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateTask, UpdateTask } from "../services/Task-services";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axiosInstance from "@/helpers/config/axios-instance";
import { toast } from "sonner";

export function Form({ onEdit }) {
  const { idDisp } = useParams();
  const { mutate,isLoading } = CreateTask();
  const { mutate: mutateUpdate } = UpdateTask();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: onEdit?.data?.title ?? "",
      description: onEdit?.data?.description ?? "",
      tag: onEdit?.data?.tag ?? [],
    },
  });

  const options = [
    { label: "Mantenimiento", value: "Mantenimiento" },
    { label: "Problemas", value: "Problemas" },
    { label: "Instalar", value: "Instalar" },
    { label: "Configurar", value: "Configurar" },
    { label: "Actualizar", value: "Actualizar" },
    { label: "Eliminar", value: "Eliminar" },
    { label: "Reparar", value: "Reparar" },
    { label: "Cambiar", value: "Cambiar" },
    { label: "Revisar", value: "Revisar" },
    { label: "Reemplazar", value: "Reemplazar" },
  ];

  async function Submit(data) {
    if (!onEdit) return mutate(data);
    mutateUpdate(data);
  }

  return (
    <main>
      <form onSubmit={handleSubmit(Submit)}>
        <section className="flex flex-col gap-3">
          <Controller
            name="title"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Label className="">
                Titulo
                <Input {...field} />
                <ErrrorInput err={errors} name={field.name} />
              </Label>
            )}
          />
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <Label>
                Tags
                <Select
                  {...field}
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  tokenSeparators={[","]}
                  options={options}
                />
              </Label>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Label className="">
                Descripción
                <textarea {...field} />
              </Label>
            )}
          />
        </section>
        <footer className="mt-4">
          {onEdit ? (
            <Button type="submit"  className="">
              Actualizar
            </Button>
          ) : (
            <Button type="submit" className="">
              Crear
            </Button>
          )}
        </footer>
      </form>
    </main>
  );
}

Form.propTypes = {
  onEdit: PropTypes.object,
};

function FormCreateNote() {
  const [OpenFormCreate, setOpenFormCreate] = useState(false);
  const showModal = () => {
    setOpenFormCreate(true);
  };
  const hideModal = () => {
    setOpenFormCreate(false);
  };
  function handleOpenFormCreate() {
    setOpenFormCreate(!OpenFormCreate);
  }
  return (
    <>
      <Button onClick={showModal}>
        <IconPlus size={15} className="text-white" />
      </Button>
      <Modal
        title="Crear una nota"
        open={OpenFormCreate}
        onCancel={hideModal}
        okText="Crear"
        cancelText="Cancelar"
        footer={[]}
      >
        <Form />
      </Modal>
    </>
  );
}

export default FormCreateNote;
