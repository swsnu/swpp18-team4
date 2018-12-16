import { TypeEnum } from './enums/type-enum.enum';
import { RegionEnum } from './enums/region-enum.enum';
import { ArbeitTypeEnum } from './enums/arbeit-type-enum.enum';
import { HowToPayEnum } from './enums/how-to-pay-enum.enum';

export class User {
  id: number;
  user_type: TypeEnum;
  email: string = null;
  password: string = null;
  nickname: string = null;
  employee_region: RegionEnum[] = null;
  employee_type: ArbeitTypeEnum[] = null;
  employee_how_to_pay: HowToPayEnum[] = null;
  employee_pay_limit: number = null;
  company_name: string = null;
  company_address: string = null;
  business_content: string = null;
  representative_name: string = null;
  employer_license_number: string = null;
  is_admin: boolean = null;
  is_active: boolean = null;
}
