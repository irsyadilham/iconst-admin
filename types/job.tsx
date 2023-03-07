import type { Service } from './service';
import type { Client } from './client';
import type { Vendor } from './vendor';
import type { Address } from './address';

type Status = {
  id: number;
  name: string;
}

export type SupportingDocument = {
  file_url: string;
}

export type Job = {
  id: number;
  date: string;
  title: string;
  description: string;
  rating: number;
  service: Service;
  client: Client;
  vendor_completed: boolean;
  client_completed: boolean;
  status: Status;
  vendors: JobVendor[];
  location: Address;
  supporting_documents: SupportingDocument[];
}

export type JobVendor = {
  id: number;
  price: string;
  quotation_url: string;
  job_details: Job;
  choosen: boolean;
  vendor: Vendor;
  approved: boolean;
}