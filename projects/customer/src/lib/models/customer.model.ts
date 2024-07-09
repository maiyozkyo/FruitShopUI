import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class CUCustomer extends BaseModel {
  name!: string;
  nickName!: string;
  phone!: string;
  address!: string;
  note!: string;

  constructor() {
    super();
  }
}
