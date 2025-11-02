export class Product {

    private id: string;
    private name: string;
    private description: string;
    private image: string;

    constructor(id: string, name: string, description: string, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Description(): string {
        return this.description;
    }

    get Image(): string {
        return this.image;
    }

    set Name(name: string) {
        this.name = name;
    }

    set Description(description: string) {
        this.description = description;
    }

    set Image(image: string) {
        this.image = image;
    }

}