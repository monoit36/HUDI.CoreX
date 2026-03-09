import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  MasterDataDictionaryServiceProxy,
  MasterDataDictionaryDto,
  PagedResultDtoOfMasterDataDictionary
} from './master-data-proxy.service';
import { CreateMasterDataDialogComponent } from './create-master-data/create-master-data-dialog.component';
import { EditMasterDataDialogComponent } from './edit-master-data/edit-master-data-dialog.component';
import { Menu } from 'primeng/menu';

class PagedMasterDataRequestDto extends PagedRequestDto {
  keyword: string;
  categoryCode: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './master-data.component.html',
  animations: [appModuleAnimation()]
})
export class MasterDataComponent extends PagedListingComponentBase<MasterDataDictionaryDto> {
  @ViewChild('actionMenu') override actionMenu: Menu;
  @ViewChild('createDialog') createDialog: CreateMasterDataDialogComponent;
  @ViewChild('editDialog') editDialog: EditMasterDataDialogComponent;

  items: MasterDataDictionaryDto[] = [];
  selectedItems: MasterDataDictionaryDto[] = [];
  keyword = '';
  categoryCode = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _service: MasterDataDictionaryServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  createItem(): void {
    this.createDialog.show();
  }

  editItem(item: MasterDataDictionaryDto): void {
    this.editDialog.show(item.id);
  }

  toggleActionMenu(event: Event, item: MasterDataDictionaryDto): void {
    this.actionMenuItems = [
      {
        label: this.l('Edit'),
        icon: 'pi pi-pencil',
        command: () => this.editItem(item),
        visible: this.isGranted('Pages.MasterData.Dictionary.Edit')
      },
      {
        label: this.l('Delete'),
        icon: 'pi pi-trash',
        command: () => this.delete(item),
        visible: this.isGranted('Pages.MasterData.Dictionary.Delete')
      }
    ];
    this.actionMenu.toggle(event);
  }

  clearFilters(): void {
    this.keyword = '';
    this.categoryCode = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedMasterDataRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.categoryCode = this.categoryCode;
    request.isActive = this.isActive;

    this._service
      .getAll(
        request.keyword,
        request.categoryCode,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfMasterDataDictionary) => {
        this.items = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  protected delete(item: MasterDataDictionaryDto): void {
    abp.message.confirm(
      this.l('MasterDataDeleteWarningMessage', item.value),
      undefined,
      (result: boolean) => {
        if (result) {
          this._service.delete(item.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
