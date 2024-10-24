import { Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormItem } from '../models/form/formItem.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private fg!: FormGroup;

  constructor(private injector: Injector) {}

  genFromControls(controls: FormItem[]) {
    this.fg = new FormGroup({});
    controls.forEach((control) => {
      this.fg.addControl(
        control.controlName,
        new FormControl(control.value, control.validators)
      );
    });

    return this.fg;
  }
}
