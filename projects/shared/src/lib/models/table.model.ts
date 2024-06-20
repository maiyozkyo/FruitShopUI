export class TableRow {
    title!: string
    field!: string
    type?: 'checkbox' | 'text' | 'number' = 'text'
    disabled?: boolean = false;
}