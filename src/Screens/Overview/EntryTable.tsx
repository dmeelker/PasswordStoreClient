import React from 'react';
import { PasswordEntry } from '../../Model/Model';
import copy from 'copy-to-clipboard';

export interface EntryTableProps {
  entries: Array<PasswordEntry>;
  onEntrySelected: (entry: PasswordEntry) => any;
  openEntry: (entry: PasswordEntry) => any;
  onDeleteEntry: (entry: PasswordEntry) => any;
}

export function EntryTable(props: EntryTableProps) {
  let rows = [];

  const copyToClipboard = (entry: PasswordEntry) => {
    copy(entry.password);
  };

  const openEntryUrl = (entry: PasswordEntry) => {
    window.open(entry.url, "_blank");
  };

  for (let item of props.entries) {
    let name = <span>{item.name}</span>;
    if (item.containsUrl()) {
      name = <a href={item.url} target="_blank">{item.name}</a>
    }

    rows.push(
      <tr key={item.id}>
        <td>{item.group.name}</td>
        <td onClick={() => props.onEntrySelected(item)}>{name}</td>
        <td onClick={() => props.onEntrySelected(item)}>{item.username}</td>
        <td>
          <button className="btn" onClick={() => props.openEntry(item)}>O</button>
          <button className="btn" onClick={() => copyToClipboard(item)}>C</button>
          <button className="btn" onClick={() => props.onDeleteEntry(item)}>D</button>
        </td>
      </tr>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-1/6">Group</th>
          <th className="w-1/6">Name</th>
          <th className="w-2/6">User name</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
