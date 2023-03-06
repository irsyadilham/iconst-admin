import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Profile from '../public/settings/profile';
import Padlock from '../public/settings/padlock';
import Accounts from '../public/settings/accounts';
import Air from '../public/settings/air';

interface args {
  page: string;
}

const SettingSidebar: NextPage<args> = ({page}) => {

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
            <>
              <Link className="flex items-center" href="/settings/accounts">
                <Accounts className={`${page === 'accounts' ? 'stroke-primary' : 'stroke-gray'} w-[1.4em]`}/>
                <p className={`ml-[.7em] ${page === 'accounts' ? 'text-primary font-semibold' : 'text-gray'}`}>Accounts</p>
              </Link>
              <Link className="flex items-center" href="/settings/airtimes">
                <Air className={`${page === 'airtimes' ? 'fill-primary' : 'fill-gray'} w-1`}/>
                <p className={`ml-[.7em] ${page === 'airtimes' ? 'text-primary font-semibold' : 'text-gray'}`}>Airtimes</p>
              </Link>
            </>
          );
        }
      })()}
    </section>
  );
}

export default SettingSidebar;