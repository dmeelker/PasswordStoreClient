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
        button = <input type="submit" value="Go!" disabled/>
    } else {
        button = <input type="submit" value="Go!"/>
    }

    return (
        <div>
            <div>Login</div>
            <form onSubmit={handleSubmit}>
                <label>User name: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></label><br />
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label><br />
                {button}
            </form>
        </div>
    );
}