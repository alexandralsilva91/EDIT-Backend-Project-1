import { readFileSync, writeFileSync } from "node:fs";

class JsonFileReader {
    read(filePath: string) {
        const jsonData = readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    }
    //esta é uma boa utilizaçao do any, pq tanto pode ser um produto como um utilizador:
    write(filePath: string, data: any): void {
        writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
}

export default new JsonFileReader;