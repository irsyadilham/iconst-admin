import Back from '../components/back';
import Link from 'next/link';
import Profile from '../public/settings/profile';
import Padlock from '../public/settings/padlock';

export default function Settings() {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="w-1/2">
        <Back text="Back"/>
        
        <h2 className="text-2xl mt-2">Settings</h2>

        <section className="mt-1 flex">

          <section id="sidebar" className="space-y-[1.5em]">
            <Link className="flex items-center" href="">
              <Profile/>
              <p className="ml-[.7em]">Profile</p>
            </Link>
            <Link className="flex items-center" href="">
              <Padlock/>
              <p className="ml-[.7em]">Change password</p>
            </Link>
          </section>
          {/* #sidebar */}

          <section id="content">
            
          </section>
          {/* #content */}

        </section>
      </section>
    </main>
  );
}