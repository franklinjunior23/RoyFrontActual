import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GetDispositos } from '../../../services/ApiGets'
import { IconDevicesPc } from '@tabler/icons-react'

function GeneralSect() {
  const SwitchIconDisp = ({data}) => {
    switch (data) {
      case 'Pc':
        return <IconDevicesPc />;
      case 'Laptop':
        return <IconDeviceLaptop />
      case 'Servidores':
        return <IconDevicesPc />;
      case 'Red':
        return <IconAccessPoint />;
      case 'Impresora':
        return <IconPrinter />;
    }
  }
  const { data, isLoading, isError } = useQuery(['GetDisp'], GetDispositos)
  console.log(data)
  if (isLoading) return <h2>Cargando ....</h2>
  if (isError) return <h2>Hubo un error , recargue la pagina ....</h2>
  return (
    <main className='mt-5'>
      <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 '>
        {
          data?.map((value) => (
            <section key={value.id} className='border flex justify-between px-5 py-3'>
              <div>
                <h2>{value?.marca}</h2>
              </div>
              <div>
                <SwitchIconDisp data={value?.tipo} />
              </div>
            </section>
          ))
        }
      </section>
    </main>
  )
}

export default GeneralSect
