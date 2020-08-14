import React from 'react';
import { PasswordGroup } from '../../Model/Model';
import { conditionalClass } from '../../RenderHelpers';

interface GroupListProps {
  groups: Array<PasswordGroup>;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

export function GroupList(props: GroupListProps) {
  return (<div className="group-list">
    {props.groups.map((group) => (
      <GroupNode 
        key={group.id}
        group={group}
        selectedGroup={props.selectedGroup} 
        onGroupSelected={props.onGroupSelected}
      />
    ))}
  </div>);
}

interface GroupNodeProps {
  group: PasswordGroup;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

function GroupNode(props: GroupNodeProps) {
  const [collapsed, setCollapsed] = React.useState(true);
  const collapsible = props.group.groups.length > 0;

  function groupSelected(){
    props.onGroupSelected(props.group);
  };

  function toggleCollapse() {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <div className=" leading-8">
        <button className="w-5 inline-block focus:outline-none" onClick={toggleCollapse}>
          {collapsible && 
            <i className={"fas" + conditionalClass(collapsed, "fa-chevron-right", "fa-chevron-down")}></i>
          }
        </button>
        <button className={"flex-1 px-2 text-left rounded hover:bg-green-200 focus:bg-green-200 focus:outline-none" + conditionalClass(props.selectedGroup === props.group, "bg-green-200")} 
          onClick={groupSelected} 
          onDoubleClick={toggleCollapse}>{props.group.name}</button>
      </div>
      <div className={conditionalClass(collapsed, "hidden") + "pl-4"}>
        {props.group.groups.map((child) =>
          <GroupNode 
            key={child.id} 
            group={child} 
            selectedGroup={props.selectedGroup}
            onGroupSelected={props.onGroupSelected}/>)
        }
        </div>
    </div>)
}