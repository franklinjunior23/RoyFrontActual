function InputComponent({register,name ,required ,className}) {
  return (
    <input type="text" className={`${className} w-full`} {...register(name,{
        required:{
            value:required ?? false,
            message:"Campo requerido"
        }
    })} />
  )
}
export default InputComponent