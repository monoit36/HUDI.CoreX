import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  MasterDataDictionaryServiceProxy,
  CreateMasterDataDictionaryDto
} from '../master-data-proxy.service';

@Component({
  templateUrl: 'create-master-data-dialog.component.html'
})
export class CreateMasterDataDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  item: CreateMasterDataDictionaryDto = new CreateMasterDataDictionaryDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _service: MasterDataDictionaryServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    this._service.create(this.item).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
