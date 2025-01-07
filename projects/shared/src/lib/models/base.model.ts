export class BaseModel {
  recID!: string | undefined;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;

  constructor() {
    this.createdBy = '';
    this.createdOn = new Date();
    this.modifiedBy = '';
    this.modifiedOn = new Date();
  }
}
