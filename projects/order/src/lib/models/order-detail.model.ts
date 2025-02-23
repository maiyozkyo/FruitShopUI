import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class OROrderDetail extends BaseModel {
  orderRecID!: string;
  productRecID!: string;
  quantity!: number;
  tare!: number;
  price!: number;
  saleOff!: number;

  constructor() {
    super();
  }
}
