export class PopupOption {
  width: number;
  height: number;
  confirmText? = 'OK';
  cancelText?: string = 'Hủy';
  isOkLoading?: boolean = false;
  showPopup!: boolean;
  showRemovePopup? = false;
  saveMethod? = '';
  allowAddEdit? = true;
  removeMethod? = '';
  allowRemove? = true;
  isConfirmRemove? = true;
  allowChoose? = true;

  constructor() {
    this.showPopup = false;
    this.width = 900;
    this.height = 400;
  }
}
