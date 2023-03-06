import type { Job } from '../types/job';

type Result = {
  text: string;
  color: string;
}

export const jobStatus = (job: Job): Result => {
  if (job.vendor_completed && job.client_completed) {
    return {
      text: 'Completed',
      color: '#49D380'
    };
  } else if (job.status.name === 'Request') {
    return {
      text: 'Request',
      color: '#353CE4'
    };
  } else if (job.status.name === 'Cancelled') {
    return {
      text: 'Cancelled',
      color: '#EA2518'
    };
  } else {
    return {
      text: 'Running',
      color: '#228ECA'
    };
  }
}