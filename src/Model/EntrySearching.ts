import { PasswordGroup, PasswordEntry } from "./Model";

export function searchEntries(group: PasswordGroup, searchTerms: string): PasswordEntry[] {
    const matches = new Array<PasswordEntry>();
    const expression = new RegExp(searchTerms, "i")

    searchGroup(group, expression, (entry) => matches.push(entry));
    return matches.sort((a, b) => a.name.localeCompare(b.name));
}

function searchGroup(group: PasswordGroup, expression: RegExp, matchHandler: (entry: PasswordEntry) => any) {
    const entries = group.entries.filter((entry) => entry.name.match(expression));
    for(let entry of entries) {
    matchHandler(entry);
    }

    for(let child of group.groups) {
    searchGroup(child, expression, matchHandler);
    }
}