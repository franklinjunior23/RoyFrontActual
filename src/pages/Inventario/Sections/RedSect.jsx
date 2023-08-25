import { useQuery } from '@tanstack/react-query';
import { GetDispositos } from '../../../services/ApiGets';
import ItemDisp from './ItemDisp';


function RedSect() {
    const { data, isLoading, isError } = useQuery(["GetDisp"], GetDispositos);

  return (
    <main className="mt-5">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {
                data?.filter((dat)=> dat.tipo ==='Red').map((value)=>(
                    <ItemDisp value={value} key={value.id} />
                ))
            }

        </section>
      
    </main>
  )
}


export default RedSect
