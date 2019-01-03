var CardCollection = /** @class */ (function () {
    function CardCollection(name) {
        this.cards = new Array();
        this.name = name;
    }
    CardCollection.prototype.getName = function () {
        return this.name;
    };
    CardCollection.prototype.getNumberOfCards = function () {
        return this.cards.length;
    };
    CardCollection.prototype.getLegality = function () {
        return this.legality;
    };
    return CardCollection;
}());
export { CardCollection };
//# sourceMappingURL=card-collection.js.map