import User from './user';

export type Address = {
  line_1: string;
  line_2?: string;
  postcode: number;
  city: string;
  district: string;
  state: string;
}

export type CompanyDetails = {
  name: string;
  credential?: string;
}

export type PersonalDetails = {
  name: string;
  email: string;
  contactNo: number;
}

export type Service = {
  id: number;
  name: string;
}

export type AirtimeStatus = {
  active: boolean;
  expired_date: string;
}

export type stateKey = 'JHR' | 'KDH' | 'KTN' | 'KUL' | 'LBN' | 'MLK' | 'NSN' | 'PHG' | 'PJY' | 'PLS' | 'PNG' | 'PRK' | 'SBH' | 'SGR' | 'SRW' | 'TRG';

type Vendor = {
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
}

export default Vendor;