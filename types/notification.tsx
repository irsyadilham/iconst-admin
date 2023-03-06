import type { Job } from './job';

type NotificationType = {
  id: number;
  name: string;
}

export type Notification = {
  id: number;
  date: string;
  user_id: number;
  notification_type: NotificationType;
  job: Job;
  read: boolean;
}