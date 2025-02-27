export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'Employee' | 'Team Lead' | 'Manager';
}
