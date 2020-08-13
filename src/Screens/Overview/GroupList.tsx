import React from 'react';
import { PasswordGroup } from '../../Model/Model';

interface GroupNodeProps {
  group: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

function GroupNode(props: GroupNodeProps) {
  const [collapsed, setCollapsed] = React.useState(true);
  const collapsible = props.group.groups.length > 0;
  let children = [];

  for(let child of props.group.groups) {
    children.push(<GroupNode key={child.id} group={child} onGroupSelected={props.onGroupSelected}></GroupNode>);
  }

  const groupSelected = () => {
    props.onGroupSelected(props.group);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <div className=" leading-8">
        <button className="w-5 inline-block focus:outline-none" onClick={toggleCollapse}>
          {collapsible ? 
            <i className={"fas " + (collapsed ? "fa-chevron-right" : "fa-chevron-down")}></i> :
            ""
          }
        </button>
        <button className="flex-1 px-2 text-left hover:bg-green-200 focus:bg-green-200 focus:outline-none" onClick={groupSelected} onDoubleClick={toggleCollapse}>{props.group.name}</button>
      </div>
      <div className={(collapsed ? "hidden" : "") + " pl-4"} >{children}</div>
    </div>)
}

export interface GroupListProps {
  groups: Array<PasswordGroup>;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

export function GroupList(props: GroupListProps) {
  return (<div className="group-list">
    {props.groups.map((group, index) => (
      <GroupNode group={group} onGroupSelected={props.onGroupSelected}/>
      // <button className="w-full text-left px-4 py-2 hover:bg-green-200 focus:bg-green-200" key={group.id} onClick={() => props.selectionChangedHandler(group)}>{group.name}</button>
    ))}
  </div>);
}
