import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../context/app';
import Back from '../components/back';
import type { Notification } from '../types/notification';
import { get, put } from '../functions/fetch';

const Notifications: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const notifications: Notification[] = await get('/notifications/admin');
      context?.loading.dispatch({type: 'OFF'});
      setNotifications(notifications);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
    }
  }

  const bgColor = (read: boolean) => {
    if (!read) {
      return '#faf5ff';
    }
    return '';
  }

  const navigate = (notification: Notification) => {
    const push = (url: string) => {
      if (!notification.read) {
        router.push({
          pathname: url,
          query: {
            notification: true,
            notification_id: notification.id
          }
        });
        return;
      }
      router.push(url);
    }
    const notificationType = notification.notification_type.name;
    if (notificationType === 'quotation submitted') {
      push(`/jobs/${notification.job.id}`);
    }
  }

  const markAsRead = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const notifications: Notification[] = await put('/notifications-admin-clear', {});
      context?.loading.dispatch({type: 'OFF'});
      setNotifications(notifications);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to mark as read, please try again later');
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <main className="container mt-4">
      <Back text="Main page"/>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-2xl">Notifications</h2>
        <button onClick={markAsRead} className="text-primary text-sm">Mark all read</button>
      </div>

      <section className="mt-2 space-y-[1.5em]">
        {notifications.map((val, i) => {
          return (
            <div onClick={() => navigate(val)} style={{backgroundColor: bgColor(val.read)}} key={i} className="cursor-pointer py-1 px-[1.3em]">
              <p className="text-[.75rem]">{val.date}</p>
              {(() => {
                const notificationType = val.notification_type.name;
                if (notificationType === 'quotation submitted') {
                  return <p className="mt-[.3em] text-black">New quotation submitted for job <span className="text-primary font-semibold">{val.job.title}</span></p>
                }
              })()}
            </div>
          )
        })}
      </section>
    </main>
  );
}

export default Notifications ;