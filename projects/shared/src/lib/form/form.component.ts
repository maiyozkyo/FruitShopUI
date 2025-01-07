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
import { FormGroup, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { ControlItem } from '../models/form/control-item.model';
import { SharedService } from '../shared.service';
import { NzUploadChangeParam, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //#region Input Params
  @Input() controls!: ControlItem[];
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() data!: any;
  @Input() formClass: string =
    'd-flex flex-column position-relative w-100 h-100';
  //#endregion

  //#region Event
  @Output() submit!: EventEmitter<any>;
  @Output() fgChange = new EventEmitter<any>();
  //#endregion

  @Input() fg!: FormGroup;

  @ViewChild('form', { static: true }) form!: TemplateRef<any>;
  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.controls) {
      this.controls.forEach((control) => {
        if (!control.placeHolder) {
          control.placeHolder = control.title;
        }
        let fgControl = this.fg.controls[control.controlName];
        if (this.data && this.data[control.controlName]) {
          fgControl.setValue(this.data[control.controlName]);
        }

        if (control.disabled) fgControl.disable();
      });

      this.controls
        .filter((control) => control.isServer)
        .forEach((control) => this.dropdownServerLoadData(control));

      if (this.controls) {
        this.controls
          .filter((control) => control.mappingWithControl)
          .forEach((control) => {
            if (control.mappingWithControl) {
              this.mapValue(control);
            }
          });
      }
    }
  }

  dropdownServerLoadData(control: ControlItem) {
    if (control.pageInfo) {
      control.pageInfo.isLoading = true;
      this.shareService
        .getDataPaging(
          control.pageInfo.service,
          control.pageInfo.method,
          control.pageInfo.curPage,
          control.pageInfo.size ?? 20,
          control.pageInfo.request ?? '',
          control.pageInfo.lstNotIn ?? []
        )
        .subscribe((res) => {
          control.dataSrc = res.data;
          if (control.pageInfo) control.pageInfo.isLoading = false;
        });
    }
  }

  mapValue(control: ControlItem) {
    let field = control.mappingWithControl ?? '';
    if (field != '') {
      this.fg.controls[field].valueChanges.subscribe((value) => {
        if (this.controls) {
          let parentControl = this.controls.find((c) => c.controlName == field);
          let curData = parentControl?.dataSrc?.find((c) => c[field] == value);
          if (curData) {
            this.fg.controls[control.controlName].setValue(
              curData[control.controlName]
            );

            if (parentControl?.labelField) {
              this.fg.controls[parentControl.labelField].setValue(
                curData[parentControl.labelField]
              );
            }
          }
        }
      });
    }
  }

  checkRequired(control: ControlItem): boolean {
    return control.validators?.find((x) => x == Validators.required) != null;
  }

  onChangeImg(evt: NzUploadChangeParam, control: ControlItem) {
    console.log('onChangeProductImg', evt);
    // this.fg.controls[control.controlName].setValue(evt.file.thumbUrl);
    control.value = evt.file.thumbUrl;
  }

  onLocalUploadFileRequest(item: NzUploadXHRArgs) {
    const file = item.file as unknown as File;

    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = () => {
        item.onSuccess!(reader.result, item.file, null);
        obs.next();
        obs.complete();
      };

      reader.onerror = (err) => {
        item.onError!(err, item.file);
        obs.error(err);
      };

      reader.readAsDataURL(file);
    }).subscribe();
  }
}
