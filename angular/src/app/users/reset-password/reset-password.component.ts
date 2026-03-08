import { Component, Injector, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  ResetPasswordDto
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordDialogComponent extends AppComponentBase {
  @ViewChild('resetPasswordModal') resetPasswordModal: NgForm;
  public isLoading = false;
  public visible = false;
  public resetPasswordDto: ResetPasswordDto;
  id: number;

  constructor(
    injector: Injector,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  show(id: number) {
    this.id = id;
    this.isLoading = true;
    this.resetPasswordDto = new ResetPasswordDto();
    this.resetPasswordDto.userId = this.id;
    this.resetPasswordDto.newPassword = Math.random()
      .toString(36)
      .substring(2, 12);
    this.isLoading = false;
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  public resetPassword(): void {
    this.isLoading = true;
    this._userService.resetPassword(this.resetPasswordDto).subscribe(
      () => {
        this.notify.info('Password Reset');
        this.hide();
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
