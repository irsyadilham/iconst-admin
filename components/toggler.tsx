import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type Args = {
  value: boolean;
  onChange(value: boolean): void;
}

const Toggler: NextPage<Args> = ({value, onChange}) => {

  const button = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState<boolean>(false);

  const toggler = () => {
    if (on) {
      gsap.to(button.current, { x: 0, ease: 'power3.out', duration: .3 });
      gsap.to(background.current, { backgroundColor: '#f5f5f4', ease: 'power3.out', duration: .3 });
    } else {
      gsap.to(button.current, { x: '100%', ease: 'power3.out', duration: .3 });
      gsap.to(background.current, { backgroundColor: '#4ade80', ease: 'power3.out', duration: .3 });
    }
    setOn(!on);
    onChange(!on);
  }

  useEffect(() => {
    setOn(value);
    if (value) {
      gsap.to(button.current, { x: '100%', duration: 0.1 });
      gsap.to(background.current, { backgroundColor: '#4ade80', duration: 0.1 })
    }
  }, []);

  return (
    <section ref={background} style={{backgroundColor: value ? '#4ade80' :'#f5f5f4' }} onClick={toggler} className="cursor-pointer border-neutral-200 border-[1px] h-[17.3px] box-border w-[30px] rounded-full relative">
      <div ref={button} className="h-[15px] w-[15px] rounded-full absolute bg-white shadow-toggle"/>
    </section>
  );
}

export default Toggler;