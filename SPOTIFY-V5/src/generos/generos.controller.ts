import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GenerosService } from "./generos.service";
import { Generos } from "./generos.model";
import { GeneroDto } from "./dto/generos.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagenesService } from "../imagenService/imagen.service";
import { diskStorage } from "multer";
import { UploadImage } from "../decorators/upload.decorator";

@Controller("generos")
export class GenerosController {
    constructor(
        private generosService: GenerosService,
        private imagenesService: ImagenesService,
    ) {}
    @Get()
    getList(): Promise<Generos[]> {
        return this.generosService.findAll();
    }
    @Get(":id")
    getById(@Param("id") id: number): Promise<Generos | null> {
        return this.generosService.findById(id);
    }

    @Post()
    @UploadImage()
    async createGeneroIMG(@Body() genero: GeneroDto, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        if (!archivo) {
            throw new BadRequestException("Archivo de imagen no proporcionado");
        }
        const nuevoGenero = await this.generosService.createGenero({
            id: 0,
            nombre: genero.nombre,
        });
        await this.imagenesService.gestionarImagen(archivo, "genero", nuevoGenero.id, false);

        return "EXITO! Género e imagen creados correctamente";
    }

    @Put(":id")
    @UploadImage()
    async updateGenero(@Param("id") id: number, @Body() genero: GeneroDto, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const generoDB = await this.generosService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }

        await this.generosService.updateGenero({
            id: id,
            nombre: genero.nombre,
        });

        if (archivo) {
            // Si hay archivo, actualizar la imagen
            await this.imagenesService.gestionarImagen(archivo, "genero", id, false);
        }

        return "EXITO! Género e imagen editados correctamente";
    }

    @Delete(":id")
    async deleteGenero(@Param("id") id: number, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const generoDB = await this.generosService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }
        await this.generosService.deleteGenero(generoDB);

        await this.imagenesService.gestionarImagen(archivo, "genero", id, true);
        return "EXITO! Género y imagen eliminados correctamente";
    }
}
