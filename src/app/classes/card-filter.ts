export class CardFilter {
    constructor() {
        this.colors = ['white', 'blue', 'green', 'red', 'black'];
        this.cardTypes = ['creature', 'planeswalker', 'instant', 'sorcery', 'enchantment', 'artifact', 'land'];
        this.rarities = ['common', 'uncommon', 'rare', 'mythic'];
        this.manaCosts = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    }
    public colors = []
    public cardTypes = []
    public rarities = []
    public manaCosts = []
}
