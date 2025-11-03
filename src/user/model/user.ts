export class User {
    private id: string;
    private email: string;
    private username: string;
    private password: string;

    constructor(id: string, email: string, username: string, password: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    get Id(): string {
        return this.id;
    }

    get Email(): string {
        return this.email;
    }

    get Username(): string {
        return this.username;
    }

    get Password(): string {
        return this.password;
    }
}