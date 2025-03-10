import { TemplateRef } from '@angular/core';
import { CommonData } from '../table/commonData.model';

export class ListOption {
  type: 'list' | 'grid' = 'list';
  service: string = '';
  assembly: string = '';
  method: string = '';
  allowAddEdit? = true;
  saveMethod? = '';
  allowRemove? = true;
  removeMethod? = '';
  showRemovePopup? = false;
  isConfirmRemove? = true;
  allowChoose? = true;
  filter: any;
  isPaging: boolean = true;
  pageSize = 20;
  width = 100;
  height = 100;
  disabled = true;
  showChosenItems: boolean = false;
  chooseField: string = 'recID';
  isMultiChoose?: boolean = false;
  chosenTitle: string = 'Danh sách đang chọn';
  chosenPlacement:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | Array<string> = 'right';
  chosenItemTmpl?: TemplateRef<any>;
  footerControls: CommonData[] = [];
}
