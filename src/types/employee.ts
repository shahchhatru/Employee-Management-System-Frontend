export interface Employee {
  _id?: string;
  designation: string;
  salary: number;
  joiningDate?: string;
  skillLevel?: string;
  user?: User;
  organizationId?: string;
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

export interface EmployeeInputType {
  designation?: string;
  salary?: number;
  joiningDate?: string;
  skills?: string;
  user?: string;
}

export interface EmployeeInputWithoutUserType {
  designation?: string;
  salary?: number;
  joiningDate?: string;
  skills?: string;
}

export interface EmployeeWithUserInputType
  extends EmployeeInputWithoutUserType {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  user?: string;
}

export interface EmployeeUpdateType {
  designation: string;
  salary: number;
  joiningDate?: string;
  skills?: string;
  user?: string;
}
export interface EmployeeResponse {
  status: string;
  message: string;
  data: Employee[];
}
