import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class Order extends BaseModel {
  customerRecID!: string;

  constructor() {
    super();
  }
}
