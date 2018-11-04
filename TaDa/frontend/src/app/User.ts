import { UserTypeEnum } from './Enums/UserTypeEnum';

export class User {
  id: number;
  type: UserTypeEnum;
  email: string;
  password: string;
  name: string;
}
