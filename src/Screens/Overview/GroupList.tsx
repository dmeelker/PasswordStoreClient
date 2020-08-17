import React from 'react';
import { PasswordGroup } from '../../Model/Model';
import { conditionalClass } from '../../Utilities/RenderHelpers';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import EntryService from '../../Model/EntryService';

interface GroupListProps {
  groups: PasswordGroup;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

export function GroupList(props: GroupListProps) {
  return (<div className="group-list overflow-x-hidden">
      <GroupNode 
        key={props.groups.id}
        group={props.groups}
        selectedGroup={props.selectedGroup} 
        onGroupSelected={props.onGroupSelected}
      />
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

  function onDragStart(event: React.DragEvent) {
    event.dataTransfer.setData("text/plain", props.group.id);
    event.dataTransfer.dropEffect = "move";
  }

  function onDragEnter(event: React.DragEvent) {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.add("border-2", "border-green-800");
  }

  function onDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function onDragExit(event: React.DragEvent) {
    event.preventDefault();
    const element = event.target as HTMLElement;
    element.classList.remove("border-2", "border-green-800");
  }

  function onDrop(event: React.DragEvent, group: PasswordGroup) {
    event.preventDefault();
    
    const element = event.target as HTMLElement;
    element.classList.remove("border-2", "border-green-800");

    var data = event.dataTransfer.getData("text");
    event.dataTransfer.clearData();
    EntryService.moveGroup(data, group.id)
  }

  return (
    <div>
      <div className="leading-8 whitespace-no-wrap">
        <button className="w-5 inline-block focus:outline-none" onClick={toggleCollapse}>
          {collapsible && 
            (collapsed ? <FaChevronRight/> : <FaChevronDown/>)
          }
        </button>
        <button draggable="true" onDragStart={onDragStart} onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragExit} onDrop={(e) => onDrop(e, props.group)} className={"flex-1 px-2 text-left rounded hover:bg-green-200 focus:bg-green-200 focus:outline-none" + conditionalClass(props.selectedGroup === props.group, "bg-green-200")} 
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