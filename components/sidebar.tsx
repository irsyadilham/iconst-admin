import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { get } from '../functions/fetch';
import type { User } from '../types/user';

import Clipboard from '../public/sidebar/clipboard';
import Settings from '../public/sidebar/settings';
import Client from '../public/sidebar/client';
import Vendor from '../public/sidebar/vendor';
import Notification from '../public/sidebar/notification';

type args = {
  page: string;
  profile: User;
}

const Sidebar: NextPage<args> = ({page, profile}) => {

  const router = useRouter();
  const [unredNotifications, setUnreadNotifications] = useState<boolean>(false);

  const logout = async () => {
    try {
      await get('/logout');
      localStorage.clear();
      router.push('/login');
    } catch (err: any) {
      alert('failed to logout, please try again later');
    }
  }

  const getTotalNotifications = async () => {
    try {
      const unread: number = await get('/total-admin-notifications');
      setUnreadNotifications(unread === 1 ? true : false);
    } catch (err: any) {
      
    }
  }

  useEffect(() => {
    getTotalNotifications();
  }, []);

  return (
    <main className="w-[14%] border-r-[.5px] border-gray flex flex-col justify-between">
      <section id="top">
        <Image className="w-6" src="/logo.svg" alt="logo" width={188} height={46}/>

        <section className="space-y-[1.5em] mt-2">
          <Link href="/jobs" className="flex items-center">
            <Clipboard className={`w-[1.2em] h-[1.2em] ${page === 'jobs' ? 'fill-primary' : 'fill-gray'}`}/>
            <p className={`ml-[.7em] ${page === 'jobs' ? 'text-primary font-semibold' : 'text-gray'}`}>Jobs</p>
          </Link>
          <Link href="/vendors" className="flex items-center">
            <Vendor className={`w-[1.2em] h-[1.2em] ${page === 'vendors' ? 'fill-primary' : 'fill-gray'}`}/>
            <p className={`ml-[.7em] ${page === 'vendors' ? 'text-primary font-semibold' : 'text-gray'}`}>Vendors</p>
          </Link>
          <Link href="/clients" className="flex items-center">
            <Client className={`w-[1.2em] h-[1.2em] ${page === 'clients' ? 'fill-primary' : 'fill-gray'}`}/>
            <p className={`ml-[.7em] ${page === 'clients' ? 'text-primary font-semibold' : 'text-gray'}`}>Clients</p>
          </Link>
          <Link href="/notifications" className="flex items-center">
            <div className="flex items-center">
              <Notification className={`w-[1.2em] h-[1.2em] ${page === 'notifications' ? 'stroke-primary' : 'stroke-gray'}`}/>
              <p className={`ml-[.7em] ${page === 'notifications' ? 'text-primary font-semibold' : 'text-gray'}`}>Notifications</p>
            </div>
            {(() => {
              if (unredNotifications) {
                return <div className="ml-[.5em] w-[.45em] h-[.45em] bg-primary rounded-full"/>
              }
            })()}
          </Link>
          <Link href="/settings" className="flex items-center">
            <Settings className="w-[1.2em] h-[1.2em]"/>
            <p className={`ml-[.7em] ${page === 'settings' ? 'text-primary font-semibold' : 'text-gray'}`}>Settings</p>
          </Link>
        </section>
      </section>
      {/* #top */}

      <section>
        <h4 className="text-gray">{profile.name}</h4>
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </section>
    </main>
  );
}

export default Sidebar;