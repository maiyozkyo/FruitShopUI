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

    controls
      .filter((control) => control.mappingWithControl)
      .forEach((control) => {
        if (control.mappingWithControl) {
          let field = control.mappingWithControl;
          this.fg.controls[field].valueChanges.subscribe((value) => {
            let curData = control.dataSrc?.find((c) => c[field] == value);
            console.log('value', curData);
          });
        }
      });

    return this.fg;
  }
}
