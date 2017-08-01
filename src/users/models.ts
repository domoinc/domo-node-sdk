export interface User {
  name: string;
  email: string;
  role: string;
  title?: string;
  alternateEmail?: string;
  phone?:string;
  location?: string;
  timezone?: string;
  locale?: string;
  employeeNumber?: number;
}
