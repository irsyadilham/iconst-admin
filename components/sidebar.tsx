import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Clipboard from '../public/sidebar/clipboard';
import Settings from '../public/sidebar/settings';
import Client from '../public/sidebar/client';
import Vendor from '../public/sidebar/vendor';

export default function Sidebar() {

  return (
    <main className="w-[14%] border-r-[.5px] border-gray">
      <Image className="w-6" src="/logo.svg" alt="logo" width={188} height={46}/>

      <section className="space-y-[1.5em] mt-2">
        <Link href="/jobs" className="flex items-center">
          <Clipboard className="w-[1.2em] h-[1.2em]"/>
          <p className="ml-[.7em]">Jobs</p>
        </Link>
        <Link href="/vendors" className="flex items-center">
          <Vendor className="w-[1.2em] h-[1.2em]"/>
          <p className="ml-[.7em]">Vendors</p>
        </Link>
        <Link href="/clients" className="flex items-center">
          <Client className="w-[1.2em] h-[1.2em]"/>
          <p className="ml-[.7em]">Clients</p>
        </Link>
        <Link href="/settings" className="flex items-center">
          <Settings className="w-[1.2em] h-[1.2em]"/>
          <p className="ml-[.7em]">Settings</p>
        </Link>
      </section>
    </main>
  );
}