export interface Salary {
  _id?: string;
  baseAmount: number;
  bonus: number;
  tax: number;
  pf: number;
  netAmount: number;
  user: string;
  month: string;
  year: string;
  organization: string;
  employee?: string;
}

export interface SalaryStateInputs {
  baseAmount?: number;
  bonus?: number;
  tax?: number;
  pf?: number;
  netAmount?: number;
  user?: string;

  month?: string;
  year?: string;
  organization?: string;
}

export interface SalaryInput {
  employee: string;
  month: string;
  year: string;
}

export interface SalaryResponse {
  status: string;
  message: string;
  data: Salary[];
}
