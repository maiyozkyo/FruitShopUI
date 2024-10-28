import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class UserCustomer extends BaseModel {
  name!: string;
  phone!: string;
}
