function RedFrom({ register, setValue, control }) {
  return (
    <section>
      <section className="grid grid-cols-2 mt-2 gap-3">
        <div className="grid">
          <label htmlFor="">Tipo de Dispositivo</label>
          <select  className="border py-2" {...register('tipo_equipo')}>
            <option value="">S</option>
          </select>
        </div>
        <div className="grid">
          <label htmlFor="">Marca</label>
          <input type="text" className="border indent-2 py-2 w-full" {...register('marca')} />
        </div>
      </section>
      <div className="grid mt-2">
        <label htmlFor="">Conexion</label>
        <select {...register('tipo_con')} className="border py-2">
          <option value="">Ethernet</option>
        </select>
      </div>

    </section>
  )
}
export default RedFrom