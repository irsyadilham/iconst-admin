import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import { get } from '../../functions/fetch';
import type { Vendor as VendorType } from '../../types/vendor';
import Vendor from '../../components/vendor';

export default function VendorApplicants() {
  const context = useContext(AppContext);
  const router = useRouter();
  const [applicants, setApplicants] = useState<VendorType[]>([]);

  const getApplicants = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const vendors: VendorType[] = await get('/vendors');
      context?.loading.dispatch({type: 'OFF'});
      if (vendors.filter(vendor => !vendor.approved).length === 0) {
        router.push('/vendors');
      }
      setApplicants(vendors.filter(vendor => !vendor.approved));
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
    }
  }

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <main className="p-4">
      <Back text="Vendors"/>
      <h2 className="text-2xl mt-2">New applicants</h2>

      <section className="grid grid-cols-3 gap-[1.5em] mt-2">
        {applicants.map((vendor, i) => {
          return <Vendor key={i} data={vendor}/>
        })}
      </section>
    </main>
  );
}