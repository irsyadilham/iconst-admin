import Image from 'next/image';
import Link from 'next/link';
import vendor from '../types/vendor';
import states from '../public/states.json';
import { stateKey } from '../types/vendor';

interface args {
  data: vendor;
}

export default function Vendor({data}: args) {
  return (
    <main className="p-1 bg-white shadow-normal rounded-md">

      <section id="top" className="flex justify-between items-start">
        <div className="mr-1">
          <h4 className={`${data.credential_file_url ? 'text-primary' : 'text-gray'} text-[.9rem]`}>{data.company_name}</h4>
          <div className="flex space-x-[.3em] mt-[.3em]">
            {Array(5).fill('').map((_, i) => {
              return <Image className="w-[.8em]" key={i} src="/star.svg" alt="star" width={11} height={11}/>
            })}
          </div>
        </div>
        <section className="flex">
          <button>
            <Image className="w-1" src="/edit.svg" alt="edit" width={14} height={14}/>
          </button>
          <button>
            <Image className="ml-[.4em] w-1" src="/trash.svg" alt="trash" width={14} height={14}/>
          </button>
        </section>
      </section>
      {/* #top */}

      <section className="mt-[.6em] space-y-[.3em]">
        <div className="flex items-center">
          <Image className="w-[.8em]" src="/location.svg" alt="location" width={12} height={16}/>
          <p className="ml-[.5em]">{data.address.district}, {states[data.address.state as stateKey]}</p>
        </div>
        <div className="flex items-center">
          <Image className="w-[.8em]" src="/service.svg" alt="service" width={18} height={16}/>
          <p className="ml-[.5em]">{data.services.map(val => val.name).join(', ')}</p>
        </div>
        <div className="flex items-cente">
          <p className="text-gray text-sm">Status :</p>
          <h4 className={`ml-[.5em] text-sm ${data.airtime_status.active ? 'text-primary' : 'text-gray'}`}>{data.airtime_status.active ? 'Active' : 'Inactive'}</h4>
        </div>
      </section>
      
      <Link href={`/vendor/${data.id}`}>
        <button className="text-sm py-[.5em] px-[.9em] text-white rounded-md bg-primary mt-[.8em]">View details</button>
      </Link>

    </main>
  );
}