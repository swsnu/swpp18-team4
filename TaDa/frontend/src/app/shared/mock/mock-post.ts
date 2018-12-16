import { User } from '../../core/models/user';
import { Post } from '../../core/models/post';

import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { ArbeitTypeEnum } from 'src/app/core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';

export const mock_posts: Post[] = [
  {
    id: 1,
    author_id: 1,
    author_name: 'aaa',
    title: 'title1',
    content: 'content1',
    region: RegionEnum.home,
    region_specific: '포항',
    arbeit_type: ArbeitTypeEnum.academy,
    timezone: [],
    how_to_pay: HowToPayEnum.pay_hourly,
    pay_per_hour: 10000,
    goods: null,
    register_date: null,
    last_modify_date: null,
    deadline: null,
    home_expect_time: null,
    is_magam_user: false,
    is_magam_timeout: false,
    is_same_person: false,
    latitude: null,
    longitude: null
  },

  {
    id: 2,
    author_id: 1,
    author_name: 'aaa',
    title: 'title2',
    content: 'content2',
    region: RegionEnum.extra,
    region_specific: '울산',
    arbeit_type: ArbeitTypeEnum.experiment_arbeit,
    timezone: [],
    how_to_pay: HowToPayEnum.goods,
    pay_per_hour: null,
    goods: '스타벅스',
    register_date: null,
    last_modify_date: null,
    deadline: null,
    home_expect_time: null,
    is_magam_user: true,
    is_magam_timeout: false,
    is_same_person: false,
    latitude: 35.524879,
    longitude: 129.344075
  },
  {
    id: 3,
    author_id: 2,
    author_name: 'bbb',
    title: 'title3',
    content: 'content3',
    region: RegionEnum.home,
    region_specific: '너네 집',
    arbeit_type: ArbeitTypeEnum.outsourcing,
    timezone: [],
    how_to_pay: HowToPayEnum.goods,
    pay_per_hour: null,
    goods: '스타벅스',
    register_date: null,
    last_modify_date: null,
    deadline: null,
    home_expect_time: null,
    is_magam_user: false,
    is_magam_timeout: false,
    is_same_person: false,
    latitude: null,
    longitude: null
  },
  {
    id: 4,
    author_id: 2,
    author_name: 'bbb',
    title: 'title4',
    content: 'content3',
    region: RegionEnum.home,
    region_specific: '너네 집',
    arbeit_type: ArbeitTypeEnum.outsourcing,
    timezone: [],
    how_to_pay: HowToPayEnum.goods,
    pay_per_hour: null,
    goods: '스타벅스',
    register_date: null,
    last_modify_date: null,
    deadline: null,
    home_expect_time: null,
    is_magam_user: false,
    is_magam_timeout: true,
    is_same_person: false,
    latitude: null,
    longitude: null
  }
];
