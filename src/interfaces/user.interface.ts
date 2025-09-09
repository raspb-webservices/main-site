export interface User {
  sub?: string;
  name?: string;
  nickname?: string;
  email: string;
  familyName?: string;
  givenName?: string;
  city?: string;
  company?: string;
  country?: string;
  phone?: string;
  postCode?: string;
  projectIds?: string[];
  salutation?: string;
  companyAddress?: string;
  createdAt?: string;
  password?: string;
  picture?: string;
  role?: string
}
