import { NgModule } from '@angular/core';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';

const PRIMENG_MODULES = [
  ButtonModule,
  InputTextModule,
  TableModule,
  DropdownModule,
  DialogModule,
  ToastModule,
  CalendarModule,
  CheckboxModule,
  RadioButtonModule,
  InputTextareaModule,
  ToolbarModule,
  ConfirmDialogModule,
  PaginatorModule,
  TabViewModule,
  TagModule,
  InputGroupModule,
  InputGroupAddonModule,
  PasswordModule,
  TooltipModule,
  MenuModule
];

@NgModule({
  imports: PRIMENG_MODULES,
  exports: PRIMENG_MODULES
})
export class PrimeNGModule {}
