import React, { useEffect } from 'react';
import { performLogin } from '../../Services/LoginService';

export interface LoginProps {
    loginSuccessful: () => any;
}

export function Login(props: LoginProps) {
    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        performLogin(username, password).then((success) => {
            props.loginSuccessful();
        });
    };

    let button;
    if (loading) {
        button = <input type="submit" value="Log in" className="btn btn-primary w-full rounded-full mx-0" disabled/>
    } else {
        button = <input type="submit" value="Log in" className="btn btn-primary w-full rounded-full mx-0"/>
    }


    const panelStyle = {width: 500};

    return (
        <div className="h-full flex">
        <div className="bg-white shadow p-4 m-auto px-20 py-16" style={panelStyle}>
            <form onSubmit={handleSubmit}>
                <div className="text-l leading-10 ">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User name" className="block w-full border border-gray-500 rounded-t-lg px-2 focus:outline-none text-center box-border"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block w-full border border-t-0 border-gray-500 rounded-b-lg px-2 focus:outline-none text-center box-border"/>
                </div>
                <div className="text-center mt-4 mx-0 box-border">
                    {button}
                </div>
            </form>
        </div>
        </div>
    );
}