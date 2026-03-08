import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent extends AppComponentBase implements OnInit {

    items!: MenuItem[];
    langMenuVisible = false;

    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        injector: Injector,
        public layoutService: LayoutService,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.languages = abp.localization.languages.filter(
            (l) => !l.isDisabled
        );
        this.currentLanguage = abp.localization.currentLanguage;
    }

    get shownLoginName(): string {
        return this.appSession.getShownLoginName();
    }

    changeLanguage(languageName: string): void {
        abp.utils.setCookieValue(
            'Abp.Localization.CultureName',
            languageName,
            new Date(new Date().getTime() + 5 * 365 * 86400000),
            abp.appPath
        );
        location.reload();
    }

    logout(): void {
        this._authService.logout();
    }
}
