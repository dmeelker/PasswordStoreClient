import {v4 as uuid} from "uuid";

export class ApplicationModel {
    public groups = new Array<PasswordGroup>();

    public static instance = new ApplicationModel();
};

export class PasswordGroup {
    public id: string = uuid();
    public entries = new Array<PasswordEntry>();

    constructor (public name: string) {
    }

    public clone(): PasswordGroup {
        let clone = new PasswordGroup(this.name);
        clone.id = this.id;
        clone.entries = this.entries;
        return clone;
    }
};

export class PasswordEntry {
    public id: string = uuid();
    public name: string = "";
    public username: string = "";
    public password: string = "";

    public clone() : PasswordEntry {
        let clone = new PasswordEntry();
        clone.id = this.id;
        clone.name = this.name;
        clone.username = this.username;
        clone.password = this.password;
        return clone;
    }
};