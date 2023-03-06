import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import Back from '../../components/back';
import { get, put } from '../../functions/fetch';
import { jobStatus } from '../../functions/job-status';

import type { Address } from '../../types/address';
import type { Client } from '../../types/client';
import type { Service } from '../../types/service';
import type { Job, JobVendor as Quotation } from '../../types/job';

const JobDetails: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const [location, setLocation] = useState<Address>({
    line_1: '',
    postcode: 0,
    city: '',
    district: '',
    state: ''
  });
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [service, setService] = useState<Service>({id: 0, name: ''});
  const [jobObj, setJobObj] = useState<Job | null>(null);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [client, setClient] = useState<Client>();

  const getJobs = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const job: Job = await get(`/jobs/${router.query.id}`);
      context?.loading.dispatch({type: 'OFF'});
      setId(job.id);
      setLocation(job.location);
      setJobObj(job);
      setTitle(job.title);
      setDescription(job.description);
      setDate(job.date);
      setService(job.service);
      setQuotations(job.vendors);
      setClient(job.client);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve vendor, please try again later');
    }
  }

  const quotationStatus = (quotation: Quotation) => {
    if (quotation.approved) {
      return {
        text: 'Approved',
        color: '#49D380'
      };
    }
    return {
      text: 'Unapproved',
      color: '#EA2518'
    }
  }

  const clearNotification = async () => {
    if (router.query.notification === 'true') {
      await put(`/notifications/${router.query.notification_id}/read`, {});
    }
    try {
      
    } catch (err: any) {
      
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getJobs();
      clearNotification();
    }
  }, [router.isReady]);

  const approveQuotation = async (quotation: Quotation, index: number) => {
    try {
      context?.loading.dispatch({type: 'ON'});
      await put(`/jobs/${id}/approve-quotation`, { job_vendor_id: quotation.id });
      context?.loading.dispatch({type: 'OFF'});
      const quo = quotations.find(val => val.id === quotation.id);
      quo!.approved = true;
      const arr = [...quotations];
      arr.splice(index, 1, quo!);
      setQuotations(arr);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to approve quotation, please try again later');
    }
  }
  
  return (
    <main className="flex mt-4 items-center justify-center">
      <section className="w-9/12">
        <Back text="Back"/>

        <section className="mt-2">

          <div className="flex space-x-2 items-center">
            <h3 className="text-sm text-gray">{date}</h3>
            {(() => {
              if (jobObj) {
                return <p style={{backgroundColor: jobStatus(jobObj).color}} className="status">{jobStatus(jobObj).text}</p>
              }
            })()}
          </div>

          <h2 className="text-xl text-primary mt-[.5em]">{title}</h2>

          <div className="flex space-x-[.5em] items-center mt-[.3em]">
            <Image src="/service.svg" alt="service" width={18} height={16}/>
            <p>{service.name}</p>
          </div>

          <div className="flex items-center mt-[.3em] space-x-[.5em]">
            <Image src="/location.svg" alt="location" width={12} height={16}/>
            <p>{location.line_1}, {location.postcode}, {location.city}, {location.district}, {location.state}</p>
          </div>

          <p className="mt-[.7em]">{description}</p>

          <h4 className="mt-1 text-gray text-sm">Client</h4>
          <Link href={`/clients/${client?.id}`}>
            <h4 className="text-primary underline cursor-pointer mt-[.3em]">{client?.user.name}</h4>
          </Link>

        </section>
        
        {(() => {
          if (jobObj?.vendors.length! > 0) {
            return (
              <div id="jobs" className="mt-2">
                <h2 className="text-xl">Quotations</h2>

                <div className="grid grid-cols-3 mt-[1.5em] gap-[1.5em]">
                  {quotations.map((quotation, i) => {
                    return (
                      <div className="bg-white shadow-normal p-[1.3em] rounded-lg" key={i}>

                        <div className="flex justify-between">
                          <Link href={`/vendors/${quotation.vendor.id}`}>
                            <h4 className="text-primary underline cursor-pointer">{quotation.vendor.company_name}</h4>
                          </Link>
                          <p style={{backgroundColor: quotationStatus(quotation).color}} className="status">{quotationStatus(quotation).text}</p>
                        </div>

                        <a target="_blank" href={`${process.env.HOST}/${quotation.quotation_url}`} className="text-sm font-semibold text-gray mt-[.5em] block">View quotation</a>

                        {(() => {
                          if (!quotation.approved) {
                            return <button onClick={() => approveQuotation(quotation, i)} className="button-small mt-1">Approve quotation</button>
                          }
                        })()}

                        {(() => {
                          if (quotation.approved && quotation.choosen) {
                            return <p className="status bg-primary inline-block mt-1 float-right">Selected</p>;
                          }
                        })()}
                      </div>
                    )
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

export default JobDetails;