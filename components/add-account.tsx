import type { NextPage } from 'next';
import { forwardRef, useRef, FormEvent } from 'react';
import Image from 'next/image';
import type { User } from '../types/user';
import { post } from '../functions/fetch';

type props = {
  close(): void;
  addAccount(account: User): void;
};

const AddAccount = forwardRef<any, props>(({close, addAccount}, ref: any) => {

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const contactNo = useRef<HTMLInputElement>(null);
  const masterAdmin = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const data: User = {
      name: name.current!.value,
      email: email.current!.value,
      contact_no: contactNo.current!.value,
      master_admin: masterAdmin.current!.checked
    }
    try {
      const profile: User = await post('/users', data);
      name.current!.value = '';
      email.current!.value = '';
      contactNo.current!.value = '';
      masterAdmin.current!.checked = false;
      addAccount(profile);
      close(); 
    } catch (err: any) {
      alert('Failed to add account, please try again later');
    }
  }

  const closeModal = () => {
    name.current!.value = '';
    email.current!.value = '';
    contactNo.current!.value = '';
    masterAdmin.current!.checked = false;
    close();
  }

  return (
    <main ref={ref} className="fixed w-full left-0 top-0 items-center justify-center h-screen bg-white opacity-0 hidden translate-y-[100%]">

      <section id="container" className="w-2/6">

        <div className="flex justify-between">
          <h2 className="text-xl">Add account</h2>
          <button onClick={closeModal}>
            <Image src="/close.svg" alt="close" width={27} height={27}/>
          </button>
        </div>

        <form onSubmit={submit} className="mt-2">

          <div>
            <label className="label">Name</label>
            <input ref={name} required type="text" className="input" />
          </div>

          <div className="mt-1">
            <label className="label">Email</label>
            <input ref={email} required type="text" className="input" />
          </div>

          <div className="mt-1">
            <label className="label">Contact no</label>
            <input ref={contactNo} required type="text" className="input" />
          </div>

          <div className="mt-1 flex">
            <input ref={masterAdmin} type="checkbox" />
            <label className="label ml-[.7em]">Master admin</label>
          </div>

          <button className="button mt-2">Add account</button>

        </form>

      </section>
    </main>
  );
});

export default AddAccount;