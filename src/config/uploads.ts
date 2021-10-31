import path from "path";
import crypto from "crypto";
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, "..",'..','tmp','uploads');

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        // rota pra onde o arquivo será salvo
        destination: tmpFolder,
        // o nome do arquivo onde será salvo
        filename(request, file, callback) {
            // manter o nome do arquivo único
            // Hash em hexadecimal para poder garantir o nome único

            const filehash = crypto.randomBytes(10).toString('hex');
            //nome do arquivo unico
            const fileName = `${filehash}-${file.originalname} `

            return callback(null, fileName);
        }
    })
}
