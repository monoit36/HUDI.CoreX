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
            }
        ];
    }
}
