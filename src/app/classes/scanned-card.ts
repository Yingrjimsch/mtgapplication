export class ScannedCard {

    constructor(description: string, locale: string) {
        this.language = locale;
        this.name = description.split('\n')[0];
    }
    private name: string;
    private language: string;

    getLanguage(): string {
        return this.language;
    }

    getName(): string {
        return this.name;
    }
}
