export class BaseModel {
  recID!: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;

  constructor() {
    this.recID = crypto.randomUUID();
    this.createdBy = '';
    this.createdOn = new Date();
    this.modifiedBy = '';
    this.modifiedOn = new Date();
  }
}
