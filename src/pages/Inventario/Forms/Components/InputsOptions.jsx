import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function InputsOptions({ register, setValue, options, name, type, getValues }) {
  const [showOptions, setShowOptions] = useState(false);

  // Inicializa selectedOption con un valor por defecto
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Obtén el valor actual del campo usando getValues
    const currentValue = getValues(name);
    setSelectedOption(currentValue || "");
  }, [getValues, name]);

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Actualiza el estado con la opción seleccionada primero
    setValue(name, option); // Luego, establece el valor utilizando setValue
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative">
      <input
        type={type ?? "text"}
        {...register(name, {
          required: true,
        })}
        onClick={toggleOptions}
        // Establece el valor del campo de entrada utilizando selectedOption
        value={selectedOption}
        className="border py-2 indent-3 w-full"
      />

      {showOptions && (
        <div className="rounded-md absolute w-full h-[200px] overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="bg-black/70 hover:bg-black/40 py-2 text-white text-center cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputsOptions;
