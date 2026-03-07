import { AppComponentBase } from 'shared/app-component-base';
import { Component, Injector, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export class PagedRequestDto {
    skipCount: number;
    maxResultCount: number;
}

@Component({
    template: ''
})
export abstract class PagedListingComponentBase<TEntityDto> extends AppComponentBase implements OnInit {

    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number;
    public isTableLoading = false;
    public actionMenuItems: MenuItem[] = [];
    public actionMenu: Menu;
    protected cd: ChangeDetectorRef;

    constructor(
        injector: Injector,
        cd: ChangeDetectorRef
    ) {
        super(injector);
        this.cd = cd;
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page: number): void {
        const req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;

        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
            this.cd.detectChanges();
        });
    }

    getInitials(name: string): string {
        if (!name) return '?';
        const parts = name.split(/[\s._-]+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }

    getAvatarColor(name: string): string {
        const colors = [
            '#4CAF50', '#2196F3', '#FF9800', '#9C27B0',
            '#F44336', '#00BCD4', '#E91E63', '#3F51B5',
            '#009688', '#FF5722', '#795548', '#607D8B'
        ];
        let hash = 0;
        for (let i = 0; i < (name || '').length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void;
    protected abstract delete(entity: TEntityDto): void;
}
