var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionService } from '../../services/httpservices/google-cloud-vision.service';
import { AlertService } from '../../services/uiservices/alert.service';
import { ScannedCard } from '../../classes/scanned-card';
import { Platform } from '@ionic/angular';
import { MagicTheGatheringService } from '../../services/httpservices/magic-the-gathering.service';
import { Card } from '../../classes/card';
import { ToastService } from '../../services/uiservices/toast.service';
import { SettingsService } from '../../services/dbservices/settings.service';
import { CardCollectionService } from '../../services/dbservices/card-collection.service';
var ScannerPage = /** @class */ (function () {
    function ScannerPage(camera, vision, alert, mtg, toast, settingsService, plt, alertController, cardCollectionService) {
        var _this = this;
        this.camera = camera;
        this.vision = vision;
        this.alert = alert;
        this.mtg = mtg;
        this.toast = toast;
        this.settingsService = settingsService;
        this.plt = plt;
        this.alertController = alertController;
        this.cardCollectionService = cardCollectionService;
        settingsService.getLanguage().then(function (c) { return _this.language = c.get('language'); });
    }
    ScannerPage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            targetHeight: 700,
            targetWidth: 500,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.vision.getTextDetectionResponse(imageData).subscribe(function (result) {
                _this.toast.presentSuccessToast('Text successfully read!');
                var sc = _this.parseTextDetectionResponse(result);
                _this.toast.presentSuccessToast(sc.getName() + " " + sc.getLanguage());
                _this.parseMTGServiceResponse(sc);
                // CreateItem with databaseService !
                // this.saveResults(imageData, result.json().responses);
            }, function (err) {
                _this.alert.showErrorAlert('Error while trying to read Text');
            });
        }, function (err) {
            _this.alert.showErrorAlert('Error while trying to make picture');
        });
    };
    ScannerPage.prototype.parseMTGServiceResponse = function (scannedCard) {
        var _this = this;
        this.mtg.getCard(scannedCard).toPromise().then(function (response) {
            var c = response.json().cards[0];
            // Hier wird die Karte nach Sprache gesucht.
            c = c.foreignNames.find(function (f) { return f.language.toLowerCase() === _this.language.toLowerCase(); });
            _this.card = new Card(c.name, c.multiverseid, c.imageUrl);
        }).catch(function (err) { return _this.alert.showErrorAlert('Error while trying to find card'); });
    };
    ScannerPage.prototype.parseTextDetectionResponse = function (textDetectionResponse) {
        var responseToParse = textDetectionResponse.json().responses[0].textAnnotations[0];
        return new ScannedCard(responseToParse.description, responseToParse.locale);
    };
    ScannerPage.prototype.ngOnInit = function () {
    };
    ScannerPage.prototype.presentAlertCheckbox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Lists',
                            inputs: [
                                {
                                    name: 'checkbox1',
                                    type: 'checkbox',
                                    label: 'Checkbox 1',
                                    value: 'value1',
                                    checked: true
                                },
                                {
                                    name: 'checkbox2',
                                    type: 'checkbox',
                                    label: 'Checkbox 2',
                                    value: 'value2'
                                },
                                {
                                    name: 'checkbox3',
                                    type: 'checkbox',
                                    label: 'Checkbox 3',
                                    value: 'value3'
                                },
                                {
                                    name: 'checkbox4',
                                    type: 'checkbox',
                                    label: 'Checkbox 4',
                                    value: 'value4'
                                },
                                {
                                    name: 'checkbox5',
                                    type: 'checkbox',
                                    label: 'Checkbox 5',
                                    value: 'value5'
                                },
                                {
                                    name: 'checkbox6',
                                    type: 'checkbox',
                                    label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
                                    value: 'value6'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScannerPage = __decorate([
        Component({
            selector: 'app-scanner',
            templateUrl: './scanner.page.html',
            styleUrls: ['./scanner.page.scss'],
        }),
        __metadata("design:paramtypes", [Camera,
            GoogleCloudVisionService,
            AlertService,
            MagicTheGatheringService,
            ToastService,
            SettingsService,
            Platform,
            AlertController,
            CardCollectionService])
    ], ScannerPage);
    return ScannerPage;
}());
export { ScannerPage };
//# sourceMappingURL=scanner.page.js.map