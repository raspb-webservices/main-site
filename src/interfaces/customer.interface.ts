export interface Customer {
  id: string;
  address?: string;
  auth0Id?: string;
  city?: string;
  company?: string;
  country?: string;
  createdAt?: string;
  email?: string;
  familyName?: string;
  givenName?: string;
  phone?: string;
  postCode?: string;
  salutation?: string;
  projects?: {
    id: string;
    name?: string;
  };
}
