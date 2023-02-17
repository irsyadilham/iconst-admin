import { useState, useEffect } from 'react';
import Link from 'next/link';
import { get } from '../functions/fetch';
import Main from '../components/main';
import Vendor from '../components/vendor';
import vendor from '../types/vendor';

export default function Vendors() {
  const [vendors, setVendors] = useState<vendor[]>([]);

  const getVendors = async () => {
    try {
      const vendors = await get('/vendors');
      setVendors(vendors);
    } catch (err: any) {
      console.error(await err.json());
    }
  }

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <Main page="vendors">
      <section className="flex">
        <h2 className="text-2xl">Vendors</h2>
        {(() => {
          const applicants = vendors.filter(vendor => !vendor.approved);
          if (applicants.length > 0) {
            return <Link href="/vendor/applicants" className="text-sm ml-1 py-[.5em] px-[.8em] font-semibold bg-primary text-white rounded-full">{applicants.length} new applicants</Link>;
          }
        })()}
      </section>

      <section className="grid grid-cols-3 gap-[1.5em] mt-2">
        {vendors.filter(vendor => vendor.approved).map((val, i) => {
          return <Vendor key={i} data={val}/>
        })}
      </section>
    </Main>
  );
}