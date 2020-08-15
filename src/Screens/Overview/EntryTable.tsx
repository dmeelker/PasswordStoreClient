import React from 'react';
import { PasswordEntry } from '../../Model/Model';
import copy from 'copy-to-clipboard';
import { FaEdit, FaCopy, FaTrashAlt } from 'react-icons/fa';
import NotificationService from '../../Model/NotificationService';

export interface EntryTableProps {
  entries: Array<PasswordEntry>;
  showGroup: boolean;
  openEntry: (entry: PasswordEntry) => any;
  onDeleteEntry: (entry: PasswordEntry) => any;
}

export function EntryTable(props: EntryTableProps) {
  function copyUsername(entry: PasswordEntry) {
    copy(entry.username);
    NotificationService.showNotification("User name copied!");
  };

  function copyPassword(entry: PasswordEntry) {
    copy(entry.password);
    NotificationService.showNotification("Password copied!");
  };

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
            {props.showGroup && <td className="leading-10">{entry.group.name}</td>}
            <td className="leading-10 hover:bg-blue-100"><EntryName entry={entry}/></td>
            <td className="leading-10">{entry.username}
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
