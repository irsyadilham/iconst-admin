import { useState } from 'react';
import Back from '../../components/back';
import { VendorList } from '../../interfaces/vendor';

export default function VendorApplicants() {
  const [applicants, setApplicants] = useState<VendorList[]>([]);

  return (
    <main className="p-4">
      <Back text="Vendors"/>
      <h2 className="text-2xl mt-2">New applicants</h2>

      <section className="grid grid-cols-3">

      </section>
    </main>
  );
}