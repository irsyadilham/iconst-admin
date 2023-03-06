import type { NextPage } from 'next';
import { useRef, FormEvent, useContext } from 'react';
import AppContext from '../../context/app';
import SettingsContainer from '../../components/settings-container';
import { put } from '../../functions/fetch';

const ChangePassword: NextPage = () => {
  const context = useContext(AppContext);
  const password = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const updatePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (newPassword.current?.value !== confirmPassword.current?.value) {
        alert('New password not match with new password');
        return;
      }
      const data = {
        password: password.current?.value,
        newPassword: newPassword.current?.value
      };
      context?.loading.dispatch({type: 'ON'});
      await put('/change-password', data);
      context?.loading.dispatch({type: 'OFF'});
      password.current!.value = '';
      newPassword.current!.value = '';
      confirmPassword.current!.value = '';
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      if (err.status === 400) {
        const data = await err.json();
        alert(data.message);
      }
    }
  }

  return (
    <SettingsContainer page="change password">
      <form onSubmit={updatePassword}>

        <div>
          <label className="label">Current password</label>
          <input ref={password} type="password" className="input" />
        </div>

        <div className="mt-1">
          <label className="label">New password</label>
          <input ref={newPassword} type="password" className="input" />
        </div>

        <div className="mt-1">
          <label className="label">Confirm password</label>
          <input ref={confirmPassword} type="password" className="input" />
        </div>

        <button className="button mt-2">Update password</button>

      </form>
    </SettingsContainer>
  );
}

export default ChangePassword;