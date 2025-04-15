import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";


class FileUploadService {
    async save(file: any){
        console.log(file);

        const fileExtension = file.mimetype.split("/")[1]; //jpeg
        const fileName = uuidv4() + '.' + fileExtension; //erogutnrweqwe.jpe
        const filePath = path.resolve('static', fileName); // /static/erogutjhsagakdhka.jpeg
        await file.mv(filePath);

        return fileName; //devolvemos o nome e nao o caminho(/static/), pq no browser só vai o nome
    }
    async delete(fileName: string) { //random_name.jpg
        try {
            const filePath = path.resolve('static', fileName); // /static/random-name.jpg
            await fs.promises.unlink(filePath); // apaga o ficheiro
        } catch (error) {
            console.log('Failed to delete file:', fileName, error);
        }
    }
}

export default new FileUploadService();