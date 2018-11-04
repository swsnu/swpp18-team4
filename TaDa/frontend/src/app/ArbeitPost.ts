import { ArbeitRegionEnum } from './Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from './Enums/ArbeitTypeEnum';

export class ArbeitPost {
    id: number;
    author_id: number;
    title: string;
    content: string;
    region: ArbeitRegionEnum;
    arbeit_type: ArbeitTypeEnum;
    pay: number;
    time_zone: string[];
    manager_name: string;
    manager_phone: string;
    register_date: Date;
    edit_date: Date;
}
