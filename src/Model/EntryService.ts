import { PasswordGroup, PasswordEntry } from "./Model";
import { Observable } from "./Observable";

class EntryService {
    readonly groups = new Observable<PasswordGroup[]>([]);

    public add(newGroup: PasswordGroup) {
        this.groups.set(this.sortGroups([...this.groups.get(), newGroup]));
    }

    public addSubGroup(newGroup: PasswordGroup, parent: PasswordGroup) {
        parent.groups.push(newGroup);
        this.notifyListeners();
    }

    public moveGroup(groupId: string, targetGroupId: string) {
        console.log(`Move ${groupId} to ${targetGroupId}`);
    }

    private notifyListeners() {
        this.groups.set([...this.groups.get()]);
    }

    private sortGroups(groups: PasswordGroup[]) : PasswordGroup[] {
        return groups.sort((a, b) => a.name.localeCompare(b.name));
    }

    public load() {
        const groups = [];
        let group1 = new PasswordGroup("Group 1");

        for (let i = 1; i < 100; i++) {
            let entry = new PasswordEntry(group1);
            entry.name = "Google " + i;
            entry.username = "piet";
            entry.url = "https://www.google.com";
            entry.password = "lala";
            group1.entries.push(entry);
        }
        {
            let entry = new PasswordEntry(group1);
            entry.name = "Bank 2";
            entry.username = "piet 2";
            group1.entries.push(entry);
        }
        let group2 = new PasswordGroup("Group 2");
        {
            let entry = new PasswordEntry(group2);
            entry.name = "Bank 3";
            entry.username = "piet 3";
            group2.entries.push(entry);
        }

        group1.groups.push(group2);

        let group3 = new PasswordGroup("Group 3");

        groups.push(group1);
        groups.push(group3);

        this.groups.set(this.sortGroups(groups));
    }
}

export default new EntryService();