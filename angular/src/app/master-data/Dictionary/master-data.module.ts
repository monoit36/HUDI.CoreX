import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { CreateMasterDataDialogComponent } from './create-master-data/create-master-data-dialog.component';
import { EditMasterDataDialogComponent } from './edit-master-data/edit-master-data-dialog.component';
import { MasterDataDictionaryServiceProxy } from './master-data-proxy.service';

@NgModule({
    declarations: [
        MasterDataComponent,
        CreateMasterDataDialogComponent,
        EditMasterDataDialogComponent,
    ],
    imports: [SharedModule, MasterDataRoutingModule],
    providers: [MasterDataDictionaryServiceProxy],
})
export class MasterDataModule {}
