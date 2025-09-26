export interface Customer {
  address?: string;
  auth0Id?: string;
  city?: string;
  company?: string;
  country?: string;
  createdAt?: String;
  email?: string;
  familyName: string;
  givenName?: string;
  id?: String;
  phone?: string;
  postCode?: string;
  projectIds?: string[];
  projects?: {
    id: String;
    name: String;
  };
  salutation?: string;
}
