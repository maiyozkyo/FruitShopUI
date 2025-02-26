export class PageInfo {
  service!: string;
  method!: string;
  assembly!: string;
  size?: number = 20;
  request?: string = '';
  curPage: number = 1;
  isLoading?: boolean = false;
  lstNotIn?: any[];
  readonly total?: number = 0;
}
