import { TypeEnum } from './enums/type-enum.enum';
import { RegionEnum } from './enums/region-enum.enum';
import { ArbeitTypeEnum } from './enums/arbeit-type-enum.enum';
import { HowToPayEnum } from './enums/how-to-pay-enum.enum';

export class User {
  id?: number;
  user_type: TypeEnum;
  email: string;
  password: string;
  nickname: string;
  employee_region: RegionEnum[];
  employee_type: ArbeitTypeEnum[];
  employee_how_to_pay: HowToPayEnum[];
  employee_pay_limit: number;
  company_name: string;
  company_address: string;
  business_content: string;
  representative_name: string;
  employer_license_number: string;
  profile_image: string; // modify
  is_admin: boolean;
  is_active: boolean;
}
