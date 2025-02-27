import {User} from './user.constant';

export enum StatusType{
  PENDING= 'pending',
  COMPLETED= 'completed',
  ON_HOLD= 'on hold'
}
export interface Task {
  _id:string;
  name:string;
  description:string
  status:StatusType;
  assignedTo:User;
  createdBy:User;
}
