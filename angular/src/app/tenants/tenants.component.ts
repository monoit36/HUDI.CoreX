import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  TenantServiceProxy,
  TenantDto,
  TenantDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateTenantDialogComponent } from './create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './edit-tenant/edit-tenant-dialog.component';
import { Menu } from 'primeng/menu';

class PagedTenantsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './tenants.component.html',
  styleUrls: ['../../shared/styles/list-page.css'],
  animations: [appModuleAnimation()]
})
export class TenantsComponent extends PagedListingComponentBase<TenantDto> {
  @ViewChild('actionMenu') override actionMenu: Menu;
  @ViewChild('createTenantDialog') createTenantDialog: CreateTenantDialogComponent;
  @ViewChild('editTenantDialog') editTenantDialog: EditTenantDialogComponent;

  tenants: TenantDto[] = [];
  selectedTenants: TenantDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _tenantService: TenantServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  createTenant(): void {
    this.createTenantDialog.show();
  }

  editTenant(tenant: TenantDto): void {
    this.editTenantDialog.show(tenant.id);
  }

  toggleActionMenu(event: Event, tenant: TenantDto): void {
    this.actionMenuItems = [
      {
        label: this.l('Edit'),
        icon: 'pi pi-pencil',
        command: () => this.editTenant(tenant)
      },
      {
        label: this.l('Delete'),
        icon: 'pi pi-trash',
        command: () => this.delete(tenant)
      }
    ];
    this.actionMenu.toggle(event);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  list(
    request: PagedTenantsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._tenantService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: TenantDtoPagedResultDto) => {
        this.tenants = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(tenant: TenantDto): void {
    abp.message.confirm(
      this.l('TenantDeleteWarningMessage', tenant.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._tenantService
            .delete(tenant.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }
}
