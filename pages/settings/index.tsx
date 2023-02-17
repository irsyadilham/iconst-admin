import React, { useRef, useEffect } from 'react';
import { put, get } from '../../functions/fetch';
import User from '../../types/user';

import SettingsContainer from '../../components/settings-container';

export default function Settings() {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const contactNo = useRef<HTMLInputElement>(null);

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: User = {
        name: name.current!.value,
        email: email.current!.value,
        contact_no: contactNo.current!.value,
      };
      await put(`/users/${localStorage.getItem('user_id')}`, data);
    } catch (err: any) {
      alert('Failed to update, please try again later');
    }
  }

  const getProfile = async () => {
    try {
      const data: User = await get(`/users/${localStorage.getItem('user_id')}`);
      name.current!.value = data.name;
      email.current!.value = data.email;
      contactNo.current!.value = data.contact_no;
    } catch (err: any) {
      alert('Failed to get information, please try again later');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SettingsContainer page="profile">
          
      <form onSubmit={update}>

        <div>
          <label className="label">Name</label>
          <input ref={name} required className="input" type="text" />
        </div>

        <div className="mt-1">
          <label className="label">Email</label>
          <input ref={email} required className="input" type="email" />
        </div>

        <div className="mt-1">
          <label className="label">Contact no</label>
          <input ref={contactNo} required className="input" type="number" />
        </div>

        <button className="button mt-2">Update</button>

      </form>

    </SettingsContainer>
  );
}