import type { NextPage } from 'next';
import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getNoToken } from '../functions/fetch';

const Login: NextPage = () => {
  
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const login = await getNoToken(`/login?ec=${email.current?.value}&p=${password.current?.value}`);
      if (login.master_admin) {
        localStorage.setItem('master_admin', 'true');
      }
      localStorage.setItem('user_id', login.user_id.toString());
      localStorage.setItem('token', login.token);
      router.push('/jobs');
    } catch (err: any) {
      if (err.status === 404) {
        alert('User not exists, please enter correct email or contact no');
        return;
      } else if (err.status === 401) {
        alert('Incorrect password, please try again');
        return;
      }
    }
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <section className="w-[25%]">
        <Image src="/logo.svg" alt="logo" width={188} height={46}/>

        <h2 className="text-2xl mt-2">Login</h2>

        <form onSubmit={login} className="w-full mt-1 space-y-[1.5em]">
          <div>
            <label className="label">Email</label>
            <input ref={email} type="email" className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input ref={password} type="password" className="input" />
          </div>
          <button className="button">Login</button>
        </form>
      </section>
    </main>
  );
}

export default Login;