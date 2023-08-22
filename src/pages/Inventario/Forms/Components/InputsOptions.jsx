import { useState } from "react";

function InputsOptions({ register, setValue, options, name, tyoe }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionClick = (option) => {
    setValue(name, option);
    setSelectedOption(option);
    setShowOptions(false);
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <div className="relative">
      <input
        type={tyoe ?? "text"}
        {...register(name,{
          required: true
        })}
        onClick={toggleOptions}
        onChange={(e)=>setSelectedOption(e.target.value)}
        value={selectedOption}
        className="border py-2 indent-3 w-full"
      />

      {showOptions && (
        <div className=" rounded-md absolute w-full h-[200px] overflow-y-auto z-10 ">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className=" bg-black/70 hover:bg-black/40  py-2 text-white text-center cursor-pointer"
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
