import Main from '../components/main';
import { VendorList } from '../interfaces/vendor';
import Vendor from '../components/vendor';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Vendors() {
  const [vendors, setVendors] = useState<VendorList[]>([]);

  const getVendors = async () => {
    try {
      const vendors = await fetch(`${process.env.HOST}/vendors`, {
        headers: { 'Accept': 'application/json' }
      });
      const res = await vendors.json();
      console.log(res);
      setVendors(res);
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <Main>
      <section className="flex">
        <h2 className="text-2xl">Vendors</h2>
        <Link href="/vendor/applicants" className="text-sm ml-1 py-[.5em] px-[.8em] font-semibold bg-primary text-white rounded-full">2 new applicants</Link>
      </section>

      <section className="grid grid-cols-3 gap-[1.5em] mt-2">
        {vendors.map((val, i) => {
          return <Vendor key={i} data={val}/>
        })}
      </section>
    </Main>
  );
}