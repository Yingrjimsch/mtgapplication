export class ScannedCard {

    constructor(description: string, locale: string) {
        this.description = description;
        this.language = Languages[locale];
        this.name = description.split('\n')[0];
    }
    private name: string;
    private description: string;
    private language: string;

    getDescription(): string {
        return this.description;
    }

    getLanguage(): string {
        return this.language;
    }

    getName(): string {
        return this.name;
    }
}

enum Languages {
    'en'= 'english',
    'de' = 'german'
}
