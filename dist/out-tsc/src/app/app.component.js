var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(plt, splashScreen, statusBar) {
        this.plt = plt;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.appPages = [
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
        this.initializeApp();
    }
    AppComponent.prototype.getAppPagesByDevice = function (device, all) {
        if (all === void 0) { all = 'all'; }
        return this.appPages.filter(function (p) { return (p.device === device || p.device === all); });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.plt.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map