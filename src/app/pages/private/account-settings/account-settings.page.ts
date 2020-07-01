import { Component, OnInit } from '@angular/core';
import { Settings } from '../../../classes/settings';
import { first } from 'rxjs/operators';
import { ToastService } from 'src/app/services/uiservices/toast.service';
import { UserService } from 'src/app/services/dbservices/user.service';
import { MtgUser } from 'src/app/classes/mtg-user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {

  public mtgUser: MtgUser = new MtgUser();

  constructor(private toastService: ToastService, private userService: UserService) {
    userService.getUser().then(user => this.mtgUser = (user.data() as MtgUser))
      .catch(() => toastService.presentErrorToast('Could not find Loggedin User.'));
  }

  languageChange() {
    this.userService.updateUserLanguage(this.mtgUser.language);
  }

  ngOnInit() {
  }
}
