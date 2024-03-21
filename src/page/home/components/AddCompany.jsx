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
        className="border-2 border-dashed	rounded-lg grid place-content-center "
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
        /**
         * footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <button
            className="bg-black ml-3 hover:bg-black/90 text-[14px] py-1.5 px-3.5 text-white rounded-[6px]"
            key="submit"
          >
            Submit
          </button>,
        ]}
         */
      >
       <FormCompany handleCancel={handleCancel}  />
      </Modal>
    </>
  );
}

export default AddCompany;
