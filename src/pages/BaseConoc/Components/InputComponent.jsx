function InputComponent({ register, name, required, className, label }) {
  return (
    <div>
      <label className="dark:text-white">{label}</label>
      <input
        type="text"
        className={`${className} w-full  focus:outline-none indent-2 py-1 bg-black/40 dark:bg-DarkComponent text-white rounded-md`}
        {...register(name, {
          required: {
            value: required ?? false,
            message: "Campo requerido",
          },
        })}
      />
    </div>
  );
}
export default InputComponent;
