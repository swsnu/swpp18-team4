import { User } from '../../core/models/user';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { ArbeitTypeEnum } from 'src/app/core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';

export const mock_users: User[] = [
    {
        user_type: TypeEnum.ER,
        email: 'mock-2@snu.ac.kr',
        password: 'mock-pw-1',
        nickname: 'mock-nickname-1',
        employee_region: [],
        employee_type: [],
        employee_how_to_pay: [],
        employee_pay_limit: null,
        company_name: 'mock-company-1',
        company_address: 'mock-address-1',
        business_content: 'welcome to mock-1 company!',
        representative_name: 'mock-name-1',
        employer_license_number: '123-123-123-1',
        //profile_image: 'mock-image-path-1',
        is_admin: false,
        is_active: false
    }
];