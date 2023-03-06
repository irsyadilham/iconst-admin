import type { NextPage } from 'next';
import { useRef, useEffect, FormEvent, useContext } from 'react';
import AppContext from '../../context/app';
import { put, get } from '../../functions/fetch';
import type { User } from '../../types/user';

import SettingsContainer from '../../components/settings-container';

const Settings: NextPage = () => {
  const context = useContext(AppContext);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const contactNo = useRef<HTMLInputElement>(null);

  const update = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data: User = {
        name: name.current!.value,
        email: email.current!.value,
        contact_no: contactNo.current!.value,
      };
      context?.loading.dispatch({type: 'ON'});
      await put(`/users/${localStorage.getItem('user_id')}`, data);
      context?.loading.dispatch({type: 'OFF'});
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to update, please try again later');
    }
  }

  const getProfile = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const data: User = await get(`/users/${localStorage.getItem('user_id')}`);
      context?.loading.dispatch({type: 'OFF'});
      name.current!.value = data.name;
      email.current!.value = data.email;
      contactNo.current!.value = data.contact_no;
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
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

export default Settings;