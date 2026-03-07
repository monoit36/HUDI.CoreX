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
  MasterDataDictionaryDto,
  UpdateMasterDataDictionaryDto
} from '../master-data-proxy.service';

@Component({
  templateUrl: 'edit-master-data-dialog.component.html'
})
export class EditMasterDataDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  item: UpdateMasterDataDictionaryDto = new UpdateMasterDataDictionaryDto();
  id: number;

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
    this._service.get(this.id).subscribe((result: MasterDataDictionaryDto) => {
      this.item = result as UpdateMasterDataDictionaryDto;
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.saving = true;

    this._service.update(this.item).subscribe(
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
