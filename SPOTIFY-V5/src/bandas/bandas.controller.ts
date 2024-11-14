import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { BandasService } from "./bandas.service";
import { Bandas } from "./bandas.model";
import { BandaDto } from "./dto/bandas.dto";
import { GenerosService } from "../generos/generos.service";
import { ImagenesService } from "../imagenService/imagen.service";
import { UploadImage } from "../decorators/upload.decorator";

@Controller("bandas")
export class BandasController {
    constructor(
        private bandasService: BandasService,
        private generosService: GenerosService,
        private imagenesService: ImagenesService,
    ) {}
    @Get()
    async getList(): Promise<any[]> {
        const bandas = await this.bandasService.findAll();
        return Promise.all(
            bandas.map(async banda => {
                const genero = await this.generosService.findById(banda.genero_id);
                return {
                    ...banda,
                    genero,
                };
            }),
        );
    }

    @Get(":id")
    async getById(@Param("id") id: number): Promise<any | null> {
        const banda = await this.bandasService.findById(id);
        if (!banda) {
            throw new NotFoundException("Banda no encontrada");
        }
        const genero = await this.generosService.findById(banda.genero_id);
        return {
            ...banda,
            genero,
        };
    }

    @Post()
    @UploadImage()
    async createBanda(@Body() banda: BandaDto, @UploadedFile() archivo: Express.Multer.File): Promise<Bandas> {
        if (!archivo) throw new BadRequestException("Archivo de imagen no proporcionado");
        const nuevaBanda = await this.bandasService.createBanda({
            id: 0,
            nombre: banda.nombre,
            genero_id: banda.genero_id,
        });

        await this.imagenesService.gestionarImagen(archivo, "banda", nuevaBanda.id, false);
        return nuevaBanda;
    }

    @Put(":id")
    @UploadImage()
    async updateBanda(@Param("id") id: number, @Body() banda: BandaDto, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const bandaDB = await this.bandasService.findById(id);
        if (!bandaDB) throw new NotFoundException();

        await this.bandasService.updateBanda({ id, nombre: banda.nombre, genero_id: banda.genero_id });
        if (archivo) await this.imagenesService.gestionarImagen(archivo, "banda", id, false);

        return "EXITO! Banda e imagen editadas correctamente";
    }

    @Delete(":id")
    async deleteBanda(@Param("id") id: number, @UploadedFile() archivo: Express.Multer.File): Promise<string> {
        const bandaDB = await this.bandasService.findById(id);
        if (!bandaDB) throw new NotFoundException();

        await this.bandasService.deleteBanda(bandaDB);
        await this.imagenesService.gestionarImagen(archivo, "banda", id, true);

        return "EXITO! Banda e imagen eliminadas correctamente";
    }
}
