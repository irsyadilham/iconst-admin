import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import Back from '../../components/back';
import { get, put } from '../../functions/fetch';

import type { Vendor, AirtimeStatus } from '../../types/vendor';
import type { Address } from '../../types/address';
import type { Service } from '../../types/service';
import type { User } from '../../types/user';
import type { JobVendor as Job } from '../../types/job';
import type { StateKey } from '../../types/state';
import states from '../../public/states.json';

const VendorPage: NextPage = () => {
  const context = useContext(AppContext);
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
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    contact_no: ''
  });
  const [credential, setCredential] = useState<string | null>(null);
  const [approved, setApproved] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  const getVendor = async () => {
    try {
      const id = router.query.id;
      context?.loading.dispatch({type: 'ON'});
      const vendor: Vendor = await get(`/vendors/${id}`);
      context?.loading.dispatch({type: 'OFF'});
      setCompanyName(vendor.company_name);
      const address: Address = {
        ...vendor.address,
        state: states[vendor.address.state as StateKey]
      };
      setAddress(address);
      setRating(vendor.rating);
      setServices(vendor.services);
      setAirtimeStatus(vendor.airtime_status);
      setUser(vendor.user);
      setCredential(vendor.credential_file_url);
      setApproved(vendor.approved);
      setJobs(vendor.jobs);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve vendor, please try again later');
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
      context?.loading.dispatch({type: 'ON'});
      await get(`/vendors/${id}/approval`);
      context?.loading.dispatch({type: 'OFF'});
      router.back();
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
    }
  }

  const resetPassword = async () => {
    try {
      const data = {
        user_id: user.id
      };
      context?.loading.dispatch({type: 'ON'});
      await put('/change-client-vendor-password', data);
      context?.loading.dispatch({type: 'OFF'});
      alert('Successfully reset password');
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to reset password, please try again later');
    }
  }
  
  return (
    <main className="flex mt-4 items-center justify-center pb-2">
      <section className="max-w-[80%]">
        <Back text="Back"/>
        
        <section className="mt-2 flex" id="container">

          <section id="left" className="w-1/2 box-border pr-2">
            <h2 className="text-2xl">{companyName}</h2>

            {(() => {
              if (rating === 0) {
                return <p className="mt-[.5em]">No Rating</p>;
              } else {
                return (
                  <div id="rating" className="flex space-x-[.6em] mt-[.5em]">
                    {Array(rating).fill('').map((_, i) => {
                      return <Image className="w-[1.1em]" key={i} src="/star.svg" alt="star" width={11} height={11}/>
                    })}
                  </div>
                );
              }
            })()}

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
            
            <p className="mt-2">Reset password to abc12345</p>
            <button onClick={resetPassword} className="mt-[.7em] button-fitted">Reset password</button>

          </section>
          {/* #right */}

        </section>
        {/* #container */}
        
        {(() => {
          if (!approved) {
            return <button onClick={approve} className="button-fitted mt-2">Approve</button>;
          }
        })()}

        {(() => {
          if (jobs.length > 0) {
            return (
              <div id="jobs" className="mt-2">
                <h2 className="text-xl">Jobs</h2>

                <div className="grid grid-cols-3 gap-[1.5em] mt-[1.5em]">
                  {jobs.map((job, i) => {
                    return (
                      <div key={i} className="p-[1.3em] bg-white rounded-lg shadow-normal">

                        <h4 className="text-primary">{job.job_details.title}</h4>

                        <div className="flex mt-[.5em]">
                          <Image src="/service.svg" alt="service" width={18} height={16}/>
                          <p className="ml-[.5em]">{job.job_details.service.name}</p>
                        </div>

                        <div className="mt-[.5em]">
                          <h4 className="font-semibold text-gray text-sm">Client</h4>
                          <Link href={`/clients/${job.job_details.client.id}`} target="_blank">
                            <p className="underline text-primary text-sm font-semibold">{job.job_details.client.user.name}</p>
                          </Link>
                        </div>

                        <div className="mt-[.5em]">
                          <h4 className="font-semibold text-gray text-sm">Rating given</h4>
                          <div className="flex space-x-[.5em] mt-[.5em]">
                            {Array(job.job_details.rating).fill('').map((_, i) => {
                              return <Image key={i} className="w-[.7em]" src="/star.svg" alt="star" width={11} height={11}/>
                            })}
                          </div>
                        </div>
                            
                        <Link href={`/jobs/${job.job_details.id}`}>
                          <button className="button-small">View details</button>
                        </Link>

                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }
        })()}


      </section>
    </main>
  );
}

export default VendorPage;