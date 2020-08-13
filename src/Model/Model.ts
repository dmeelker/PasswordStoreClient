import {v4 as uuid} from "uuid";

export class ApplicationModel {
    public groups = new Array<PasswordGroup>();

    public static instance = new ApplicationModel();
};

export class PasswordGroup {
    public id: string = uuid();
    public groups = new Array<PasswordGroup>();
    public entries = new Array<PasswordEntry>();

    constructor (public name: string) {
    }

    public clone(): PasswordGroup {
        let clone = new PasswordGroup(this.name);
        clone.id = this.id;
        clone.entries = this.entries;
        return clone;
    }

    public add(entry: PasswordEntry) {
        this.entries.push(entry);
        this.entries = this.entries.sort((a, b) => a.name.localeCompare(b.name));
    }
};

export class PasswordEntry {
    public group: PasswordGroup;
    public id: string = uuid();
    public name: string = "";
    public url: string = "";
    public username: string = "";
    public password: string = "";

    constructor(group: PasswordGroup) {
        this.group = group;
    }

    public clone() : PasswordEntry {
        let clone = new PasswordEntry(this.group);
        clone.id = this.id;
        clone.name = this.name;
        clone.url = this.url;
        clone.username = this.username;
        clone.password = this.password;
        return clone;
    }

    public containsUrl(): boolean {
        return this.url != null && this.url.trim().length > 0;
    }
};