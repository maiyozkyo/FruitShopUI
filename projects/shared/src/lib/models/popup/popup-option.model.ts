export class PopupOption {
  width: number;
  height: number;
  confirmText? = 'OK';
  cancelText?: string = 'Hủy';
  isOkLoading?: boolean = false;
  showPopup!: boolean;
  isRemove? = false;

  constructor() {
    this.showPopup = false;
    this.width = 900;
    this.height = 400;
  }
}
