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
        <td className="leading-10">{item.group.name}</td>
        <td onClick={() => props.onEntrySelected(item)} className="leading-10">{name}</td>
        <td onClick={() => props.onEntrySelected(item)} className="leading-10">{item.username}
            <div className="float-right">
              <button className="btn-icon" onClick={() => props.openEntry(item)}><i className="far fa-edit"></i></button>
              <button className="btn-icon" onClick={() => copyToClipboard(item)}><i className="far fa-copy"></i></button>
              <button className="btn-icon" onClick={() => props.onDeleteEntry(item)}><i className="far fa-trash-alt"></i></button>
            </div>
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
          <th className="">User name</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
