import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { Subject } from 'rxjs';
import { PopupResult } from '../models/popup/popup-result.model';
import { ControlItem } from '../models/form/control-item.model';
import { PopupOption } from '../models/popup/popup-option.model';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private containerRef!: ViewContainerRef;

  constructor(private injector: Injector) {}

  setViewContainerRef(containerRef: ViewContainerRef) {
    this.containerRef = containerRef;
  }

  open(
    title: string,
    formGroup: FormGroup,
    data: any,
    popupOption: PopupOption,
    contentTmpl?: TemplateRef<any>,
    controls?: ControlItem[]
  ) {
    this.containerRef.clear();

    // Create component dynamically
    const popupComponent = this.containerRef.createComponent(PopupComponent, {
      injector: this.injector,
    });

    popupOption.showPopup = true;

    popupComponent.instance.title = title;
    popupComponent.instance.formGroup = formGroup;
    popupComponent.instance.contentTmpl = contentTmpl;
    popupComponent.instance.data = data;
    popupComponent.instance.controls = controls;
    popupComponent.instance.popupOption = popupOption;
    popupComponent.instance.tempData = { data };

    popupComponent.instance.visibleChange.subscribe((visible: boolean) => {
      popupOption.showPopup = visible;
    });

    const popupResultSubject = new Subject<PopupResult>();
    popupComponent.instance.onConfirm.subscribe((data) => {
      popupResultSubject.next({ isConfirm: true, data });
      this.containerRef.clear(); // Clear the popup component
    });

    popupComponent.instance.onCancel.subscribe(() => {
      popupResultSubject.next({ isConfirm: false, data: null });
      this.containerRef.clear(); // Clear the popup component
    });

    return popupResultSubject.asObservable();
  }

  close() {
    this.containerRef.clear();
  }
}
