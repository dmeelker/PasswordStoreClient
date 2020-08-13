import React from 'react';
import ReactDOM from 'react-dom';
//import './index.scss';
import App from './App';
import { ApplicationModel, PasswordGroup, PasswordEntry } from './Model/Model';

let group1 = new PasswordGroup("Group 1");

for(let i=1; i<100; i++){
  let entry = new PasswordEntry(group1);
  entry.name = "Google " + i;
  entry.username = "piet";
  entry.url = "https://www.google.com";
  entry.password = "lala";
  group1.entries.push(entry);
}
{
  let entry = new PasswordEntry(group1);
  entry.name = "Bank 2";
  entry.username = "piet 2";
  group1.entries.push(entry);
}
let group2 = new PasswordGroup("Group 2");
{
  let entry = new PasswordEntry(group2);
  entry.name = "Bank 3";
  entry.username = "piet 3";
  group2.entries.push(entry);
}
let group3 = new PasswordGroup("Group 3");

ApplicationModel.instance.groups.push(group1);
ApplicationModel.instance.groups.push(group2);
ApplicationModel.instance.groups.push(group3);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);