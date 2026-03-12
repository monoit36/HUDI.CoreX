import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SitesRoutingModule } from './sites-routing.module';
import { CreateSiteDialogComponent } from './create-site/create-site-dialog.component';
import { EditSiteDialogComponent } from './edit-site/edit-site-dialog.component';
import { SitesComponent } from './sites.component';

@NgModule({
    declarations: [
        CreateSiteDialogComponent,
        EditSiteDialogComponent,
        SitesComponent,
    ],
    imports: [SharedModule, SitesRoutingModule],
})
export class SitesModule {}
