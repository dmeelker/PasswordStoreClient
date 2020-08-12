import React from 'react';
import { PasswordGroup } from '../../Model/Model';

export interface GroupListProps {
  groups: Array<PasswordGroup>;
  selectedGroup: PasswordGroup;
  selectionChangedHandler: (newSelection: PasswordGroup) => any;
}

export function GroupList(props: GroupListProps) {
  return (<div className="group-list">
    {props.groups.map((group, index) => (
      <button key={group.id} onClick={() => props.selectionChangedHandler(group)}>{group.name}</button>
    ))}
  </div>);
}
