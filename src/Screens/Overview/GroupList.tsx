import React, { useState } from 'react';
import { PasswordGroup } from '../../Model/Model';
import { conditionalClass } from '../../Utilities/RenderHelpers';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import EntryService from '../../Model/EntryService';
import { PopupMenu, MenuItem, MenuSeparator } from '../../Components/PopupMenu';
import { createDragModel, DragSource, serializeDragModel, parseDragModel } from '../../Utilities/DragModel';

interface GroupListProps {
  root: PasswordGroup;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
}

interface PopupState {
  visible: boolean;
  group: PasswordGroup;
  x: number;
  y: number;
}

export function GroupList(props: GroupListProps) {
  const [popupState, setPopupState] = useState<PopupState>();

  function onPopupRequested(group: PasswordGroup, x: number, y: number) {
    setPopupState({visible: true, group, x, y});
  }

  function renderPopupMenu() {
    if(popupState?.visible && popupState.group !== props.root) {
      return <PopupMenu x={popupState.x} y={popupState.y} onHide={() => setPopupState(undefined)}>
        <MenuItem label="Rename" onClick={() => {renameGroupClicked(popupState.group)}}/>
        <MenuSeparator/>
        <MenuItem label="Delete" onClick={() => {deleteGroupClicked(popupState.group)}}/>
      </PopupMenu>
    } else {
      return null;
    }
  }

  function renameGroupClicked(group: PasswordGroup) {
    const newName = window.prompt("Enter a new name!");

    if(newName)
      EntryService.renameGroup(group.id, newName);
  }

  function deleteGroupClicked(group: PasswordGroup) {
    if (window.confirm(`Really remove ${group.name}?`)) {
      EntryService.removeGroup(group.id);
    }
  }

  return (<div className="group-list overflow-x-hidden">
      <GroupNode 
        key={props.root.id}
        group={props.root}
        selectedGroup={props.selectedGroup} 
        onGroupSelected={props.onGroupSelected}
        onPopupMenu={onPopupRequested}
      />
      {renderPopupMenu()}
  </div>);
}

interface GroupNodeProps {
  group: PasswordGroup;
  selectedGroup: PasswordGroup;
  onGroupSelected: (newSelection: PasswordGroup) => any;
  onPopupMenu: (group: PasswordGroup, x: number, y: number) => void;
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
    const model = createDragModel(DragSource.Group, props.group.id);
    event.dataTransfer.setData("text/plain", serializeDragModel(model));
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
    
    var data = event.dataTransfer.getData("text");
    event.dataTransfer.clearData();

    const model = parseDragModel(data);

    const element = event.target as HTMLElement;
    element.classList.remove("border-2", "border-green-800");

    switch(model.type) {
      case DragSource.Group:
        EntryService.moveGroup(model.id, group.id);
        break;
      case DragSource.Entry:
        EntryService.moveEntry(model.id, group.id);
        break;
    }
  }

  function onContextMenu(event: React.MouseEvent) {
    if(event.button === 2) {
      props.onPopupMenu(props.group, event.pageX, event.pageY);
      event.preventDefault();
      return false;
    }
  }

  return (
    <div>
      <div className="leading-8 whitespace-no-wrap">
        <button className="w-5 inline-block focus:outline-none" onClick={toggleCollapse}>
          {collapsible && 
            (collapsed ? <FaChevronRight/> : <FaChevronDown/>)
          }
        </button>
        <button 
          className={"flex-1 px-2 text-left rounded hover:bg-green-200 focus:bg-green-200 focus:outline-none" + conditionalClass(props.selectedGroup === props.group, "bg-green-200")} 
          draggable="true" 
          onDragStart={onDragStart} 
          onDragEnter={onDragEnter} 
          onDragOver={onDragOver} 
          onDragLeave={onDragExit} 
          onDrop={(e) => onDrop(e, props.group)} 
          onClick={groupSelected} 
          onDoubleClick={toggleCollapse}
          onContextMenu={onContextMenu}>{props.group.name}</button>
      </div>
      <div className={conditionalClass(collapsed, "hidden") + "pl-4"}>
        {props.group.groups.map((child) =>
          <GroupNode 
            key={child.id} 
            group={child} 
            selectedGroup={props.selectedGroup}
            onGroupSelected={props.onGroupSelected}
            onPopupMenu={props.onPopupMenu}/>)
        }
        </div>
    </div>)
}