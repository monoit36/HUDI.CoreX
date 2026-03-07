import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  output,
  ChangeDetectorRef,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  RoleDto,
  CreateRoleDto,
  PermissionTreeDto,
  PermissionTreeDtoTreeResultDto
} from '@shared/service-proxies/service-proxies';
import { TreeNode } from 'primeng/api';

@Component({
  templateUrl: 'create-role-dialog.component.html'
})
export class CreateRoleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  role = new RoleDto();
  permissionNodes: TreeNode[] = [];
  selectedPermissions: TreeNode[] = [];

  onSave = output<EventEmitter<any>>()

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._roleService
      .getPermissionTree()
      .subscribe((result: PermissionTreeDtoTreeResultDto) => {
        this.permissionNodes = this.mapToTreeNodes(result.items);
        // Default: select all
        this.selectedPermissions = this.getAllTreeNodes(this.permissionNodes);
        this.cd.detectChanges();
      });
  }

  private mapToTreeNodes(permissions: PermissionTreeDto[]): TreeNode[] {
    if (!permissions) return [];
    return permissions.map(p => ({
      label: p.displayName,
      data: p.name,
      key: p.name,
      children: this.mapToTreeNodes(p.children),
      expanded: true
    }));
  }

  private getAllTreeNodes(nodes: TreeNode[]): TreeNode[] {
    let result: TreeNode[] = [];
    for (const node of nodes) {
      result.push(node);
      if (node.children) {
        result = result.concat(this.getAllTreeNodes(node.children));
      }
    }
    return result;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];

    // Include fully selected nodes
    for (const node of this.selectedPermissions) {
      if (node.data) {
        permissions.push(node.data);
      }
    }

    // Include partially selected parent nodes
    this.collectPartiallySelected(this.permissionNodes, permissions);

    return [...new Set(permissions)];
  }

  private collectPartiallySelected(nodes: TreeNode[], permissions: string[]): void {
    for (const node of nodes) {
      if (node.partialSelected && node.data) {
        permissions.push(node.data);
      }
      if (node.children) {
        this.collectPartiallySelected(node.children, permissions);
      }
    }
  }

  save(): void {
    this.saving = true;

    const role = new CreateRoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();

    this._roleService
      .create(role)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit(null);
        },
        () => {
          this.saving = false;
          this.cd.detectChanges();
        }
      );
  }
}
