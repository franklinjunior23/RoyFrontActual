import { Divider, Select, Space, Button,Input } from "antd";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PropTypes from "prop-types";


SelectAdd.propTypes = {
  options: PropTypes.array,
};

function SelectAdd({ options }) {
  const [items, setItems] = useState(options);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  let index = 0;
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Select
      className="w-full"
      placeholder="Seleccionar tipo"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Space
            style={{
              padding: "0 8px 4px",
            }}
          >
            <Input
              placeholder="Please enter item"
              
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
}

export default SelectAdd;
