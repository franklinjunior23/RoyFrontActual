function ItemInput({ register, name, className, type, Isrequired,defaultValue,placeholder }) {
  return (
    <>
      <input
        type={type == "" ? "text" : type}
        {...register(name, { require: Isrequired && false })}
        className={`${className} dark:bg-DarkComponent dark:border-none border rounded-md dark:text-white py-2 w-full indent-2 lg:outline-none`}
        defaultValue={defaultValue}
        placeholder={placeholder && ''}
      />
    </>
  );
}
export default ItemInput;
