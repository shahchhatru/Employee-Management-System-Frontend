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
