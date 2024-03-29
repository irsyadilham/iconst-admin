import type { Address } from './address';

export type User = {
  id?: number;
  name: string;
  contact_no: string;
  email: string;
  master_admin?: boolean;
  address?: Address;
}