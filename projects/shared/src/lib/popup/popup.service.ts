import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PopupComponent } from './popup.component';
import { Subject } from 'rxjs';
import { PopupResult } from '../models/popup/popup-result.model';
import { ControlItem } from '../models/form/control-item.model';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private containerRef!: ViewContainerRef;
  private isVisible: boolean = false;

  constructor(private injector: Injector) {}

  setViewContainerRef(containerRef: ViewContainerRef) {
    this.containerRef = containerRef;
  }

  open(
    title: string,
    formGroup: FormGroup,
    data: any,
    contentTmpl?: TemplateRef<any>,
    controls?: ControlItem[],
    width: number = 900,
    height: number = 400,
    confirmText: string = 'OK',
    cancelText: string = 'Hủy',
    isOkLoading: boolean = false
  ) {
    this.containerRef.clear();

    // Create component dynamically
    const popupComponent = this.containerRef.createComponent(PopupComponent, {
      injector: this.injector,
    });

    this.isVisible = true;

    popupComponent.instance.title = title;
    popupComponent.instance.formGroup = formGroup;
    popupComponent.instance.contentTmpl = contentTmpl;
    popupComponent.instance.data = data;
    popupComponent.instance.confirmText = confirmText;
    popupComponent.instance.cancelText = cancelText;
    popupComponent.instance.isOkLoading = isOkLoading;
    popupComponent.instance.visible = this.isVisible;
    popupComponent.instance.width = width;
    popupComponent.instance.height = height;
    popupComponent.instance.controls = controls;
    popupComponent.instance.tempData = { data };

    popupComponent.instance.visibleChange.subscribe((visible: boolean) => {
      this.isVisible = visible;
    });

    const popupResultSubject = new Subject<PopupResult>();
    popupComponent.instance.onConfirm.subscribe((data) => {
      popupResultSubject.next({ isConfirm: true, data });
      popupResultSubject.complete();
      this.containerRef.clear(); // Clear the popup component
    });

    popupComponent.instance.onCancel.subscribe(() => {
      popupResultSubject.next({ isConfirm: false, data: null });
      popupResultSubject.complete();
      this.containerRef.clear(); // Clear the popup component
    });

    return popupResultSubject.asObservable();
  }

  close() {
    this.containerRef.clear();
  }
}
