import { useState } from 'react';
import Back from '../../components/back';

export default function Vendor() {
  const [companyName, setCompanyName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [services, setServices] = useState<string[]>([]);
  
  return (
    <main className="flex items-center justify-center">
      <section>
        <Back text="Vendors"/>
        
        <h2 className="text-2xl">{companyName}</h2>
      </section>
    </main>
  );
}