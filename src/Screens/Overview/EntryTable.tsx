import React, { useState, useEffect } from 'react';
import { PasswordEntry } from '../../Model/Model';
import copy from 'copy-to-clipboard';
import { FaEdit, FaCopy, FaTrashAlt } from 'react-icons/fa';
import NotificationService from '../../Model/NotificationService';
import { conditionalClass } from '../../RenderHelpers';

export interface EntryTableProps {
  entries: Array<PasswordEntry>;
  showGroup: boolean;
  //onEntrySelected: (entry: PasswordEntry) => void;
  openEntry: (entry: PasswordEntry) => void;
  onDeleteEntry: (entry: PasswordEntry) => void;
}

export function EntryTable(props: EntryTableProps) {
  const [selectedEntry, setSelectedEntry] = useState<PasswordEntry>();

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (selectedEntry) {
        if(event.code === "KeyC" && event.ctrlKey) {
          copyPassword(selectedEntry);
        } else if(event.code === "KeyB" && event.ctrlKey) {
          copyUsername(selectedEntry);
        }
      }
    };

    window.document.addEventListener("keyup", eventHandler);

    return () => {
      window.document.removeEventListener("keyup", eventHandler);
    };
  });

  function copyUsername(entry: PasswordEntry) {
    copy(entry.username);
    NotificationService.showNotification("User name copied!");
  };

  function copyPassword(entry: PasswordEntry) {
    copy(entry.password);
    NotificationService.showNotification("Password copied!");
  };

  function selectEntry(entry: PasswordEntry) {
    setSelectedEntry(entry);
    //props.onEntrySelected(entry);
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          {props.showGroup && <th className="w-1/6">Group</th>}
          <th className="w-1/6">Name</th>
          <th className="">User name</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map((entry) => 
          <tr key={entry.id}>
            {props.showGroup && <td className={"leading-10" + conditionalClass(selectedEntry === entry, "bg-blue-100")} onClick={() => selectEntry(entry)}>{entry.group.name}</td>}
            <td className={"leading-10" + conditionalClass(selectedEntry === entry, "bg-blue-100")} onClick={() => selectEntry(entry)}><EntryName entry={entry}/></td>
            <td className={"leading-10" + conditionalClass(selectedEntry === entry, "bg-blue-100")} onClick={() => selectEntry(entry)}>{entry.username}
                <div className="float-right">
                  <button className="btn-icon" onClick={() => props.openEntry(entry)} title="Edit entry"><FaEdit/></button>
                  <button className="btn-icon" onClick={() => copyUsername(entry)} title="Copy user name"><FaCopy/></button>
                  <button className="btn-icon" onClick={() => copyPassword(entry)} title="Copy password"><FaCopy/></button>
                  <button className="btn-icon" onClick={() => props.onDeleteEntry(entry)} title="Delete entry"><FaTrashAlt/></button>
                </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

interface EntryNameProps {
  entry: PasswordEntry;
}

function EntryName(props: EntryNameProps) {
  const entry = props.entry;

  if (props.entry.containsUrl()) {
    return <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.name}</a>
  } else {
    return <span>{entry.name}</span>;
  }
}
