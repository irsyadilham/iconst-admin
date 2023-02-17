import React, { useRef, FormEvent } from 'react';
import SettingsContainer from '../../components/settings-container';
import { put } from '../../functions/fetch';

export default function ChangePassword() {

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
      await put('/change-password', data);
      password.current!.value = '';
      newPassword.current!.value = '';
      confirmPassword.current!.value = '';
    } catch (err: any) {
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