import type { User } from './user';
import type { Job } from './job';

export type Client = {
  id: number;
  user: User;
  jobs: Job[];
  suspended: boolean;
}