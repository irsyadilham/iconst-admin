import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/sidebar';

interface args {
  children: ReactNode;
}

export default function Main({children}: args) {

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      // router.push('/login');
    }
  }, []);

  return (
    <main className="p-2 box-border flex h-screen">
      <Sidebar/>
      <section className="w-[86%] pl-2 overflow-y-auto">
        {children}
      </section>
    </main>
  )
}
