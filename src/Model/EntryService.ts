import { PasswordGroup, PasswordEntry } from "./Model";
import { Observable } from "./Observable";

type GroupVisitor = (group: PasswordGroup) => void;

class EntryService {
    readonly root = new Observable<PasswordGroup>(new PasswordGroup("root"));

    public addSubGroup(newGroup: PasswordGroup, parent: PasswordGroup) {
        parent.addGroup(newGroup);
        this.notifyListeners();
    }

    public moveGroup(groupId: string, targetGroupId: string) {
        const newRoot = this.root.get().clone();
        const group = newRoot.findGroupById(groupId);
        const targetGroup = newRoot.findGroupById(targetGroupId);

        if (group === null || targetGroup === null)
            return;

        if (group === targetGroup)
            return;

        if (group.containsGroup(targetGroup))
            return;

        if(group.parent !== undefined)
            group.parent.removeGroup(group);
        
        targetGroup.addGroup(group);
        
        this.root.set(newRoot);
        console.log(`Move ${groupId} to ${targetGroupId}`);
    }

    public addEntry(entry: PasswordEntry, groupId: string) {
        const newRoot = this.root.get().clone();
        const targetGroup = newRoot.findGroupById(groupId);

        if(targetGroup !== null) {
            targetGroup.add(entry);
            this.root.set(newRoot);
        }
    }

    public updateEntry(updatedEntry: PasswordEntry) {
        const newRoot = this.root.get().clone();
        const originalEntry = newRoot.findEntryById(updatedEntry.id)

        if(originalEntry === null)
            return;

        const group = originalEntry.group;
        group.remove(originalEntry);
        group.add(updatedEntry);

        this.root.set(newRoot);
    }

    public removeEntry(entryId: string) {
        const newRoot = this.root.get().clone();
        const entry = newRoot.findEntryById(entryId);
        
        if(entry === null)
            return;

        const group = entry.group;
        group.remove(entry);
        this.root.set(newRoot);
    }

    private notifyListeners() {
        this.root.set(this.root.get().clone());
    }

    public load() {
        const root = new PasswordGroup("root");
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

        group1.addGroup(group2);

        let group3 = new PasswordGroup("Group 3");

        root.addGroup(group1);
        root.addGroup(group3);
        this.root.set(root);
    }

    public findGroupById(id: string) : PasswordGroup | null {
        return this.root.get().findGroupById(id);
    }

    public findEntryById(id: string) : PasswordEntry | null {
        return this.root.get().findEntryById(id);
    }
}

export default new EntryService();