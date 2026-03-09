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
  TenantServiceProxy,
  TenantDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-tenant-dialog',
  templateUrl: 'edit-tenant-dialog.component.html'
})
export class EditTenantDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  tenant: TenantDto = new TenantDto();
  id: number;

  @ViewChild('editTenantModal') editTenantModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _tenantService: TenantServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(id: number): void {
    this.saving = false;
    this.id = id;
    this.visible = true;

    this._tenantService.get(this.id).subscribe((result: TenantDto) => {
      this.tenant = result;
      this.cd.detectChanges();
    });
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._tenantService.update(this.tenant).subscribe(
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
