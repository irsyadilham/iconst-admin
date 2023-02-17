import React, { ReactNode } from 'react';
import Back from '../components/back';
import SettingSidebar from '../components/setting-sidebar';

type args = {
  children: ReactNode;
  page: string;
}

export default function SettingsContainer({children, page}: args) {

  return (
    <main className="flex items-center justify-center h-screen">
      <section className="w-3/6">
        <Back text="Back" route="/"/>
        
        <h2 className="text-2xl mt-2">Settings</h2>

        <section className="mt-3 flex">

          <SettingSidebar page={page}/>

          <section id="content" className="pl-3 border-light-gray border-l-[1px] w-8/12">
            
            {children}

          </section>
          {/* #content */}

        </section>
      </section>
    </main>
  );
}