import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

export function UploadImage() {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor("image", {
                storage: diskStorage({
                    destination: "./uploads", // Ruta de destino
                    filename: (req, file, cb) => {
                        // Configuración del nombre del archivo
                        cb(null, `${Date.now()}-${file.originalname}`);
                    },
                }),
            }),
        ),
    );
}

export function UploadMp3() {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor("archivo", {
                storage: diskStorage({
                    destination: "./uploads",
                    filename: (req, file, cb) => {
                        cb(null, `${Date.now()}-${file.originalname}`);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    if (file.mimetype === "audio/mpeg") {
                        cb(null, true);
                    } else {
                        cb(new Error("El archivo debe ser de tipo mp3"), false);
                    }
                },
            }),
        ),
    );
}
