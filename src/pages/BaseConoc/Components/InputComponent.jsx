function InputComponent({register,name ,required,className}) {
  return (
    <input type="text" className={className} {...register(name,{
        required:{
            value:required,
            message:"Campo requerido"
        }
    })} />
  )
}
export default InputComponent