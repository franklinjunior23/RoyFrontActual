import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Button, Modal } from "antd";
import FormCompany from "./form-create-company";

function AddCompany() {
  const [modalpen, setModalpen] = useState(false);
  const handleOk = () => {
    setModalpen(true);
  };
  const handleCancel = () => {
    setModalpen(false);
  };

  return (
    <>
      <button
        className="grid dark:border-white border-2 border-dashed md:w-[100px] md:min-w-[100px] md:h-[140px] rounded-lg place-content-center "
        onClick={handleOk}
      >
        Crear Empresa
        <IconPlus size={28} className="mx-auto mt-3" />
      </button>

      <Modal
        title="Crear Empresa"
        centered
        open={modalpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
      >
        <FormCompany handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default AddCompany;
