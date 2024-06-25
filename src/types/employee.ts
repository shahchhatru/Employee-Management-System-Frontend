export interface Employee {
  _id?: string;
  designation: string;
  salary: number;
  joiningDate?: string;
  skillLevel?: string;
  user?: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  isVerified: boolean;
}

export interface EmployeeInputType {
  designation?: string;
  salary?: number;
  joiningDate?: string;
  skills?: string;
  user?: string;
}
export interface EmployeeWithUserInputType extends EmployeeInputType {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
}

export interface EmployeeUpdateType {
  designation: string;
  salary: number;
  joiningDate?: string;
  skills?: string;
  user?: string;
}
export interface EmployeeResponse {
  status?: string;
  message: string;
  data: Employee[];
}
