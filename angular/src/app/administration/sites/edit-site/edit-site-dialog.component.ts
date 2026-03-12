import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  SiteServiceProxy,
  SiteDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-site-dialog',
  templateUrl: 'edit-site-dialog.component.html'
})
export class EditSiteDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  site: SiteDto = new SiteDto();
  id: number;

  @ViewChild('editSiteModal') editSiteModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _siteService: SiteServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(id: number): void {
    this.saving = false;
    this.id = id;
    this.visible = true;

    this._siteService.get(this.id).subscribe((result: SiteDto) => {
      this.site = result;
      this.cd.detectChanges();
    });
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._siteService.update(this.site).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
        this.cd.detectChanges();
      }
    );
  }
}
