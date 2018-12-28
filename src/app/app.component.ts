import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      route: 'home',
      icon: 'home',
      device: 'all'
    },
    {
      title: 'Deck List',
      url: '/deck-list',
      route: 'deck-list',
      icon: 'albums',
      device: 'all'
    },
    {
      title: 'Scann Cards',
      url: '/scanner',
      route: 'scanner',
      icon: 'qr-scanner',
      device: 'mobile'
    },
    {
      title: 'My Archive',
      url: '/my-archive',
      route: 'my-archive',
      icon: 'archive',
      device: 'all'
    },
    {
      title: 'Account',
      url: '/account-settings',
      route: 'account-settings',
      icon: 'person',
      device: 'all'
    }
  ];

  getAppPagesByDevice(device: string, all: string = 'all') {
    return this.appPages.filter(p => (p.device === device || p.device === all));
  }

  constructor(
    public plt: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.plt.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
