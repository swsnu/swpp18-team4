import { UserTypeEnum } from './Enums/UserTypeEnum';
import { ArbeitTypeEnum } from "./Enums/ArbeitTypeEnum";
import { ArbeitRegionEnum } from "./Enums/ArbeitRegionEnum";

export class User {
  id: number;
  type: UserTypeEnum;
  email: string;
  password: string;
  name: string;
}

export class Employee {
  employee_id: number;
  region: ArbeitRegionEnum;
  //timezone:
  arbeit_type: ArbeitTypeEnum;
}

export class Employer {
  employer_id: number;
  company_name: string;
  company_address: string
  business_content: string;
  representative_name: string;
  representative_phonenumber: string;
}
