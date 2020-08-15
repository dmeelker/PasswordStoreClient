import React, { useState } from 'react';
import { PasswordGroup, PasswordEntry } from '../../Model/Model';
import { Overlay } from '../../Components/Overlay';
import { EntryTable } from './EntryTable';
import { GroupList } from './GroupList';
import { EntryDetails } from './EntryDetails';
import { searchEntries } from '../../Model/EntrySearching';
import { useObservable } from '../../Model/Observable';
import entryService from '../../Model/EntryService';

export function Overview() {
  const groups = useObservable(entryService.groups);

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [openEntry, setOpenEntry] = useState<PasswordEntry>();
  const [createMode, setCreateMode] = useState(false);
  const [searchResults, setSearchResults] = useState<PasswordEntry[]>();
  const [searchTerms, setSearchTerms] = useState("");
 
  //if(!openEntry)
    //showEntryDetails(selectedGroup.entries[0]);

  function createNewGroup(){
    const newGroupName = prompt("What should the new group be called?");

    if (newGroupName) {
      const newGroup = new PasswordGroup(newGroupName);

      if(selectedGroup) {
        entryService.addSubGroup(newGroup, selectedGroup);
      } else {
        entryService.add(newGroup);
      }
    }
  }

  function createNewEntry(){
    let newEntry = new PasswordEntry(selectedGroup);
    showEntryDetails(newEntry, true);
  }

  function groupSelected(group: PasswordGroup) {
    clearSearch();
    setSelectedGroup(group);
  }

  function showEntryDetails(entry: PasswordEntry, createMode: boolean = false) {
    setCreateMode(createMode);
    setOpenEntry(entry);
  }

  function doDeleteEntry(entry: PasswordEntry) {
    if (window.confirm(`Really delete entry '${entry.name}'?`)) {
      let updatedGroup = selectedGroup.clone();
      let entryIndex = updatedGroup.entries.indexOf(entry);
      updatedGroup.entries.splice(entryIndex, 1);
      setSelectedGroup(updatedGroup);
    }
  }

  function completeEdit() {
    if(createMode && openEntry) {
      let updatedGroup = selectedGroup.clone();
      updatedGroup.add(openEntry);
      setSelectedGroup(updatedGroup);
    }

    setOpenEntry(undefined);
  }

  function cancelEdit() {
    setOpenEntry(undefined);
  }

  function clearSearch() {
    setSearchTerms("");
    setSearchResults(undefined);
  }

  function searchTermsChanged(event: React.FormEvent<HTMLInputElement>) {
    const searchTerms = (event.target as HTMLInputElement).value.trim();

    if(searchTerms.length > 0) {
      setSearchResults(searchEntries(groups, searchTerms));
    } else {
      setSearchResults(undefined);
    }
  }

  let entryDetails;
  if (openEntry) {
    entryDetails = (
      <Overlay>
        <EntryDetails entry={openEntry} savePressed={completeEdit} cancelPressed={cancelEdit}/>
      </Overlay>
    );
  }

  return (
    <div className="p-4 h-full">
      <div className="p-4 box-border shadow bg-white border-size h-full flex flex-col">
        <div className="py-4">
          <button className="btn-toolbar" onClick={createNewGroup}>Add Group</button>
          <button className="btn-toolbar" onClick={createNewEntry}>Add Entry</button>
          <input type="search" className="text-input" placeholder="search" value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)} onInput={searchTermsChanged}/>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/4 mr-4">
            <GroupList 
              groups={groups} 
              selectedGroup={selectedGroup} 
              onGroupSelected={groupSelected} 
            />
          </div>
          <div className="flex-1 overflow-y-auto h-full">
            <EntryTable 
              entries={searchResults ?? selectedGroup.entries} 
              showGroup={searchResults !== undefined}
              openEntry={showEntryDetails} 
              onDeleteEntry={doDeleteEntry}
            />
          </div>
        </div>
        {entryDetails}
      </div>
    </div>
  );
}

