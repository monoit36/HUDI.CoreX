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
  CreateMasterDataDictionaryDto
} from '../master-data-proxy.service';

@Component({
  selector: 'app-create-master-data-dialog',
  templateUrl: 'create-master-data-dialog.component.html'
})
export class CreateMasterDataDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  item: CreateMasterDataDictionaryDto = new CreateMasterDataDictionaryDto();

  @ViewChild('createMasterDataModal') createMasterDataModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _service: MasterDataDictionaryServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(): void {
    this.saving = false;
    this.item = new CreateMasterDataDictionaryDto();
    this.item.isActive = true;
    this.item.sortOrder = 0;
    this.visible = true;
    this.cd.detectChanges();
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._service.create(this.item).subscribe(
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
