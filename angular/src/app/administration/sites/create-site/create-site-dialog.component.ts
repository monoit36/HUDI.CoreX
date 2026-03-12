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
  CreateSiteDto,
  SiteServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-site-dialog',
  templateUrl: 'create-site-dialog.component.html'
})
export class CreateSiteDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  visible = false;
  site: CreateSiteDto = new CreateSiteDto();

  @ViewChild('createSiteModal') createSiteModal: NgForm;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _siteService: SiteServiceProxy,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  show(): void {
    this.saving = false;
    this.site = new CreateSiteDto();
    this.site.isActive = true;
    this.visible = true;
    this.cd.detectChanges();
  }

  hide(): void {
    this.visible = false;
  }

  save(): void {
    this.saving = true;

    this._siteService.create(this.site).subscribe(
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
