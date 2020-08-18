export function login(username: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        window.setTimeout(() => {
            resolve("12345");
        }, 2000);
    });
}

export function savePasswords(userId: string, document: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        window.setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}