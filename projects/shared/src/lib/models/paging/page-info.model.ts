export class PageInfo {
  service!: string;
  method!: string;
  size?: number = 20;
  request?: string = '';
  curPage: number = 1;
  isLoading?: boolean = false;
  readonly total?: number = 0;
}
