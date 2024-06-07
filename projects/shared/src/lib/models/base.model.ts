export class BaseModel {
  recID!: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;

  constructor() {
    this.recID = '00000000-0000-0000-0000-000000000000';
    this.createdBy = '';
    this.createdOn = new Date();
    this.modifiedBy = '';
    this.modifiedOn = new Date();
  }
}
