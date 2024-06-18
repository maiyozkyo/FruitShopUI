import { BaseModel } from "projects/shared/src/lib/models/base.model"

export class Tenant extends BaseModel {
    code!: string
    name!: string
    dbType!: number
}