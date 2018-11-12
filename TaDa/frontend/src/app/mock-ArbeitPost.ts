import { ArbeitRegionEnum } from './Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from './Enums/ArbeitTypeEnum';
import { ArbeitPost } from './Classes/ArbeitPost';

export const mockArbeitPost: ArbeitPost[] = [
  { id: 1,
    author_id: 1,
    title: 'mock title 1',
    content: 'mock content 1',
    region: ArbeitRegionEnum.SNUStation,
    arbeit_type: ArbeitTypeEnum.Cafe,
    pay: 9000,
    time_zone: ['10:00-15:00'],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: Date.prototype,
    edit_date: Date.prototype
  },
  { id: 2,
    author_id: 1,
    title: 'mock title 2',
    content: 'mock content 2',
    region: ArbeitRegionEnum.Extra,
    arbeit_type: ArbeitTypeEnum.IT,
    pay: 10000,
    time_zone: ['10:00-15:00'],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: Date.prototype,
    edit_date: Date.prototype
  },
  { id: 3,
    author_id: 1,
    title: 'mock title 3',
    content: 'mock content 3',
    region: ArbeitRegionEnum.Nokdu,
    arbeit_type: ArbeitTypeEnum.Design,
    pay: 20000,
    time_zone: ['10:00-15:00'],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: Date.prototype,
    edit_date: Date.prototype
  },
  { id: 4,
    author_id: 1,
    title: 'mock title 4',
    content: 'mock content 4',
    region: ArbeitRegionEnum.Nakdae,
    arbeit_type: ArbeitTypeEnum.Tutoring,
    pay: 40000,
    time_zone: ['10:00-15:00'],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: Date.prototype,
    edit_date: Date.prototype
  }
];
