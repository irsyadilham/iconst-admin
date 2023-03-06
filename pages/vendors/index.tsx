import type { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/app';
import Link from 'next/link';
import { get } from '../../functions/fetch';
import Main from '../../components/main';
import Vendor from '../../components/vendor';
import type { Vendor as VendorType } from '../../types/vendor';

const Vendors: NextPage = () => {
  const [vendors, setVendors] = useState<VendorType[]>([]);
  const context = useContext(AppContext);

  const getVendors = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const vendors: VendorType[] = await get('/vendors');
      context?.loading.dispatch({type: 'OFF'});
      setVendors(vendors);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve vendor, please try again later');
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
            return <Link href="/vendors/applicants" className="text-sm ml-1 py-[.5em] px-[.8em] font-semibold bg-primary text-white rounded-full">{applicants.length} new applicants</Link>;
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

export default Vendors;