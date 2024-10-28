import { Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlItem } from '../models/form/control-item.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private fg!: FormGroup;

  constructor(private injector: Injector) {}

  genFromControls(controls: ControlItem[]) {
    this.fg = new FormGroup({});
    controls.forEach((control) => {
      this.fg.addControl(
        control.controlName,
        new FormControl(
          {
            value: control.value,
            disabled: control.disabled,
          },
          control.validators
        )
      );
    });
    return this.fg;
  }
}
