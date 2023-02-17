import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import User from '../../types/user';
import { get, del } from '../../functions/fetch';
import { gsap } from 'gsap';

import SettingsContainer from '../../components/settings-container';
import ConfirmRemoveUser from '../../components/confirm-remove-user';
import AddAccount from '../../components/add-account';

export default function Accounts() {

  const [accounts, setAccounts] = useState<User[]>([]);
  const addAccountModal = useRef<HTMLDivElement>(null);
  const deleteModal = useRef<HTMLDivElement>(null);
  const [accToDel, setAccToDel] = useState<User>({name: '', email: '', contact_no: ''});

  const getAdminAccounts = async () => {
    try {
      const accounts: User[] = await get('/users');
      setAccounts(accounts.filter(acc => acc.email !== 'irsyadmhdilham@gmail.com'));
    } catch (err: any) {
      console.log(err);
    }
  }

  const openAddAccountModal = () => {
    addAccountModal.current?.classList.remove('hidden');
    addAccountModal.current?.classList.add('flex');
    gsap.to(addAccountModal.current, { y: 0, opacity: 1, ease: 'power3.out' });
  }

  const closeAddAccountModal = () => {
    gsap.to(addAccountModal.current, { y: '100%', opacity: 0, ease: 'power3.out' });
    setTimeout(() => {
      addAccountModal.current?.classList.remove('flex');
      addAccountModal.current?.classList.add('hidden');
    }, 400);
  }

  const addAccount = (account: User) => {
    setAccounts(state => {
      return [...state, account];
    });
  }

  const deleteUser = (account: User) => {
    setAccToDel(account);
    deleteModal.current?.classList.remove('hidden');
    deleteModal.current?.classList.add('flex');
    gsap.to(deleteModal.current, { opacity: 1, ease: 'power3.out' });
  }

  const cancelDelete = () => {
    gsap.to(deleteModal.current, { opacity: 0, ease: 'power3.out' });
    setTimeout(() => {
      deleteModal.current?.classList.remove('flex');
      deleteModal.current?.classList.add('hidden');
    }, 400);
  }

  const confirmDeleteUser = async () => {
    try {
      await del(`/users/${accToDel.id}`);
      const x = accounts.map(val => val.id).indexOf(accToDel.id);
      const arr = [...accounts];
      arr.splice(x, 1);
      setAccounts(arr);
      cancelDelete();
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAdminAccounts();
  }, []);

  return (
    <SettingsContainer page="accounts">

      <section className="flex justify-between items-center">
        <h2 className="text-xl">Accounts</h2>
        <button onClick={openAddAccountModal} className="button-fitted text-sm">Add account</button>
      </section>
      <p>Default password: abc123456</p>

      <section className="space-y-[1.2em] mt-2">
        {accounts.map((account, i) => {
          return (
            <div key={i} className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="text-primary">{account.name}</h4>
                  {(() => {
                    if (account.master_admin) {
                      return <p className="ml-[.5em] text-sm">(Master)</p>;
                    }
                  })()}
                </div>
                <p>{account.email}</p>
              </div>
              <button onClick={() => deleteUser(account)}>
                <Image className="w-[1.2em]" src="/trash.svg" alt="trash" width={14} height={14}/>
              </button>
            </div>
          )
        })}
      </section>
      
      <AddAccount ref={addAccountModal} addAccount={addAccount} close={closeAddAccountModal}/>

      <ConfirmRemoveUser ref={deleteModal} user={accToDel} remove={confirmDeleteUser} cancel={cancelDelete}/>

    </SettingsContainer>
  );
}