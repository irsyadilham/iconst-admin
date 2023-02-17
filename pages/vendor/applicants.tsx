import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Back from '../../components/back';
import { get } from '../../functions/fetch';
import vendor from '../../types/vendor';
import Vendor from '../../components/vendor';

export default function VendorApplicants() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<vendor[]>([]);

  const getApplicants = async () => {
    try {
      const vendors: vendor[] = await get('/vendors');
      if (vendors.filter(vendor => !vendor.approved).length === 0) {
        router.push('/vendors');
      }
      setApplicants(vendors.filter(vendor => !vendor.approved));
    } catch (err: any) {
      
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