var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
var MagicTheGatheringService = /** @class */ (function () {
    function MagicTheGatheringService(http) {
        this.http = http;
    }
    MagicTheGatheringService.prototype.getCard = function (card) {
        var parameter = card.getLanguage() !== 'english' ? card.getName() + '&language=' + card.getLanguage() : '"' + card.getName() + '"';
        console.log(parameter);
        return this.http.get('https://api.magicthegathering.io/v1/cards?name=' + parameter);
    };
    MagicTheGatheringService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http])
    ], MagicTheGatheringService);
    return MagicTheGatheringService;
}());
export { MagicTheGatheringService };
//# sourceMappingURL=magic-the-gathering.service.js.map