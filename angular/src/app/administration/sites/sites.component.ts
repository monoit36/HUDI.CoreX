import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  SiteServiceProxy,
  SiteDto,
  SiteDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateSiteDialogComponent } from './create-site/create-site-dialog.component';
import { EditSiteDialogComponent } from './edit-site/edit-site-dialog.component';
import { Menu } from 'primeng/menu';

class PagedSitesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './sites.component.html',
  animations: [appModuleAnimation()]
})
export class SitesComponent extends PagedListingComponentBase<SiteDto> {
  @ViewChild('actionMenu') override actionMenu: Menu;
  @ViewChild('createSiteDialog') createSiteDialog: CreateSiteDialogComponent;
  @ViewChild('editSiteDialog') editSiteDialog: EditSiteDialogComponent;

  sites: SiteDto[] = [];
  selectedSites: SiteDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _siteService: SiteServiceProxy,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  createSite(): void {
    this.createSiteDialog.show();
  }

  editSite(site: SiteDto): void {
    this.editSiteDialog.show(site.id);
  }

  toggleActionMenu(event: Event, site: SiteDto): void {
    this.actionMenuItems = [
      {
        label: this.l('Edit'),
        icon: 'pi pi-pencil',
        command: () => this.editSite(site)
      },
      {
        label: this.l('Delete'),
        icon: 'pi pi-trash',
        command: () => this.delete(site)
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
    request: PagedSitesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._siteService
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
      .subscribe((result: SiteDtoPagedResultDto) => {
        this.sites = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(site: SiteDto): void {
    abp.message.confirm(
      this.l('SiteDeleteWarningMessage', site.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._siteService
            .delete(site.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }
}
