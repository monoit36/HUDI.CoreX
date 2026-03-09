import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  UserServiceProxy,
  UserDto,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateUserDialogComponent } from './create-user/create-user-dialog.component';
import { EditUserDialogComponent } from './edit-user/edit-user-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password/reset-password.component';
import { Menu } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './users.component.html',
  animations: [appModuleAnimation()],
  providers: [MessageService]
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {
  @ViewChild('actionMenu') override actionMenu: Menu;
  @ViewChild('dt') dt: Table;
  @ViewChild('createUserDialog', { static: true }) createUserDialog: CreateUserDialogComponent;
  @ViewChild('editUserDialog', { static: true }) editUserDialog: EditUserDialogComponent;
  @ViewChild('resetPasswordDialog', { static: true }) resetPasswordDialog: ResetPasswordDialogComponent;

  users: UserDto[] = [];
  selectedUsers: UserDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  deleteUserDialog = false;
  deleteUsersDialog = false;
  userToDelete: UserDto;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    private messageService: MessageService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  createUser(): void {
    this.showCreateOrEditUserDialog();
  }

  editUser(user: UserDto): void {
    this.showCreateOrEditUserDialog(user.id);
  }

  public resetPassword(user: UserDto): void {
    this.showResetPasswordUserDialog(user.id);
  }

  openDeleteDialog(user: UserDto): void {
    this.userToDelete = user;
    this.deleteUserDialog = true;
  }

  confirmDelete(): void {
    this.deleteUserDialog = false;
    this._userService.delete(this.userToDelete.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: this.l('SuccessfullyDeleted'),
        detail: this.l('UserDeletedSuccessfully'),
        life: 3000
      });
      this.userToDelete = undefined;
      this.refresh();
    });
  }

  deleteSelectedUsers(): void {
    this.deleteUsersDialog = true;
  }

  confirmDeleteSelected(): void {
    this.deleteUsersDialog = false;
    const deleteRequests = this.selectedUsers.map(user =>
      this._userService.delete(user.id).toPromise()
    );

    Promise.all(deleteRequests).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: this.l('SuccessfullyDeleted'),
        detail: `${this.selectedUsers.length} ${this.l('UsersDeleted')}`,
        life: 3000
      });
      this.selectedUsers = [];
      this.refresh();
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: this.l('Error'),
        detail: this.l('AnErrorOccurred'),
        life: 3000
      });
    });
  }

  exportCSV(): void {
    if (this.dt) {
      this.dt.exportCSV();
    }
  }

  toggleActionMenu(event: Event, user: UserDto): void {
    this.actionMenuItems = [
      {
        label: this.l('Edit'),
        icon: 'pi pi-pencil',
        command: () => this.editUser(user)
      },
      {
        label: this.l('Delete'),
        icon: 'pi pi-trash',
        command: () => this.openDeleteDialog(user)
      },
      {
        separator: true
      },
      {
        label: this.l('ResetPassword'),
        icon: 'pi pi-lock',
        command: () => this.resetPassword(user)
      }
    ];
    this.actionMenu.toggle(event);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._userService
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
      .subscribe((result: UserDtoPagedResultDto) => {
        this.users = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  protected delete(user: UserDto): void {
    this.openDeleteDialog(user);
  }

  private showResetPasswordUserDialog(id?: number): void {
    this.resetPasswordDialog.show(id);
  }

  private showCreateOrEditUserDialog(id?: number): void {
    if (!id) {
      this.createUserDialog.show();
    } else {
      this.editUserDialog.show(id);
    }
  }
}
