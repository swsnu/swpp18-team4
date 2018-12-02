import { RegionEnum } from "./enums/region-enum.enum";
import { ArbeitTypeEnum } from "./enums/arbeit-type-enum.enum";
import { HowToPayEnum } from "./enums/how-to-pay-enum.enum";

export interface Post {
    post_id: number;
    author_id: number;
    title: string;
    content: string;
    region: RegionEnum;
    region_specific: string;
    arbeit_type: ArbeitTypeEnum;
    timezone: Date[];
    how_to_pay: HowToPayEnum;
    pay_per_hour: number;
    goods: string;
    register_date: Date;
    last_modify_date: Date;
    deadline: Date;
    home_expected_time: number;
    is_magam_user: boolean;
    is_magam_timeout: boolean;
    is_same_person: boolean;
}
