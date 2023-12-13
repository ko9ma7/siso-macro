import { join } from 'path';
import { app } from 'electron';
import fs from 'fs/promises';

class StorageService<T> {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    path() {
        return join(app.getPath("userData"), `${this.name}.json`);
    }

    async set(data: T): Promise<boolean> {
        try {
            const json = JSON.stringify(data);
            await fs.writeFile(this.path(), json);
            return true;
        } catch (e) {
            return false;
        }
    }

    async get(): Promise<T> {
        try {
            const data = await fs.readFile(this.path(), 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return {} as T;
        }
    }
}

export default StorageService;