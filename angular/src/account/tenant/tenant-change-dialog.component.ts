import { Component, Injector, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { AccountServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppTenantAvailabilityState } from '@shared/AppEnums';
import {
  IsTenantAvailableInput,
  IsTenantAvailableOutput
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-tenant-change-dialog',
  templateUrl: './tenant-change-dialog.component.html'
})
export class TenantChangeDialogComponent extends AppComponentBase {
  saving = false;
  visible = false;
  tenancyName = '';

  @ViewChild('changeTenantModal') changeTenantModal: NgForm;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  show(tenancyName: string): void {
    this.saving = false;
    this.tenancyName = tenancyName;
    this.visible = true;
    this.cd.detectChanges();
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    if (!this.tenancyName) {
      abp.multiTenancy.setTenantIdCookie(undefined);
      this.hide();
      location.reload();
      return;
    }

    const input = new IsTenantAvailableInput();
    input.tenancyName = this.tenancyName;

    this.saving = true;
    this._accountService.isTenantAvailable(input).subscribe(
      (result: IsTenantAvailableOutput) => {
        switch (result.state) {
          case AppTenantAvailabilityState.Available:
            abp.multiTenancy.setTenantIdCookie(result.tenantId);
            location.reload();
            return;
          case AppTenantAvailabilityState.InActive:
            this.message.warn(this.l('TenantIsNotActive', this.tenancyName));
            break;
          case AppTenantAvailabilityState.NotFound:
            this.message.warn(
              this.l('ThereIsNoTenantDefinedWithName{0}', this.tenancyName)
            );
            break;
        }
      },
      () => {
        this.saving = false;
        this.cd.detectChanges();
      }
    );
  }
}
