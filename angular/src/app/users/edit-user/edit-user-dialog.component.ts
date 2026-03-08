import {
  Component,
  Injector,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  UserDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html'
})
export class EditUserDialogComponent extends AppComponentBase {
  @ViewChild('editUserModal') editUserModal: NgForm;
  saving = false;
  visible = false;
  user = new UserDto();
  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  show(id: number): void {
    this.id = id;
    this.saving = false;
    this._userService.get(this.id).subscribe((result) => {
      this.user = result;

      this._userService.getRoles().subscribe((result2) => {
        this.roles = result2.items;
        this.setInitialRolesStatus();
        this.visible = true;
        this.cd.detectChanges();
      });
    });
  }

  hide(): void {
    this.visible = false;
  }

  setInitialRolesStatus(): void {
    _map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    return _includes(this.user.roleNames, normalizedName);
  }

  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap[role.normalizedName] = $event.checked;
  }

  getCheckedRoles(): string[] {
    const roles: string[] = [];
    _forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });
    return roles;
  }

  save(): void {
    this.saving = true;

    this.user.roleNames = this.getCheckedRoles();

    this._userService.update(this.user).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
