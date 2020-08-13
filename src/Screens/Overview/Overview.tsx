import React, { useState } from 'react';
import { PasswordGroup, ApplicationModel, PasswordEntry } from '../../Model/Model';
import { Overlay } from '../../Components/Overlay/Overlay';
import { EntryTable } from './EntryTable';
import { GroupList } from './GroupList';
import { EntryDetails } from './EntryDetails';

export function Overview() {
  const [groups, setGroups] = useState(ApplicationModel.instance.groups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [selectedEntry, setSelectedEntry] = useState<PasswordEntry>();
  const [openEntry, setOpenEntry] = useState<PasswordEntry>();
  const [createMode, setCreateMode] = useState(false);

  //if(!openEntry)
    //showEntryDetails(selectedGroup.entries[0]);

  function createNewGroup(){
    let newGroupName = prompt("What should the new group be called?");

    if (newGroupName) {
      let newGroups = groups.slice();
      newGroups.push(new PasswordGroup(newGroupName));
      setGroups(newGroups);
    }
  }

  function createNewEntry(){
    let newEntry = new PasswordEntry(selectedGroup);
    showEntryDetails(newEntry, true);
  }

  function showEntryDetails(entry: PasswordEntry, createMode: boolean = false) {
    setCreateMode(createMode);
    setOpenEntry(entry);
  }

  function doDeleteEntry(entry: PasswordEntry) {
    let updatedGroup = selectedGroup.clone();
    let entryIndex = updatedGroup.entries.indexOf(entry);
    updatedGroup.entries.splice(entryIndex, 1);
    setSelectedGroup(updatedGroup);
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

  let entryDetails;
  if (openEntry) {
    entryDetails = (
      <Overlay>
        <EntryDetails entry={openEntry} savePressed={completeEdit} cancelPressed={cancelEdit}/>
      </Overlay>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="py-4">
        <button className="btn-toolbar" onClick={createNewGroup}>Add Group</button>
        <button className="btn-toolbar" onClick={createNewEntry}>Add Entry</button>
      </div>
      <div className="flex-1 flex overflow-hidden px-4 pb-4">
        <div className="w-1/4 mr-4">
          <GroupList groups={groups} selectedGroup={selectedGroup} selectionChangedHandler={(newSelection => setSelectedGroup(newSelection))} />
        </div>
        <div className="flex-1 overflow-y-auto h-full">
          <EntryTable entries={selectedGroup.entries} openEntry={showEntryDetails} onEntrySelected={(entry) => setSelectedEntry(entry)} onDeleteEntry={doDeleteEntry}/>
        </div>
      </div>
      {entryDetails}
    </div>
  );
}

