export interface User {
  sub?: string;
  name?: string;
  nickname?: string;
  email?: string;
  salutation?: string;
  familyName?: string;
  givenName?: string;
  company?: string;
  postCode?: string;
  city?: string;
  address?: string;
  country?: string;
  phone?: string;
  projectIds?: string[];
  createdAt?: string;
  password?: string;
  picture?: string;
  role?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
}
