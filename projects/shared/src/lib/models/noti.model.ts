import { TemplateRef } from '@angular/core';

export class Noti {
  public type!: string;
  public title!: string;
  public msg!: string;
  public className: string[] = [];
  public delay: number = 5000;
  public template: TemplateRef<HTMLElement> | undefined;
}
