import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class Order extends BaseModel {
  customerID!: string;
  orderID!: string;

  constructor() {
    super();
    this.customerID = crypto.randomUUID();
    this.orderID = crypto.randomUUID();
  }
}
