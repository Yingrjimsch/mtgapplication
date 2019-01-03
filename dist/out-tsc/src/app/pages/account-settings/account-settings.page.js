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
import { SettingsService } from '../../services/dbservices/settings.service';
var AccountSettingsPage = /** @class */ (function () {
    function AccountSettingsPage(settingsService) {
        var _this = this;
        this.settingsService = settingsService;
        settingsService.getLanguage().then(function (c) { return _this.language = c.get('language'); });
    }
    AccountSettingsPage.prototype.languageChange = function () {
        this.settingsService.setLanguage(this.language);
    };
    AccountSettingsPage.prototype.ngOnInit = function () {
    };
    AccountSettingsPage = __decorate([
        Component({
            selector: 'app-account-settings',
            templateUrl: './account-settings.page.html',
            styleUrls: ['./account-settings.page.scss'],
        }),
        __metadata("design:paramtypes", [SettingsService])
    ], AccountSettingsPage);
    return AccountSettingsPage;
}());
export { AccountSettingsPage };
//# sourceMappingURL=account-settings.page.js.map