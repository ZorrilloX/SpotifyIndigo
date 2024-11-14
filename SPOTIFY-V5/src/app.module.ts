import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GenerosController } from "./generos/generos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Generos } from "./generos/generos.model";
import { GenerosService } from "./generos/generos.service";
import { BandasController } from "./bandas/bandas.controller";
import { BandasService } from "./bandas/bandas.service";
import { Bandas } from "./bandas/bandas.model";
import { AlbumsController } from "./albums/albums.controller";
import { AlbumsService } from "./albums/albums.service";
import { Albums } from "./albums/albums.model";
import { CancionesController } from "./canciones/canciones.controller";
import { CancionesService } from "./canciones/canciones.service";
import { Canciones } from "./canciones/canciones.model";
import { ImagenesService } from "./imagenService/imagen.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { BusquedaController } from "./buscar/buscar.controller";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "Spotify-Indigo",
            entities: [Generos, Bandas, Albums, Canciones],
            synchronize: false, //solo cuando estamos en desarrollo papu papu
        }),
        TypeOrmModule.forFeature([Generos, Bandas, Albums, Canciones]),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "SPOTIFY-V5", "../uploads"),
            serveRoot: "/imagenes",
            exclude: ["/index.html"],
        }),
    ],
    controllers: [AppController, GenerosController, BandasController, AlbumsController, CancionesController, BusquedaController],
    providers: [AppService, GenerosService, BandasService, AlbumsService, CancionesService, ImagenesService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
