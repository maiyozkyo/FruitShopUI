import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class OROrder extends BaseModel {
  customerRecID!: string;

  constructor() {
    super();
  }
}
