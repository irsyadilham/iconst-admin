import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

type args = {
  text: string;
  route?: string;
}

const Back: NextPage<args> = ({text, route}) => {
  const router = useRouter();

  const back = () => {
    if (route) {
      router.push(route);
    } else {
      router.back();
    }
  }

  return (
    <section onClick={back} className="flex cursor-pointer">
      <Image src="/back.svg" alt="back" width={39} height={22}/>
      <p className="text-primary text-sm ml-[.8em]">{text}</p>
    </section>
  );
}

export default Back;