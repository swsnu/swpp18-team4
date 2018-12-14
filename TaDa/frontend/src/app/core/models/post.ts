import { RegionEnum } from './enums/region-enum.enum';
import { ArbeitTypeEnum } from './enums/arbeit-type-enum.enum';
import { HowToPayEnum } from './enums/how-to-pay-enum.enum';

export class Post {
    post_id: number;
    author_id: number;
    title: string = null;
    content: string = null;
    region: RegionEnum = null;
    region_specific: string = null;
    arbeit_type: ArbeitTypeEnum = null;
    timezone: Date[] = null;
    how_to_pay: HowToPayEnum = null;
    pay_per_hour: number = null;
    goods: string = null;
    register_date: Date = null;
    last_modify_date: Date = null;
    deadline: Date = null;
    home_expected_time: number = null;
    is_magam_user: boolean = null;
    is_magam_timeout: boolean = null;
    is_same_person: boolean = null;
}
