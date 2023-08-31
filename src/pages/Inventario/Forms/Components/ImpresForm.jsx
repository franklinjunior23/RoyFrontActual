function ImpresForm({ register, setValue, control }) {
  return (
    <main className="mt-2">
      <section className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
      <div className="grid">
          <label htmlFor=""  className="text-sm">Tipo Impr.</label>
          <input type="text" className="border py-2 w-full indent-2"  {...register('marca')}/>
        </div>
        <div className="grid">
          <label htmlFor="" className="text-sm">Marca</label>
          <input type="text" className="border py-2 w-full indent-2"  {...register('marca')}/>
        </div>
        <div className="grid">
          <label htmlFor="" className="text-sm">Modelo</label>
          <input type="text" className="border py-2 w-full indent-2"  {...register('marca')}/>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-2 md:gap-3 mt-2">
        <div className="grid">
          <label htmlFor="" className="text-sm">Tipo Con.</label>
          <input type="text" {...register('tipo_con')} className="border py-2 w-full indent-2" />
        </div>
        <div className="grid">
          <label htmlFor="" className="text-sm">IP</label>
          <input type="text" {...register('Config_ip')} className="border py-2 w-full indent-2" />

        </div>
      </section>
    </main>
  )
}

export default ImpresForm
