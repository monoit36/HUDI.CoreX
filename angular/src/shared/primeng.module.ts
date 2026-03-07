import { NgModule } from '@angular/core';

// PrimeNG Components - thêm dần khi cần
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
  PaginatorModule
];

@NgModule({
  imports: PRIMENG_MODULES,
  exports: PRIMENG_MODULES
})
export class PrimeNGModule {}
