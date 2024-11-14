import { Injectable, BadRequestException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ImagenesService {
    async gestionarImagen(
        archivo: Express.Multer.File,
        tipo: string, //'genero', 'banda' o 'album'
        id: number,
        eliminar: boolean = false,
    ): Promise<string> {
        // Paso 1: Ruta de destino según el tipo de objeto
        let rutaDestino: string;
        switch (tipo) {
            case "genero":
                rutaDestino = "./uploads/generos";
                break;
            case "banda":
                rutaDestino = "./uploads/bandas";
                break;
            case "album":
                rutaDestino = "./uploads/albums";
                break;
            default:
                throw new BadRequestException("Tipo de objeto no válido");
        }

        // Paso 2: Nombre del archivo
        const nombreArchivo = `${id}.jpg`; // O el formato adecuado para la imagen (jpg, png, etc)
        const rutaArchivo = path.join(rutaDestino, nombreArchivo);

        // Paso 3: Verificar si se debe eliminar la imagen
        if (eliminar && fs.existsSync(rutaArchivo)) {
            fs.unlinkSync(rutaArchivo);
            return "Imagen eliminada correctamente";
        }

        // Paso 4: Mover o reemplazar la imagen
        if (archivo) {
            if (!fs.existsSync(rutaDestino)) {
                fs.mkdirSync(rutaDestino, { recursive: true });
            }

            const rutaDestinoFinal = path.join(rutaDestino, nombreArchivo);
            fs.renameSync(archivo.path, rutaDestinoFinal); // Renombramos el archivo a la ruta final

            return "Imagen cargada correctamente";
        }

        throw new BadRequestException("No se ha proporcionado un archivo.");
    }
}
