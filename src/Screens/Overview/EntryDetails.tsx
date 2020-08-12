import React, { useEffect } from 'react';
import { PasswordEntry } from '../../Model/Model';

interface EntryDetailsProp {
    entry: PasswordEntry;
    savePressed: () => any;
    cancelPressed: () => any;
}

export function EntryDetails(props: EntryDetailsProp) {
    let entry = props.entry;
    const firstField = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstField.current?.focus();
    });

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        entry.name = formData.get("name") as string;
        entry.username = formData.get("username") as string;
        entry.password = formData.get("password") as string;
        props.savePressed();
    };

    const cancelButtonPressed = (event: React.MouseEvent) => {
        event.preventDefault();
        props.cancelPressed();
    };

    return (
        <div className="m-auto w-3/5 my-10 bg-white shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={onFormSubmit}>
                <div className="leading-8">
                    <div className="bg-gray-100 px-4 py-5 grid grid-cols-3 gap-4">
                        <label className="">Name</label>
                        <input type="text" name="name" className="col-span-2" defaultValue={props.entry.name} autoComplete="off" ref={firstField}/>
                    </div>

                    <div className="bg-white px-4 py-5 grid grid-cols-3 gap-4">
                        <label className="">User name</label>
                        <input type="text" name="username" className="col-span-2" defaultValue={props.entry.username} autoComplete="off"/>
                    </div>

                    <div className="bg-gray-100 px-4 py-5 grid grid-cols-3 gap-4">
                        <label className="">Password</label>
                        <input type="password" name="password" className="col-span-2" defaultValue={props.entry.password} />
                    </div>
                </div>
                <div className="text-right m-4">
                    <input className="btn-primary" type="submit" value="Save"></input>
                    <button className="btn-secondary" onClick={cancelButtonPressed}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
