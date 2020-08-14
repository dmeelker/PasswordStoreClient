import React from 'react';
import { PasswordEntry } from '../../Model/Model';
import copy from 'copy-to-clipboard';

export interface EntryTableProps {
  entries: Array<PasswordEntry>;
  showGroup: boolean;
  openEntry: (entry: PasswordEntry) => any;
  onDeleteEntry: (entry: PasswordEntry) => any;
}

export function EntryTable(props: EntryTableProps) {
  function copyUsername(entry: PasswordEntry) {
    copy(entry.username);
  };

  function copyPassword(entry: PasswordEntry) {
    copy(entry.password);
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
            <td className="leading-10"><EntryName entry={entry}/></td>
            <td className="leading-10">{entry.username}
                <div className="float-right">
                  <button className="btn-icon" onClick={() => props.openEntry(entry)} title="Edit entry"><i className="far fa-edit"></i></button>
                  <button className="btn-icon" onClick={() => copyUsername(entry)} title="Copy user name"><i className="far fa-copy"></i></button>
                  <button className="btn-icon" onClick={() => copyPassword(entry)} title="Copy password"><i className="far fa-copy"></i></button>
                  <button className="btn-icon" onClick={() => props.onDeleteEntry(entry)} title="Delete entry"><i className="far fa-trash-alt"></i></button>
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
