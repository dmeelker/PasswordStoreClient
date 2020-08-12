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
          <button onClick={() => props.openEntry(item)}>Open</button>
          <button onClick={() => copyToClipboard(item)}>Copy</button>
          <button onClick={() => props.onDeleteEntry(item)}>Delete</button>
        </td>
      </tr>
    );
  }

  return (
    <table className="entry-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>User name</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
