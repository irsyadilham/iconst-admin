import { useState, useEffect } from 'react';
import Link from 'next/link';
import Profile from '../public/settings/profile';
import Padlock from '../public/settings/padlock';

interface args {
  page: string;
}

export default function SettingSidebar({page}: args) {

  const [isMasterAdmin, setIsMasterAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('master_admin')) {
      setIsMasterAdmin(true);
    }
  }, []);

  return (
    <section id="sidebar" className="space-y-2 pr-3 w-4/12">
      <Link className="flex items-center" href="/settings">
        <Profile className={`${page === 'profile' ? 'fill-primary' : 'fill-gray'}`}/>
        <p className={`ml-[.7em] ${page === 'profile' ? 'text-primary font-semibold' : 'text-gray'}`}>Profile</p>
      </Link>
      <Link className="flex items-center" href="/settings/change-password">
        <Padlock className={`${page === 'change password' ? 'fill-primary' : 'fill-gray'}`}/>
        <p className={`ml-[.7em] ${page === 'change password' ? 'text-primary font-semibold' : 'text-gray'}`}>Change password</p>
      </Link>
      {(() => {
        if (isMasterAdmin) {
          return (
            <Link className="flex items-center" href="/settings/accounts">
              <Padlock className={`${page === 'accounts' ? 'fill-primary' : 'fill-gray'}`}/>
              <p className={`ml-[.7em] ${page === 'accounts' ? 'text-primary font-semibold' : 'text-gray'}`}>Accounts</p>
            </Link>
          );
        }
      })()}
    </section>
  );
}