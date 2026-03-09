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
  CreateTenantDto,
  TenantServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-tenant-dialog',
  templateUrl: 'create-tenant-dialog.component.html'
})
export class CreateTenantDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  tenant: CreateTenantDto = new CreateTenantDto();

  @ViewChild('createTenantModal') createTenantModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _tenantService: TenantServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(): void {
    this.saving = false;
    this.tenant = new CreateTenantDto();
    this.tenant.isActive = true;
    this.visible = true;
    this.cd.detectChanges();
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._tenantService.create(this.tenant).subscribe(
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
