import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authservices/authentication.service';

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
    },
    {
      title: 'Deck List',
      url: '/deck-list',
      route: 'deck-list',
      icon: 'albums',
      visibility: 'private',
    },
    {
      title: 'Scann Cards',
      url: '/scanner',
      route: 'scanner',
      icon: 'qr-scanner',
      device: 'mobile',
      visibility: 'private'
    },
    {
      title: 'My Archive',
      url: '/my-archive',
      route: 'my-archive',
      icon: 'archive',
      visibility: 'private'
    },
    {
      title: 'Account',
      url: '/account-settings',
      route: 'account-settings',
      icon: 'person',
      visibility: 'private'
    }
  ];

  getAppPagesByDevice(device: string) {
    const visibility = this.authenticationService.isAuthenticated() ? 'private' : 'public';
    return this.appPages.filter(p => (p.device === device || p.device === undefined))
    .filter(p => (p.visibility === visibility || p.visibility === undefined));
  }

  constructor(
    public plt: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authenticationService: AuthenticationService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.plt.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Right?
      /*this.authenticationService.authenticationState.subscribe(state =>
        state ? this.router.navigate(['private', 'home']) : this.router.navigate(['home'])
      );
      */
    });
  }
}
