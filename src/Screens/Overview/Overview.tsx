import React, { useState } from 'react';
import "./Overview.scss";
import { PasswordGroup, ApplicationModel, PasswordEntry } from '../../Model/Model';
import { Overlay } from '../../Components/Overlay/Overlay';
import { EntryTable } from './EntryTable';
import { GroupList } from './GroupList';
import { EntryDetails } from './EntryDetails';

export function Overview() {
  const [groups, setGroups] = useState(ApplicationModel.instance.groups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [openEntry, setOpenEntry] = useState<PasswordEntry>();

  function createNewGroup(){
    let newGroupName = prompt("What should the new group be called?");

    if (newGroupName) {
      let newGroups = groups.slice();
      newGroups.push(new PasswordGroup(newGroupName));
      setGroups(newGroups);
    }
  }

  function createNewEntry(){
    let newEntry = new PasswordEntry();
    newEntry.name = "New entry";

    let updatedGroup = selectedGroup.clone();
    updatedGroup.entries.push(newEntry);
    setSelectedGroup(updatedGroup);
  }

  function doOpenEntry(entry: PasswordEntry) {
    setOpenEntry(entry);
  }

  function doDeleteEntry(entry: PasswordEntry) {
    let updatedGroup = selectedGroup.clone();
    let entryIndex = updatedGroup.entries.indexOf(entry);
    updatedGroup.entries.splice(entryIndex, 1);
    setSelectedGroup(updatedGroup);
  }

  function clearOpenEntrySelection() {
    setOpenEntry(undefined);
  }

  let entryDetails;
  if (openEntry) {
    entryDetails = (
      <Overlay>
        <EntryDetails entry={openEntry} editingDone={clearOpenEntrySelection}/>
      </Overlay>
    );
  }

  return (
    <div className="overview-wrap">
      <div className="header">Overview
        <button onClick={createNewGroup}>Add Group</button>
        <button onClick={createNewEntry}>Add Entry</button>
      </div>
      <div className="overview-container">
        <div className="tree-container">
          <GroupList groups={groups} selectedGroup={selectedGroup} selectionChangedHandler={(newSelection => setSelectedGroup(newSelection))} />
        </div>
        <div className="table-container">
          <EntryTable entries={selectedGroup.entries} openEntry={doOpenEntry} onDeleteEntry={doDeleteEntry}/>
        </div>
      </div>
      {entryDetails}
    </div>
  );
}

