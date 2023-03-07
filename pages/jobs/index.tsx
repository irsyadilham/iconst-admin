import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import Link from 'next/link';
import Image from 'next/image';
import Main from '../../components/main';
import type { Job } from '../../types/job';
import { get } from '../../functions/fetch';
import { jobStatus } from '../../functions/job-status';

const Jobs: NextPage = () => {
  const context = useContext(AppContext);
  const [jobs, setJobs] = useState<Job[]>([]);

  const getJobs = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const jobs: Job[] = await get('/jobs');
      context?.loading.dispatch({type: 'OFF'});
      setJobs(jobs);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      if (err.status !== 401) {
        alert('Failed to retrieve job, please try again later');
      }
    }
  }

  const jobsUnapprovedQuotation = () => {
    const unapproved = jobs.filter(job => {
      return job.vendors.find(val => !val.approved);
    });
    if (unapproved.length > 0) {
      return {
        status: true,
        total: unapproved.length
      };
    }
    return {
      status: false,
      total: 0
    };
  }

  const unapprovedQuotation = (job: Job) => {
    const unapproved = job.vendors.filter(val => !val.approved);
    if (unapproved.length > 0) {
      return {
        status: true,
        total: unapproved.length
      };
    }
    return {
      status: false,
      total: 0
    };
  }

  useEffect(() => {
    getJobs();
  }, []);

  const vendorQuotation = (job: Job) => {
    const choosen = job.vendors.find(vendor => vendor.choosen);
    if (choosen) {
      return {
        type: 'vendor',
        obj: choosen
      }
    }
    return { type: 'quotation' }
  }

  return (
    <Main page="jobs">

      <div className="flex space-x-2 items-center">
        <h2 className="text-2xl">Jobs</h2>
        {(() => {
          if (jobsUnapprovedQuotation().status) {
            return <h2 className="bg-primary text-white px-1 py-[.7em] rounded-full text-[.8rem]">{jobsUnapprovedQuotation().total} jobs unapproved quotation{jobsUnapprovedQuotation().total > 1 ? 's' : ''}</h2>
          }
        })()}
      </div>

      <section className="grid grid-cols-3 gap-[1.5em] mt-2">

        {jobs.map((job, i) => {
          return (
            <div className="bg-white p-[1.3em] shadow-normal rounded-lg flex flex-col justify-between" key={i}>
              <section id="top">

                <div className="flex justify-between items-start">
                  <h3 className="text-primary">{job.title}</h3>
                  <p style={{backgroundColor: jobStatus(job).color}} className="status">{jobStatus(job).text}</p>
                </div>

                <div className="flex items-center mt-[.5em]">
                  <Image src="/service.svg" alt="" width={16} height={18}/>
                  <p className="ml-[.5em]">{job.service.name}</p>
                </div>

                <h4 className="text-[.8rem] mt-[.5em] text-gray">Client</h4>
                <Link href={`/clients/${job.client.id}`}>
                  <p className="text-primary font-semibold underline">{job.client.user.name}</p>
                </Link>

                {(() => {
                  if (job.status.name !== 'Request' && job.vendors.length > 0) {
                    return (
                      <>
                        <h4 className="text-[.8rem] mt-[.5em] text-gray">Vendor</h4>
                        <Link href={`/vendors/${vendorQuotation(job).obj?.vendor.id}`}>
                          <h4 className="text-primary text-sm underline font-semibold">{vendorQuotation(job).obj?.vendor.company_name}</h4>
                        </Link>
                      </>
                    )
                  } else {
                    if (job.vendors.length > 0) {
                      return (
                        <div>
                          <div>
                            <h4 className="text-[.8rem] mt-[.5em] text-gray">Total quotations</h4>
                            <h3>{job.vendors.length}</h3>
                          </div>
                          {(() => {
                            if (unapprovedQuotation(job).status) {
                              return <h4 className="text-[.8rem] mt-[.5em] py-[.5em] px-[.8em] bg-red-500 text-white inline-block rounded-full">{unapprovedQuotation(job).total} unapproved quotations</h4>
                            }
                          })()}
                          
                        </div>
                      );
                    }
                  }
                })()}

              </section>

              <Link href={`/jobs/${job.id}`}>
                <button className="button-small mt-1 inline-block">View details</button>
              </Link>
            </div>
          )
        })}

      </section>
    </Main>
  );
}

export default Jobs;