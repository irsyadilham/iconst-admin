import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import Back from '../../components/back';
import { get, put } from '../../functions/fetch';
import { jobStatus } from '../../functions/job-status';

import type { Client } from '../../types/client';
import type { Address } from '../../types/address';
import type { Job } from '../../types/job';
import type { StateKey } from '../../types/state';
import states from '../../public/states.json';

const ClientPage: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const [address, setAddress] = useState<Address>({
    line_1: '',
    line_2: '',
    postcode: 0,
    city: '',
    district: '',
    state: ''
  });
  const [name, setName] = useState<string>('');
  const [contactNo, setContactNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [suspended, setSuspended] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const getClient = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const client: Client = await get(`/clients/${router.query.id}`);
      context?.loading.dispatch({type: 'OFF'});
      const address = {
        ...client.user.address,
        state: states[client.user.address?.state as StateKey]
      };
      setAddress(address as Address);
      setName(client.user.name);
      setEmail(client.user.email);
      setContactNo(client.user.contact_no);
      setUserId(client.user.id!);
      setJobs(client.jobs);
      setSuspended(client.suspended);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve vendor, please try again later');
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getClient();
    }
  }, [router.isReady]);

  const unsuspend = async () => {
    const id = router.query.id;
    try {
      context?.loading.dispatch({type: 'ON'});
      await get(`/clients/${id}/unsuspend`);
      context?.loading.dispatch({type: 'OFF'});
      setSuspended(false);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to unsuspend client, please try again later');
    }
  }

  const resetPassword = async () => {
    try {
      const data = {
        user_id: userId
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
      <section className="w-9/12">
        <Back text="Back"/>

        <section className="mt-2">

          <h2 className="text-xl text-primary">{name}</h2>

          <div className="grid grid-cols-[1.5em_1fr] gap-x-[.5em] gap-y-[.5em] mt-[.5em]">
            <Image className="w-[1.1em]" src="/email.svg" alt="email" width={16} height={16}/>
            <p>{email}</p>
            <Image className="w-[1.1em]" src="/phone.svg" alt="phone" width={16} height={16}/>
            <p>{contactNo}</p>
            <Image className="w-[.8em]" src="/location.svg" alt="location" width={12} height={16}/>
            <p>{`${address.line_1}, ${address.line_2}, ${address.postcode}, ${address.city}, ${address.district}, ${address.state}`}</p>
          </div>

        </section>

        <p className="mt-1">Reset password to abc12345</p>
        <button onClick={resetPassword} className="button-fitted mt-[.5em]">Reset password</button>
        
        {(() => {
          if (suspended) {
            return <button onClick={unsuspend} className="button-fitted mt-2">Unsuspend</button>;
          }
        })()}

        {(() => {
          if (jobs.length > 0) {
            return (
              <div id="jobs" className="mt-2">
                <h2 className="text-xl">Job requests</h2>

                <div className="grid grid-cols-3 gap-[1.5em] mt-[1.5em]">
                  {jobs.map((job, i) => {
                    return (
                      <div key={i} className="p-[1.3em] bg-white rounded-lg shadow-normal">
                        
                        <div className="flex justify-between">
                          <h4 className="text-primary">{job.title}</h4>
                          <p style={{backgroundColor: jobStatus(job).color}} className="status">{jobStatus(job).text}</p>
                        </div>

                        <div className="flex mt-[.5em]">
                          <Image src="/service.svg" alt="service" width={18} height={16}/>
                          <p className="ml-[.5em]">{job.service.name}</p>
                        </div>

                        {(() => {
                          if (job.rating) {
                            return (
                              <div className="mt-[.5em]">
                                <h4 className="font-semibold text-gray text-sm">Rating given</h4>
                                <div className="flex space-x-[.5em] mt-[.5em]">
                                  {Array(job.rating).fill('').map((_, i) => {
                                    return <Image key={i} className="w-[.7em]" src="/star.svg" alt="star" width={11} height={11}/>
                                  })}
                                </div>
                              </div>
                            )
                          }
                        })()}
                        
                        <Link href={`/jobs/${job.id}`}>
                          <button className="button-small mt-1">View job details</button>
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

export default ClientPage;