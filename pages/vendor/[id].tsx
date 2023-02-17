import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Back from '../../components/back';
import { get } from '../../functions/fetch';
import vendor, { Address, stateKey, Service, AirtimeStatus } from '../../types/vendor';
import user from '../../types/user';
import states from '../../public/states.json';

export default function Vendor() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [services, setServices] = useState<Service[]>([]);
  const [address, setAddress] = useState<Address>({
    line_1: '',
    line_2: '',
    postcode: 0,
    city: '',
    district: '',
    state: ''
  });
  const [airtimeStatus, setAirtimeStatus] = useState<AirtimeStatus>({active: false, expired_date: ''});
  const [user, setUser] = useState<user>({
    name: '',
    email: '',
    contact_no: ''
  });
  const [credential, setCredential] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean>(false);

  const getVendor = async () => {
    try {
      const id = router.query.id;
      const vendor: vendor = await get(`/vendors/${id}`);
      setCompanyName(vendor.company_name);
      const address: Address = {
        ...vendor.address,
        state: states[vendor.address.state as stateKey]
      };
      setAddress(address);
      setRating(5);
      setServices(vendor.services);
      setAirtimeStatus(vendor.airtime_status);
      setUser(vendor.user);
      setCredential(vendor.credential_file_url);
      setApproved(vendor.approved);
    } catch (err: any) {
      
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getVendor();
    }
  }, [router.isReady]);

  const approve = async () => {
    const id = router.query.id;
    try {
      await get(`/vendors/${id}/approval`);
      router.back();
    } catch (err: any) {
      
    }
  }
  
  return (
    <main className="flex mt-4 items-center justify-center">
      <section className="max-w-[80%]">
        <Back text="Back"/>
        
        <section className="mt-2 flex" id="container">

          <section id="left" className="w-1/2 box-border pr-2">
            <h2 className="text-2xl">{companyName}</h2>

            <div id="rating" className="flex space-x-[.6em] mt-[.5em]">
              {Array(rating).fill('').map((_, i) => {
                return <Image className="w-[1.1em]" key={i} src="/star.svg" alt="star" width={11} height={11}/>
              })}
            </div>
            {/* #rating */}

            <div id="services" className="flex mt-1">
              <Image src="/service.svg" alt="service" width={18} height={16}/>
              <p className="ml-[.5em]">{services.map(service => service.name).join(', ')}</p>
            </div>
            {/* #services */}

            <p className="mt-[.5em]">Status: <span className={`font-bold ${airtimeStatus.active ? 'text-primary' : 'text-gray'}`}>{airtimeStatus.active ? 'Active' : 'Inactive'}</span></p>
            
            {(() => {
              if (credential) {
                return (
                  <div className="mt-2">
                    <h3>Credential</h3>
                    <a className="text-primary text-sm mt-[.5em] font-semibold block" target="_blank" href={`${process.env.HOST}/${credential}`}>View credential</a>
                  </div>
                );
              }
            })()}

          </section>
          {/* #left */}

          <section id="right" className="w-1/2 box-border pl-2 border-l-[1px] border-light-gray">

            <h2 className="text-xl">Contact details</h2>

            <p className="mt-1">{user.name}</p>

            <div className="grid grid-cols-[1.5em_1fr] gap-x-[.5em] gap-y-[.5em] mt-[.5em]">
              <Image className="w-[1.1em]" src="/email.svg" alt="email" width={16} height={16}/>
              <p>{user.email}</p>
              <Image className="w-[1.1em]" src="/phone.svg" alt="phone" width={16} height={16}/>
              <p>{user.contact_no}</p>
              <Image className="w-[.8em]" src="/location.svg" alt="location" width={12} height={16}/>
              <p>{`${address.line_1}, ${address.line_2}, ${address.postcode}, ${address.city}, ${address.district}, ${address.state}`}</p>
            </div>

          </section>
          {/* #right */}

        </section>
        {/* #container */}
        
        {(() => {
          if (!approved) {
            return <button onClick={approve} className="button-fitted mt-2">Approve</button>;
          }
        })()}

      </section>
    </main>
  );
}