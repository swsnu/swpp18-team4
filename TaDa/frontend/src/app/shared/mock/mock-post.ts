import { User } from '../../core/models/user';
import { Post } from '../../core/models/post';

import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { ArbeitTypeEnum } from 'src/app/core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';

export const mock_posts: Post[] = [
  {
    post_id: 1,
    author_id: 1,
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
    is_same_person: false
  },
  {
    post_id: 2,
    author_id: 1,
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
    is_magam_user: false,
    is_magam_timeout: false,
    is_same_person: false
  }
];
