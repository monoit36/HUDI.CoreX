import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import {
  UserServiceProxy,
  ChangeUserLanguageDto
} from '@shared/service-proxies/service-proxies';

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
        private _authService: AppAuthService,
        private _userService: UserServiceProxy
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

    get currentLanguageAbbr(): string {
        if (!this.currentLanguage || !this.currentLanguage.name) {
            return '';
        }
        return this.currentLanguage.name.substring(0, 2).toUpperCase();
    }

    changeLanguage(languageName: string): void {
        const input = new ChangeUserLanguageDto();
        input.languageName = languageName;

        this._userService.changeLanguage(input).subscribe(() => {
            abp.utils.setCookieValue(
                'Abp.Localization.CultureName',
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 year
                abp.appPath
            );

            window.location.reload();
        });
    }

    logout(): void {
        this._authService.logout();
    }
}
