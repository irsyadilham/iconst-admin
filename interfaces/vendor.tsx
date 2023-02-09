export interface Address {
  line_1: string;
  line_2?: string;
  postcode: number;
  city: string;
  district: string;
  state: string;
}

export interface CompanyDetails {
  name: string;
  credential?: string;
}

export interface PersonalDetails {
  name: string;
  email: string;
  contactNo: number;
}

export interface Services {
  id: number;
  name: string;
}

export default interface Vendor {
  personalDetails: PersonalDetails | null; 
  companyDetails: CompanyDetails | null;
  companyAddress: Address | null;
  services: Services[];
  locations: string[];
}

export interface VendorList {
  company_name: string;
  address: Address;
  services: Services[];
  coin: number;
  credential_file_url: string;
  rating: number;
}