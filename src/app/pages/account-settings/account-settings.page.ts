import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/dbservices/settings.service';
import { Settings } from '../../classes/settings';
import { first } from 'rxjs/operators';
import { ToastService } from 'src/app/services/uiservices/toast.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  public settings: Settings = new Settings();
  constructor(private settingsService: SettingsService, private toastService: ToastService) {
    settingsService.getLanguage().then(a => {
      this.settings = a.docs.map(a => ({ id: a.id, ...a.data() }) as Settings)[0];
    }).catch(err => toastService.presentErrorToast('Could not find Settings.'));
  }

  languageChange() {
    this.settingsService.setLanguage(this.settings.language);
  }
  ngOnInit() {
  }

}
