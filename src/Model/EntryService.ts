import { PasswordGroup, PasswordEntry } from "./Model";
import { Observable } from "./Observable";
import NotificationService from "./NotificationService";

class EntryService {
    readonly root = new Observable<PasswordGroup>(new PasswordGroup("root"));

    public addSubGroup(newGroup: PasswordGroup, targetGroupId: string) {
        const newRoot = this.root.get().clone();
        const parent = newRoot.findGroupById(targetGroupId);

        if(parent === null)
            return;

        parent.addGroup(newGroup);
        this.root.set(newRoot);
        this.modelChanged();
    }

    public moveGroup(groupId: string, targetGroupId: string) {
        const newRoot = this.root.get().clone();
        const group = newRoot.findGroupById(groupId);
        const targetGroup = newRoot.findGroupById(targetGroupId);

        if (group === null || targetGroup === null)
            return;

        if (!this.canGroupBeMoved(group, targetGroup))
            return;

        if(group.parent !== undefined)
            group.parent.removeGroup(group);
        
        targetGroup.addGroup(group);
        
        this.root.set(newRoot);
        this.modelChanged();
    }

    private canGroupBeMoved(groupToMove: PasswordGroup, targetGroup: PasswordGroup) {
        if (groupToMove === targetGroup)
            return false;

        if (groupToMove.containsGroup(targetGroup))
            return false;

        if (groupToMove.parent === targetGroup)
            return false;

        return true;
    }

    public addEntry(entry: PasswordEntry, groupId: string) {
        const newRoot = this.root.get().clone();
        const targetGroup = newRoot.findGroupById(groupId);

        if(targetGroup !== null) {
            targetGroup.add(entry);
            this.root.set(newRoot);
            this.modelChanged();
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
        this.modelChanged();
    }

    public removeEntry(entryId: string) {
        const newRoot = this.root.get().clone();
        const entry = newRoot.findEntryById(entryId);
        
        if(entry === null)
            return;

        const group = entry.group;
        group.remove(entry);
        this.root.set(newRoot);
        this.modelChanged();
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

        for(let i=4; i<100; i++)
            root.addGroup(new PasswordGroup("Group " + i));

        this.root.set(root);
    }

    private modelChanged() {
        NotificationService.showNotification("Changes saved");
    }

    public findGroupById(id: string) : PasswordGroup | null {
        return this.root.get().findGroupById(id);
    }

    public findEntryById(id: string) : PasswordEntry | null {
        return this.root.get().findEntryById(id);
    }

    public searchEntries(searchTerms: string): PasswordEntry[] {
        const matches = new Array<PasswordEntry>();
        const expression = new RegExp(searchTerms, "i")
    
        this.root.get().visitEntries(this.root.get(), (entry) => {
            if(entry.name.match(expression)) {
                matches.push(entry);
            }
        })

        return matches.sort((a, b) => a.name.localeCompare(b.name));
    }
}

export default new EntryService();