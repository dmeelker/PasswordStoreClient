import React, { useEffect } from 'react';
import { PasswordEntry } from '../../Model/Model';
import { GeneratePassword } from '../../Services/PasswordGenerator';

interface EntryDetailsProp {
    entry: PasswordEntry;
    savePressed: () => any;
    cancelPressed: () => any;
}

export function EntryDetails(props: EntryDetailsProp) {
    let entry = props.entry;
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState(entry.password);
    const firstField = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstField.current?.focus();
    }, []);

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        entry.name = formData.get("name") as string;
        entry.url = formData.get("url") as string;
        entry.username = formData.get("username") as string;
        entry.password = formData.get("password") as string;
        props.savePressed();
    };

    const cancelButtonPressed = (event: React.MouseEvent) => {
        event.preventDefault();
        props.cancelPressed();
    };

    const togglePasswordShown = (event: React.MouseEvent) => {
        setShowPassword(!showPassword);
        event.preventDefault();
    };

    const generatePassword = (event: React.MouseEvent) => {
        const password = GeneratePassword({minLength: 32});
        setPassword(password);
        event.preventDefault();
    };

    const baseRowStyle = "px-4 py-5 grid grid-cols-4 gap-4";
    const oddRowStyle = baseRowStyle + " bg-gray-100";
    const evenRowStyle = baseRowStyle + " bg-white";

    return (
        <div className="m-auto w-3/5 my-10 bg-white shadow overflow-hidden sm:rounded-lg">
            <form onSubmit={onFormSubmit}>
                <div className="leading-8">
                    <div className={oddRowStyle}>
                        <label className="">Name</label>
                        <input type="text" name="name" className="col-span-3" defaultValue={props.entry.name} autoComplete="off" ref={firstField}/>
                    </div>

                    <div className={evenRowStyle}>
                        <label className="">URL</label>
                        <input type="text" name="url" className="col-span-3" defaultValue={props.entry.url} autoComplete="off"/>
                    </div>

                    <div className={oddRowStyle}>
                        <label className="">User name</label>
                        <input type="text" name="username" className="col-span-3" defaultValue={props.entry.username} autoComplete="off"/>
                    </div>

                    <div className={evenRowStyle}>
                        <label className="">Password</label>
                        <div className="col-span-3">
                            <input type={showPassword ? "text": "password"} name="password" className="w-full" value={password} onChange={()=>{}} />
                            
                            <button type="button" className="btn" onClick={togglePasswordShown}>{showPassword ? "Hide" : "Show"}</button>
                            <button type="button" className="btn" onClick={generatePassword}>Generate</button>
                        </div>
                    </div>
                </div>
                <div className="text-right m-4">
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="btn-secondary" onClick={cancelButtonPressed}>Cancel</button>
                </div>
            </form>
        </div>
    );
}