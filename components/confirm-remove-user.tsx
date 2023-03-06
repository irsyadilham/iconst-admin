import type { NextPage } from 'next';
import { forwardRef } from 'react';
import type { User } from '../types/user';

type props = {
  user: User;
  remove(): void;
  cancel(): void;
};

const ConfirmRemoveUser = forwardRef<any, props>(({user, remove, cancel}, ref: any) => {
  return (
    <main ref={ref} className="fixed left-0 top-0 w-full h-screen hidden justify-center items-center bg-black/50 opacity-0">

      <section className="bg-white p-[2.3em] rounded-xl">
        <h2 className="text-primary">Are you sure?</h2>
        <p className="mt-[.5em]">Confirm to delete <span className="text-primary font-semibold">{user.name}</span></p>
        <div className="flex mt-1">
          <button onClick={cancel} className="text-sm text-gray font-semibold">Cancel</button>
          <button onClick={remove} className="bg-red-600 text-white text-sm py-[.7em] px-[1.3em] rounded-md ml-1">delete</button>
        </div>
      </section>

    </main>
  );
});

export default ConfirmRemoveUser;