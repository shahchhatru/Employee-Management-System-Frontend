export interface Attendence {
  _id: string;
  user?: string;
  organization?: string;
  date?: string;
  status: string;
  type?: string;
  token?: string;
}

export interface AttendenceResponse {
  status: string;
  message: string;
  data: Attendence;
}

export interface UserAttendenceResponse {
  status: string;
  message: string;
  data: UserAttendence[];
}

export interface UserAttendence {
  _id: string;
  user: User;
  organization: string;
  date: Date;
  status: string;
  type: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
