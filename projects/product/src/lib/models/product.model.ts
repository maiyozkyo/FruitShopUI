import { BaseModel } from 'projects/shared/src/lib/models/base.model';

export class PRProduct extends BaseModel {
  code: string = '';
  name: string = '';
  isActive: boolean = true;
  img!: string;
}
