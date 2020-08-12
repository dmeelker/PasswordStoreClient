import React from 'react';
import { PasswordEntry } from '../../Model/Model';
import copy from 'copy-to-clipboard';

export interface EntryTableProps {
  entries: Array<PasswordEntry>;
  openEntry: (entry: PasswordEntry) => any;
  onDeleteEntry: (entry: PasswordEntry) => any;
}

export function EntryTable(props: EntryTableProps) {
  let rows = [];

  const copyToClipboard = (entry: PasswordEntry) => {
    copy(entry.password);
  };

  const deleteEntry = (entry: PasswordEntry) => {

  };

  for (let item of props.entries) {
    rows.push(
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.username}</td>
        <td>
          <button className="btn" onClick={() => props.openEntry(item)}>Open</button>
          <button className="btn" onClick={() => copyToClipboard(item)}>Copy</button>
          <button className="btn" onClick={() => props.onDeleteEntry(item)}>Delete</button>
        </td>
      </tr>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-1/5">Name</th>
          <th className="w-1/5">User name</th>
          <th className="w-3/5"></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
