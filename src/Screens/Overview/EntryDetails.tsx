import React from 'react';
import { PasswordEntry } from '../../Model/Model';

interface EntryDetailsProp {
    entry: PasswordEntry;
    editingDone: () => any;
}

export function EntryDetails(props: EntryDetailsProp) {
    let entry = props.entry;

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        entry.name = formData.get("name") as string;
        entry.username = formData.get("username") as string;
        entry.password = formData.get("password") as string;
        props.editingDone();
    };

    const cancelButtonPressed = (event: React.MouseEvent) => {
        event.preventDefault();
        props.editingDone();
    };

    return (
        <div className="entry-details">
            <form onSubmit={onFormSubmit}>
                <div className="table">
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={props.entry.name} />

                    <label>User name</label>
                    <input type="text" name="username" defaultValue={props.entry.username} />

                    <label>Password</label>
                    <input type="password" name="password" defaultValue={props.entry.password} />
                </div>
                <input type="submit" value="Save"></input>
                <button onClick={cancelButtonPressed}>Cancel</button>
            </form>
        </div>
    );
}
