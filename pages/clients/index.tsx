import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import Link from 'next/link';
import Main from '../../components/main';
import type { Client } from '../../types/client';
import { get } from '../../functions/fetch';

const Clients: NextPage = () => {
  const context = useContext(AppContext);
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const clients: Client[] = await get('/clients');
      context?.loading.dispatch({type: 'OFF'});
      setClients(clients)
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to fetch clients, please try again later');
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Main page="clients">
      <h2 className="text-2xl">Clients</h2>

      <section className="grid grid-cols-3 gap-[1.5em] mt-2">

        {clients.map((client, i) => {
          return (
            <div key={i} className="p-[1.3em] rounded-lg bg-white shadow-normal">

              <div className="flex justify-between">
                <h4 className="text-primary">{client.user.name}</h4>
                {(() => {
                  if (client.suspended) {
                    return <p className="text-[.8rem] font-semibold bg-red-500 py-[.3em] px-[.6em] text-white rounded-md">Suspended</p>
                  }
                })()}
              </div>

              <div className="mt-[.5em]">
                <h4 className="text-primary text-xl">{client.jobs.length}</h4>
                <h5 className="text-[.8rem] text-gray font-semibold">Jobs posted</h5>
              </div>

              <Link href={`/clients/${client.id}`}>
                <button className="button-small">View details</button>
              </Link>
            </div>
          );
        })}
        
      </section>
    </Main>
  );
}

export default Clients;