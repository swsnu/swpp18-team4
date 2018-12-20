import { User } from '../../core/models/user';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { ArbeitTypeEnum } from 'src/app/core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';

export const mock_users: User[] = [
    {
        id: 1,
        user_type: TypeEnum.ER,
        email: 'mock-1@snu.ac.kr',
        password: 'mock-pw-1',
        nickname: 'mock-nickname-1',
        employee_region: [RegionEnum.home, RegionEnum.snu],
        employee_type: [],
        employee_how_to_pay: [HowToPayEnum.pay_hourly],
        employee_pay_limit: null,
        company_name: 'mock-company-1',
        company_address: 'mock-address-1',
        business_content: 'welcome to mock-1 company!',
        representative_name: 'mock-name-1',
        employer_license_number: '123-123-123-1',
        is_admin: false,
        is_active: false
    },
    {
        id: 2,
        user_type: TypeEnum.EE,
        email: 'mock-2@snu.ac.kr',
        password: 'mock-pw-2',
        nickname: null,
        employee_region: [],
        employee_type: [],
        employee_how_to_pay: [],
        employee_pay_limit: null,
        company_name: null,
        company_address: null,
        business_content: null,
        representative_name: null,
        employer_license_number: null,
        is_admin: false,
        is_active: false
    }
];
