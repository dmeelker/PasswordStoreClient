export function performLogin(username: string, password: string) : Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}