import { Controller, Get, Query } from "@nestjs/common";
import { BandasService } from "../bandas/bandas.service";
import { AlbumsService } from "../albums/albums.service";
import { CancionesService } from "../canciones/canciones.service";

@Controller("buscar")
export class BusquedaController {
    constructor(
        private readonly bandasService: BandasService,
        private readonly albumsService: AlbumsService,
        private readonly cancionesService: CancionesService,
    ) {}

    @Get()
    async buscar(@Query("termino") termino: string) {
        if (!termino || termino.trim() === "") {
            return {
                message: "Por favor, ingresa un término de búsqueda",
            };
        }

        const bandas = await this.bandasService.buscarPorNombre(termino);
        const albums = await this.albumsService.buscarPorNombre(termino);
        const canciones = await this.cancionesService.buscarPorNombre(termino);

        return {
            bandas,
            albums,
            canciones,
        };
    }
}
