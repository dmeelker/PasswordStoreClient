import * as Model from "../Model/Model";

const apiUrl = "https://localhost:5001";

export class Entry {
    public id: string = "";
    public name: string = "";
    public url: string = "";
    public username: string = "";
    public password: string = "";
}

export class Group {
    public id: string = "";
    public name: string = "";
    public entries: Entry[] = [];
    public groups: Group[] = [];
}

export class Document {
    public version: number = 1;
    public root: Group = new Group();
}

export async function login(username: string, password: string): Promise<string> {
    let options: RequestInit = {method: 'get'};
    let request = new Request(apiUrl + '/repository?username=test', options);
    let response = await fetch(request);

    if(response.ok) {
        return await response.text();
    } else {
        throw new Error(`Error loading data: ${response.statusText}`);
    }
    
    // return new Promise<string>((resolve, reject) => {
    //     window.setTimeout(() => {
    //         resolve("12345");
    //     }, 2000);
    // });
}



export async function getPasswords(): Promise<Document> {
    let options: RequestInit = {method: 'get'};
    let request = new Request(apiUrl + '/repository?username=test', options);
    let response = await fetch(request);

    if(response.ok) {
        return await response.json();
    } else {
        throw new Error(`Error loading data: ${response.statusText}`);
    }
}

export async function savePasswords(userId: string, document: Document): Promise<boolean> {
    let options: RequestInit = {
        method: 'post',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   },
        body: JSON.stringify(document),
    };

    let request = new Request(apiUrl + '/repository?username=test', options);
    let response = await fetch(request);

    if(response.ok) {
        await response.text();
        return true;
    } else {
        throw new Error(`Error loading data: ${response.statusText}`);
    }
}