import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { FormItem } from '../models/form/formItem.model';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //#region Input Params
  @Input() controls!: FormItem[];
  @Input() layout: NzFormLayoutType = 'vertical';
  //#endregion

  //#region Event
  @Output() submit!: EventEmitter<any>;
  @Output() fgChange = new EventEmitter<any>();
  //#endregion

  @Input() fg!: FormGroup;

  @ViewChild('form', { static: true }) form!: TemplateRef<any>;
  constructor(private df: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
