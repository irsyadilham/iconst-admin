import type { NextPage } from 'next';

type args = {
  className: string;
}

const Notification: NextPage<args> = ({className}) => {
  return (
    <svg className={className} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.6 8.5V7.4C3.6 3.9 6.5 1 10 1C13.5 1 16.4 3.9 16.4 7.4V8.5C16.4 10.8 17.1 13.1 18.3 15L19 16.1H1L1.7 15C2.9 13 3.6 10.8 3.6 8.5Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.99956 20.25C9.08624 20.25 8.32159 19.6676 8.05278 18.85H11.9463C11.6775 19.6676 10.9129 20.25 9.99956 20.25Z" fill="black" stroke="" strokeWidth="1.3"/>
    </svg>
  );
}

export default Notification;