import React, { useState } from 'react';
import { PasswordGroup, PasswordEntry } from '../../Model/Model';
import { EntryTable } from './EntryTable';
import { GroupList } from './GroupList';
import { EntryDetails } from './EntryDetails';
import { useObservable } from '../../Model/Observable';
import EntryService from '../../Model/EntryService';
import { Modal } from '../../Components/Modal';

export function Overview() {
  const groups = useObservable(EntryService.root);
  const [selectedGroupId, setSelectedGroupId] = useState(EntryService.root.get().id);
  const [openEntry, setOpenEntry] = useState<PasswordEntry>();
  const [createMode, setCreateMode] = useState(false);
  const [searchResults, setSearchResults] = useState<PasswordEntry[]>();
  const [searchTerms, setSearchTerms] = useState("");

  const selectedGroup = groups.findGroupById(selectedGroupId);
  
  function createNewGroup(){
    const newGroupName = prompt("What should the new group be called?");

    if (newGroupName) {
      const newGroup = new PasswordGroup(newGroupName);
      EntryService.addSubGroup(newGroup, selectedGroupId);
    }
  }

  function createNewEntry(){
    if (!selectedGroup)
      return;
    
    let newEntry = new PasswordEntry(selectedGroup);
    showEntryDetails(newEntry, true);
  }

  function groupSelected(group: PasswordGroup) {
    clearSearch();
    setSelectedGroupId(group.id);
  }

  function showEntryDetails(entry: PasswordEntry, createMode: boolean = false) {
    setCreateMode(createMode);
    setOpenEntry(entry.clone());
  }

  function doDeleteEntry(entry: PasswordEntry) {
    if (window.confirm(`Really delete entry '${entry.name}'?`)) {
      const parentGroupId = entry.group.id;
      EntryService.removeEntry(entry.id);
      setSelectedGroupId(parentGroupId);
    }
  }

  function completeEdit() {
    if(openEntry === undefined)
      return;

    if(createMode) {
      EntryService.addEntry(openEntry, selectedGroupId);
    } else {
      EntryService.updateEntry(openEntry);
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
      setSearchResults(EntryService.searchEntries(searchTerms));
    } else {
      setSearchResults(undefined);
    }
  }

  let entryDetails;
  if (openEntry) {
    entryDetails = (
      <Modal>
        <EntryDetails entry={openEntry} savePressed={completeEdit} cancelPressed={cancelEdit}/>
      </Modal>
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
          <div className="w-1/4 mr-4 overflow-y-auto">
            <GroupList 
              root={groups} 
              selectedGroup={selectedGroup} 
              onGroupSelected={groupSelected} 
            />
          </div>
          <div className="flex-1 overflow-y-auto h-full">
            <EntryTable 
              entries={searchResults ?? selectedGroup?.entries ?? []} 
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

