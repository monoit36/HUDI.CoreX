import { Component, Injector, ChangeDetectorRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  RoleServiceProxy,
  RoleDto,
  RoleDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateRoleDialogComponent } from './create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './edit-role/edit-role-dialog.component';
import { Menu } from 'primeng/menu';

class PagedRolesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './roles.component.html',
  styleUrls: ['../../shared/styles/list-page.css'],
  animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {
  @ViewChild('actionMenu') override actionMenu: Menu;
  @ViewChild('createRoleDialog') createRoleDialog: CreateRoleDialogComponent;
  @ViewChild('editRoleDialog') editRoleDialog: EditRoleDialogComponent;

  roles: RoleDto[] = [];
  selectedRoles: RoleDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _rolesService: RoleServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  createRole(): void {
    this.createRoleDialog.show();
  }

  editRole(role: RoleDto): void {
    this.editRoleDialog.show(role.id);
  }

  toggleActionMenu(event: Event, role: RoleDto): void {
    this.actionMenuItems = [
      {
        label: this.l('Edit'),
        icon: 'pi pi-pencil',
        command: () => this.editRole(role)
      },
      {
        label: this.l('Delete'),
        icon: 'pi pi-trash',
        command: () => this.delete(role)
      }
    ];
    this.actionMenu.toggle(event);
  }

  list(
    request: PagedRolesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._rolesService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: RoleDtoPagedResultDto) => {
        this.roles = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(role: RoleDto): void {
    abp.message.confirm(
      this.l('RoleDeleteWarningMessage', role.displayName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._rolesService
            .delete(role.id)
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
