import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  RoleEditDto,
  PermissionTreeDto,
  PermissionTreeDtoTreeResultDto
} from '@shared/service-proxies/service-proxies';
import { TreeNode } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: 'edit-role-dialog.component.html'
})
export class EditRoleDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  role = new RoleEditDto();
  permissionNodes: TreeNode[] = [];
  selectedPermissions: TreeNode[] = [];
  grantedPermissionNames: string[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _roleService: RoleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    forkJoin([
      this._roleService.getRoleForEdit(this.id),
      this._roleService.getPermissionTree()
    ]).subscribe(([editResult, treeResult]: [GetRoleForEditOutput, PermissionTreeDtoTreeResultDto]) => {
      this.role = editResult.role;
      this.grantedPermissionNames = editResult.grantedPermissionNames;
      this.permissionNodes = this.mapToTreeNodes(treeResult.items);
      this.selectedPermissions = this.getSelectedNodes(this.permissionNodes, this.grantedPermissionNames);
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

  private getSelectedNodes(nodes: TreeNode[], grantedNames: string[]): TreeNode[] {
    let selected: TreeNode[] = [];
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        const childSelected = this.getSelectedNodes(node.children, grantedNames);
        selected = selected.concat(childSelected);
        // Only add parent to selection if ALL children are selected (fully checked)
        const allLeaves = this.getAllLeafNodes(node.children);
        const selectedLeaves = allLeaves.filter(l => grantedNames.includes(l.data));
        if (selectedLeaves.length === allLeaves.length) {
          selected.push(node);
        }
      } else {
        if (grantedNames.includes(node.data)) {
          selected.push(node);
        }
      }
    }
    return selected;
  }

  private getAllLeafNodes(nodes: TreeNode[]): TreeNode[] {
    let result: TreeNode[] = [];
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        result = result.concat(this.getAllLeafNodes(node.children));
      } else {
        result.push(node);
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

    const role = new RoleDto();
    role.init(this.role);
    role.grantedPermissions = this.getCheckedPermissions();

    this._roleService.update(role).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
