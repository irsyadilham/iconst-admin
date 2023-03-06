import type { NextPage } from 'next';
import AppContext from '../../context/app';
// import Image from 'next/image';
import { useState, useEffect, useRef, FormEvent, useContext } from 'react';
import type { Airtime } from '../../types/airtime';
import { get, put } from '../../functions/fetch';
import SettingsContainer from '../../components/settings-container';
import Toggler from '../../components/toggler';
import { gsap } from 'gsap';

const Airtimes: NextPage = () => {
  const context = useContext(AppContext);
  const [airtimes, setAirtimes] = useState<Airtime[]>([]);
  const [modifyWhat, setModifyWhat] = useState<string>('validity');
  const [airtime, setAirtime] = useState<Airtime>();
  const modal = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const getAirtimes = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const airtimes: Airtime[] = await get('/airtimes');
      context?.loading.dispatch({type: 'OFF'});
      setAirtimes(airtimes);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to get airtimes, please try again later');
    }
  }

  const promoHandler = async (val: boolean, id: number) => {
    try {
      await put(`/airtimes/${id}/change-promo-status`, { status: val });
    } catch (err: any) {
      alert('Failed to change, please try again later');
    }
  }

  const hideHandler = async (val: boolean, id: number) => {
    try {
      await put(`/airtimes/${id}/change-hide-status`, { status: val });
    } catch (err: any) {
      alert('Failed to change, please try again later');
    }
  }

  const changeDetails = (airtime: Airtime, section: string) => {
    setAirtime(airtime);
    setModifyWhat(section);
    if (section === 'Validity') {
      input.current!.value = airtime.validity.toString();
    } else if (section === 'Price') {
      input.current!.value = airtime.price;
    } else if (section === 'Promo price') {
      input.current!.value = airtime.promo_price!;
    }
    modal.current?.classList.remove('hidden');
    modal.current?.classList.add('flex');
    gsap.to(modal.current, { opacity: 1, ease: 'power3.out' });
  }

  const closeChangeDetails = () => {
    gsap.to(modal.current, { opacity: 0, ease: 'power3.out', onComplete() {
      modal.current?.classList.remove('flex');
      modal.current?.classList.add('hidden');
    }});
  }

  const submitChangeDetails = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        section: modifyWhat,
        value: input.current?.value
      };
      context?.loading.dispatch({type: 'ON'});
      const res: Airtime = await put(`/airtimes/${airtime?.id}/change-details`, data);
      context?.loading.dispatch({type: 'OFF'});
      const arr = [...airtimes];
      const obj = arr.find(val => val.id === airtime?.id);
      const i = arr.map(val => val.id).indexOf(obj!.id);
      arr.splice(i, 1, res);
      setAirtimes(arr);
      closeChangeDetails();
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to change details, please try again later');
    }
  }

  useEffect(() => {
    getAirtimes();
  }, []);

  return (
    <>
      <SettingsContainer page="airtimes">
        <h2 className="text-xl">Airtimes</h2>

        <table className="bg-white p-1 shadow-normal rounded-lg mt-1">
          <tbody>
            <tr className="border-b-[1px] border-light-gray">
              <th className="table-th">Validity (days)</th>
              <th className="table-th">Price</th>
              <th className="table-th">Promo price</th>
              <th className="table-th">Promo</th>
              <th className="table-th">Hide</th>
              <th className="table-th">Subscriber</th>
              {/* <th></th> */}
            </tr>
            {airtimes.map((val, i) => {
              return (
                <tr className={(i+1) % 2 === 0 ? 'bg-neutral-100' : ''} key={i}>
                  <td onClick={() => changeDetails(val, 'Validity')} className="table-td cursor-pointer hover:text-primary hover:font-semibold transition">{val.validity}</td>
                  <td onClick={() => changeDetails(val, 'Price')} className="table-td cursor-pointer hover:text-primary hover:font-semibold transition">RM{val.price}</td>
                  <td onClick={() => changeDetails(val, 'Promo price')} className="table-td cursor-pointer hover:text-primary hover:font-semibold transition">{val.promo_price ? `RM${val.promo_price}` : 'None'}</td>
                  <td className="table-td"><Toggler onChange={on => promoHandler(on, val.id)} value={val.promo_active}/></td>
                  <td className="table-td"><Toggler onChange={on => hideHandler(on, val.id)} value={val.hide} /></td>
                  <td className="table-td">{val.total_subscribers}</td>
                  {/* <td>
                    <button className="w-3">
                      <Image src="/trash.svg" className="w-1 mx-auto" alt="trash" width={14} height={14}/>
                    </button>
                  </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>

      </SettingsContainer>

      <section ref={modal} className="fixed bg-black/50 top-0 left-0 w-full h-screen items-center justify-center opacity-0 hidden">

      
        <form onSubmit={submitChangeDetails} className="p-2 rounded-lg w-3/12 bg-white">

          <h2 className="text-primary text-xl mb-1">Modify</h2>
          
          <div>
            <label className="label">{modifyWhat}</label>
            <input ref={input} className="input" type="number"/>
          </div>

          <button className="button mt-[1.5em]">Update</button>

          <button onClick={closeChangeDetails} type="button" className="text-center w-full mt-1 font-semibold text-gray text-sm">Cancel</button>

        </form>

      </section>
    </>
  );
}

export default Airtimes;