import React from 'react';
import Image from 'next/image';

export default function Login() {
  const login = (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="w-[25%]">
        <Image src="/logo.svg" alt="logo" width={188} height={46}/>

        <h2 className="text-2xl mt-2">Login</h2>

        <form onSubmit={login} className="w-full mt-1 space-y-[1.5em]">
          <div>
            <label className="label">Email</label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" />
          </div>
          <button className="button">Login</button>
        </form>
      </section>
    </main>
  );
}