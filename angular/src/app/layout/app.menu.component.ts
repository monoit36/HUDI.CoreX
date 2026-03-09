import { OnInit, Injector } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent extends AppComponentBase implements OnInit {

    model: any[] = [];

    constructor(injector: Injector, public layoutService: LayoutService) {
        super(injector);
    }

    ngOnInit() {
        this.model = [
            {
                label: this.l('HomePage'),
                items: [
                    { label: this.l('About'), icon: 'pi pi-fw pi-info-circle', routerLink: ['/app/about'] },
                    { label: this.l('HomePage'), icon: 'pi pi-fw pi-home', routerLink: ['/app/home'] }
                ]
            },
            {
                label: this.l('Administration'),
                visible: this.permission.isGranted('Pages.Administration'),
                items: [
                    {
                        label: this.l('Roles'),
                        icon: 'pi pi-fw pi-shield',
                        routerLink: ['/app/roles'],
                        visible: this.permission.isGranted('Pages.Administration.Roles')
                    },
                    {
                        label: this.l('Tenants'),
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/app/tenants'],
                        visible: this.permission.isGranted('Pages.Administration.Tenants')
                    },
                    {
                        label: this.l('Users'),
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/app/users'],
                        visible: this.permission.isGranted('Pages.Administration.Users')
                    }
                ]
            },
            {
                label: this.l('MasterData'),
                visible: this.permission.isGranted('Pages.MasterData'),
                items: [
                    {
                        label: this.l('MasterData'),
                        icon: 'pi pi-fw pi-database',
                        routerLink: ['/app/master-data']
                    }
                ]
            },
            {
                label: 'Sakai Theme Demos',
                items: [
                    {
                        label: 'UI Components',
                        icon: 'pi pi-fw pi-star-fill',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/app/uikit/formlayout'] },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/uikit/input'] },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/app/uikit/floatlabel'] },
                            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/app/uikit/invalidstate'] },
                            { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/app/uikit/button'] },
                            { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/app/uikit/table'] },
                            { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/app/uikit/list'] },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/app/uikit/tree'] },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/app/uikit/panel'] },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/app/uikit/overlay'] },
                            { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/app/uikit/media'] },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/app/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/app/uikit/message'] },
                            { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/app/uikit/file'] },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/app/uikit/charts'] },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/app/uikit/misc'] }
                        ]
                    },
                    {
                        label: 'Prime Blocks',
                        icon: 'pi pi-fw pi-prime',
                        items: [
                            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/app/blocks'], badge: 'NEW' },
                            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Utilities',
                        icon: 'pi pi-fw pi-compass',
                        items: [
                            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/app/utilities/icons'] },
                            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                        ]
                    },
                    {
                        label: 'Pages',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/app/pages/crud'] },
                            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/app/pages/timeline'] },
                            { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/app/pages/empty'] },
                        ]
                    }
                ]
            }
        ];
    }
}
