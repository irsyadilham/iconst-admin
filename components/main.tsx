import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/sidebar';
import User from '../types/user';
import { get } from '../functions/fetch';

type args = {
  children: ReactNode;
  page: string;
}

export default function Main({children, page}: args) {
  const router = useRouter();
  const [profile, setProfile] = useState<User>({
    name: '',
    email: '',
    contact_no: ''
  });

  const getProfile = async (userId: string) => {
    try {
      const profile: User = await get(`/users/${userId}`);
      setProfile(profile);
    } catch (err: any) {
      alert('Failed to fetch profile, please refresh');
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    getProfile(userId!);
    if (!userId) {
      router.push('/login');
    }
  }, []);

  return (
    <main className="p-2 box-border flex h-screen">
      <Sidebar page={page} profile={profile}/>
      <section className="w-[86%] pl-2 overflow-y-auto">
        {children}
      </section>
    </main>
  )
}
