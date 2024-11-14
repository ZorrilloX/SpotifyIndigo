import { BandasService } from "./../bandas/bandas.service";
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { Albums } from "./albums.model";
import { AlbumDto } from "./dto/albums.dto";
import { ImagenesService } from "../imagenService/imagen.service";
import { UploadImage } from "../decorators/upload.decorator";

@Controller("albums")
export class AlbumsController {
    constructor(
        private albumsService: AlbumsService,
        private bandasService: BandasService,
        private imagenesService: ImagenesService,
    ) {}
    @Get()
    async getList(): Promise<any[]> {
        const albums = await this.albumsService.findAll();

        return Promise.all(
            albums.map(async album => {
                const banda = await this.bandasService.findById(album.banda_id);
                return {
                    id: album.id,
                    nombre: album.nombre,
                    banda: banda?.nombre,
                };
            }),
        );
    }

    @Get(":id")
    async getById(@Param("id") id: number): Promise<any | null> {
        const album = await this.albumsService.findById(id);
        if (!album) {
            return new NotFoundException("lol");
        }

        const banda = await this.bandasService.findById(album.banda_id);
        return {
            id: album.id,
            nombre: album.nombre,
            banda: banda?.nombre,
        };
    }

    @Post()
    @UploadImage()
    async createAlbumIMG(@Body() album: AlbumDto, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        if (!archivo) throw new BadRequestException("Archivo de imagen no proporcionado");

        const nuevoAlbum = await this.albumsService.createAlbum({
            id: 0,
            nombre: album.nombre,
            banda_id: album.banda_id,
        });
        await this.imagenesService.gestionarImagen(archivo, "album", nuevoAlbum.id, false);

        return "EXITO! Album e imagen creados correctamente";
    }

    @Put(":id")
    @UploadImage()
    async updateAlbum(@Param("id") id: number, @Body() album: AlbumDto, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const albumDB = await this.albumsService.findById(id);
        if (!albumDB) throw new NotFoundException();

        await this.albumsService.updateAlbum({ id, nombre: album.nombre, banda_id: album.banda_id });
        if (archivo) await this.imagenesService.gestionarImagen(archivo, "album", id, false);

        return "EXITO! Album e imagen editados correctamente";
    }

    @Delete(":id")
    async deleteAlbum(@Param("id") id: number, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const albumDB = await this.albumsService.findById(id);
        if (!albumDB) throw new NotFoundException();

        await this.albumsService.deleteAlbum(albumDB);
        await this.imagenesService.gestionarImagen(archivo, "album", id, true);

        return "EXITO! Album e imagen eliminados correctamente";
    }
}
