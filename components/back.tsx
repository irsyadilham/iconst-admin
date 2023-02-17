import Image from 'next/image';
import { useRouter } from 'next/router';

type args = {
  text: string;
  route?: string;
}

export default function Back({text, route}: args) {
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