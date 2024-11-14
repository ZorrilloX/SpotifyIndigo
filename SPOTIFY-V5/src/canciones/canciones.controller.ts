import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CancionesService } from "./canciones.service";
import { AlbumsService } from "../albums/albums.service";
import { CancionDto } from "./dto/canciones.dto";
import { Canciones } from "./canciones.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { Response } from "express";
import { UploadMp3 } from "../decorators/upload.decorator";

@Controller("canciones")
export class CancionesController {
    constructor(
        private cancionesService: CancionesService,
        private albumsService: AlbumsService,
    ) {}
    @Get()
    async getList(): Promise<any[]> {
        const canciones = await this.cancionesService.findAll();

        return Promise.all(
            canciones.map(async cancion => {
                const album = await this.albumsService.findById(cancion.album_id);
                return {
                    id: cancion.id,
                    nombre: cancion.nombre,
                    album: album?.nombre,
                };
            }),
        );
    }
    @Get(":id")
    async getById(@Param("id") id: number): Promise<any | null> {
        const cancion = await this.cancionesService.findById(id);
        if (!cancion) {
            return new NotFoundException("lol");
        }

        const album = await this.albumsService.findById(cancion.album_id);
        return {
            id: cancion.id,
            nombre: cancion.nombre,
            banda: album?.nombre,
        };
    }
    @Get("song/:id")
    async getCancionFileById(@Param("id") id: number, @Res() res: Response): Promise<any> {
        const cancion = await this.cancionesService.findById(id);
        if (!cancion) {
            throw new NotFoundException("Canción no encontrada");
        }

        // Ruta del archivo .mp3 en el sistema de archivos
        const filePath = path.join("./uploads", `${id}.mp3`);

        // Verificar si el archivo existe
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException("Archivo mp3 no encontrado");
        }

        // Enviar el archivo como respuesta
        return res.sendFile(path.resolve(filePath));
    }

    @Post()
    @UploadMp3()
    async createCancion(@Body() cancion: CancionDto, @UploadedFile() archivo: Express.Multer.File): Promise<Canciones> {
        if (!archivo) {
            throw new BadRequestException("Archivo mp3 no proporcionado");
        }
        //SI el campo esta vacio entonces reemplazar con el nombre del archivo
        let nombreCancion = cancion.nombre;
        if (!cancion.nombre || cancion.nombre.trim() === "") {
            nombreCancion = archivo.originalname.replace(/\.[^/.]+$/, ""); // Quitamos la extensión
        }

        const nuevaCancion = await this.cancionesService.createCancion({
            id: 0,
            nombre: nombreCancion,
            album_id: cancion.album_id,
        });

        // Cambiar el nombre del archivo al ID de la canción
        const nuevoNombre = `${nuevaCancion.id}.mp3`;
        const rutaActual = archivo.path;
        const nuevaRuta = path.join("./uploads", nuevoNombre);

        fs.renameSync(rutaActual, nuevaRuta); // Renombrar archivo

        return nuevaCancion;
    }

    @Put(":id")
    @UploadMp3()
    async updateCancion(@Param("id") id: number, @Body() cancion: CancionDto, @UploadedFile() archivo: Express.Multer.File): Promise<Canciones> {
        const cancionDB = await this.cancionesService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }
        const cancionActualizada = await this.cancionesService.updateCancion({
            id: id,
            nombre: cancion.nombre,
            album_id: cancion.album_id,
        });

        if (archivo) {
            const filePath = path.join("./uploads", `${id}.mp3`);
            // Eliminar el archivo mp3 existente si está presente
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            const nuevaRuta = path.join("./uploads", `${id}.mp3`);
            fs.renameSync(archivo.path, nuevaRuta); // Renombrar el nuevo archivo
        }
        return cancionActualizada;
    }

    @Delete(":id")
    async deleteCancion(@Param("id") id: number): Promise<string> {
        const cancionDB = await this.cancionesService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }

        // Eliminar la canción de la base de datos
        await this.cancionesService.deleteCancion(cancionDB);

        // Eliminar el archivo mp3 asociado
        const filePath = path.join("./uploads", `${id}.mp3`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return "Exito, Cacion eliminada :v";
    }
}
