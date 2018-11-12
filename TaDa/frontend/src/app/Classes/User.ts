import { UserTypeEnum } from '../Enums/UserTypeEnum';
import { ArbeitTypeEnum } from '../Enums/ArbeitTypeEnum';
import { ArbeitRegionEnum } from '../Enums/ArbeitRegionEnum';

export class User {
  id: number;
  type: UserTypeEnum;
  email: string;
  password: string;
  name: string;
}

export class Employee {
  id: number;
  arbeit_region: ArbeitRegionEnum[];
  arbeit_type: ArbeitTypeEnum[];
  timezone: string[];
}

export class Employer {
  id: number;
  company_name: string;
  company_address: string;
  business_content: string;
  representative_name: string;
  representative_phonenumber: string;
}
