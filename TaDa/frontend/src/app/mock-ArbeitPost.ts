import { ArbeitRegionEnum } from './Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from './Enums/ArbeitTypeEnum';
import { ArbeitPost } from './Classes/ArbeitPost';
import { Time } from "./Classes/TimeZone";

export const mockArbeitPost: ArbeitPost[] = [
  { id: 1,
    author_id: 1,
    title: 'mock title 1',
    content: 'mock content 1 A',
    region: ArbeitRegionEnum.SNUStation,
    arbeit_type: ArbeitTypeEnum.Cafe,
    pay: 9000,
    time_zone: [
      {
        month: 11, date:  14, day: 3,
        start: {hour: 5, minute: 1},
        end: {hour: 10, minute: 1}
      }
    ],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: new Date(2018, 10, 27),
    edit_date: Date.prototype,
    star: 1.2
  },


  { id: 2,
    author_id: 1,
    title: 'mock title 2',
    content: 'mock content 2 B',
    region: ArbeitRegionEnum.Extra,
    arbeit_type: ArbeitTypeEnum.IT,
    pay: 50000,
    time_zone: [
      {
        month: 11, date:  22, day: 3,
        start: {hour: 16, minute: 1},
        end: {hour: 20, minute: 1}
      }
    ],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: new Date(2018, 7, 9),
    edit_date: Date.prototype,
    star: 10
  },
  { id: 3,
    author_id: 1,
    title: 'mock title 3',
    content: 'mock content 3 C',
    region: ArbeitRegionEnum.Nokdu,
    arbeit_type: ArbeitTypeEnum.Design,
    pay: 7500,
    time_zone: [
      {
        month: 11, date:  29, day: 3,
        start: {hour: 16, minute: 1},
        end: {hour: 20, minute: 1}
      }
    ],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: new Date(2018, 11, 9),
    edit_date: Date.prototype,
    star: 3.2
  },

  { id: 4,
    author_id: 1,
    title: 'mock title 4',
    content: 'mock content 4',
    region: ArbeitRegionEnum.Nakdae,
    arbeit_type: ArbeitTypeEnum.Tutoring,
    pay: 40000,
    time_zone: [
      {
        month: 11, date:  20, day: 1,
        start: {hour: 16, minute: 1},
        end: {hour: 20, minute: 1}
      }
    ],
    manager_name: '메니저이름',
    manager_phone: '010-1234-1234',
    register_date: new Date(2018, 10, 18),
    edit_date: Date.prototype,
    star: 7.3
  }
];
