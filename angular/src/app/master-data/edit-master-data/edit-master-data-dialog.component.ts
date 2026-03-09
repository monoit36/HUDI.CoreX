import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  MasterDataDictionaryServiceProxy,
  MasterDataDictionaryDto,
  UpdateMasterDataDictionaryDto
} from '../master-data-proxy.service';

@Component({
  selector: 'app-edit-master-data-dialog',
  templateUrl: 'edit-master-data-dialog.component.html'
})
export class EditMasterDataDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  item: UpdateMasterDataDictionaryDto = new UpdateMasterDataDictionaryDto();
  id: number;

  @ViewChild('editMasterDataModal') editMasterDataModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _service: MasterDataDictionaryServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(id: number): void {
    this.saving = false;
    this.id = id;
    this.visible = true;

    this._service.get(this.id).subscribe((result: MasterDataDictionaryDto) => {
      this.item = result as UpdateMasterDataDictionaryDto;
      this.cd.detectChanges();
    });
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._service.update(this.item).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
        this.cd.detectChanges();
      }
    );
  }
}
