var ScannedCard = /** @class */ (function () {
    function ScannedCard(description, locale) {
        this.description = description;
        this.language = Languages[locale];
        this.name = description.split('\n')[0];
    }
    ScannedCard.prototype.getDescription = function () {
        return this.description;
    };
    ScannedCard.prototype.getLanguage = function () {
        return this.language;
    };
    ScannedCard.prototype.getName = function () {
        return this.name;
    };
    return ScannedCard;
}());
export { ScannedCard };
var Languages;
(function (Languages) {
    Languages["en"] = "english";
    Languages["de"] = "german";
})(Languages || (Languages = {}));
//# sourceMappingURL=scanned-card.js.map