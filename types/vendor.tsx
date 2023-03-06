import type { User } from './user';
import type { Address } from './address';
import type { Service } from './service';
import type { JobVendor } from './job';

export type CompanyDetails = {
  name: string;
  credential?: string;
}

export type PersonalDetails = {
  name: string;
  email: string;
  contactNo: number;
}

export type AirtimeStatus = {
  active: boolean;
  expired_date: string;
}

export type Vendor = {
  id: number;
  company_name: string;
  address: Address;
  services: Service[];
  coin: number;
  credential_file_url: string;
  rating: number;
  short_address: string;
  airtime_status: AirtimeStatus;
  approved: boolean;
  user: User;
  jobs: JobVendor[];
}